"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./AboutStats.module.css";

const numberFormat = new Intl.NumberFormat("en-IN");
const recordings = {
  ongoing: { file: "parking", name: "Parking area" },
  completed: { file: "mall", name: "Retail floor" },
  experience: { file: "workspace", name: "Work floor" },
} as const;

type AboutStatsProps = {
  items: readonly {
    id: keyof typeof recordings;
    label: string;
    value: number;
  }[];
  illustrative: boolean;
};

/** Each preview loads on entry and pauses offscreen; totals remain in the HTML. */
export function AboutStats({ items, illustrative }: AboutStatsProps) {
  const list = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canObserve = typeof IntersectionObserver !== "undefined";
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const limitData =
      connection?.saveData ||
      ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    let disposed = false;
    const states = Array.from(
      element.querySelectorAll<HTMLElement>("[data-stat]"),
    ).flatMap((monitor, index) => {
      const video = monitor.querySelector("video");
      const number = monitor.querySelector<HTMLElement>("[data-count]");
      const clock = monitor.querySelector<HTMLElement>("[data-clock]");
      const button = monitor.querySelector("button");
      if (!video || !number || !clock || !button) return [];
      const state = {
        monitor,
        video,
        number,
        clock,
        button,
        value: items[index].value,
        name: recordings[items[index].id].name,
        visible: !canObserve,
        userPaused: false,
        userRequested: false,
        pending: false,
        started: false,
        frame: 0,
      };
      monitor.dataset.reveal =
        canObserve && !motion.matches ? "pending" : "visible";
      return [state];
    });

    type Preview = (typeof states)[number];
    const shouldPlay = (state: Preview) =>
      !disposed &&
      state.visible &&
      !document.hidden &&
      !state.userPaused &&
      (!motion.matches || state.userRequested) &&
      (!limitData || state.userRequested) &&
      (canObserve || state.userRequested) &&
      !state.video.error;
    const setPlaying = (state: Preview, playing: boolean) => {
      state.monitor.dataset.playing = String(playing);
      state.button.setAttribute(
        "aria-label",
        state.monitor.dataset.error === "true"
          ? "Recording preview unavailable"
          : (playing ? "Pause" : "Play") + " recording preview: " + state.name,
      );
    };
    const play = (state: Preview) => {
      if (!shouldPlay(state) || state.pending || !state.video.paused) return;
      if (!state.video.getAttribute("src")) {
        state.video.src = state.video.dataset.src ?? "";
      }
      state.pending = true;
      // Browser autoplay restrictions are expected; the poster and play button remain.
      void state.video
        .play()
        .then(() => {
          state.pending = false;
          if (!shouldPlay(state)) state.video.pause();
        })
        .catch(() => {
          state.pending = false;
          if (!disposed) setPlaying(state, false);
        });
    };
    const finishCount = (state: Preview) => {
      cancelAnimationFrame(state.frame);
      state.number.textContent = numberFormat.format(state.value);
    };
    const reveal = (state: Preview) => {
      state.monitor.dataset.reveal = "visible";
      if (state.started) return;
      state.started = true;
      if (motion.matches || !canObserve) return;
      let begin: number | undefined;
      const tick = (now: number) => {
        if (disposed) return;
        begin ??= now;
        const progress = Math.min((now - begin) / 1200, 1);
        state.number.textContent = numberFormat.format(
          Math.round(state.value * (1 - (1 - progress) ** 3)),
        );
        if (progress < 1) state.frame = requestAnimationFrame(tick);
      };
      state.number.textContent = "0";
      state.frame = requestAnimationFrame(tick);
    };
    const sync = (state: Preview) => {
      if (shouldPlay(state)) play(state);
      else state.video.pause();
    };
    const removers = states.map((state) => {
      const onPlaying = () => {
        if (!shouldPlay(state)) state.video.pause();
        else setPlaying(state, true);
      };
      const onPause = () => setPlaying(state, false);
      const onError = () => {
        state.monitor.dataset.error = "true";
        state.button.disabled = true;
        state.video.pause();
        setPlaying(state, false);
      };
      const onTime = () => {
        const seconds = Number.isFinite(state.video.currentTime)
          ? Math.max(0, Math.floor(state.video.currentTime))
          : 0;
        state.clock.textContent =
          "00:" +
          String(Math.floor(seconds / 60)).padStart(2, "0") +
          ":" +
          String(seconds % 60).padStart(2, "0");
      };
      const onToggle = () => {
        if (state.pending || !state.video.paused) {
          state.userPaused = true;
          state.userRequested = false;
          state.video.pause();
        } else {
          state.userPaused = false;
          state.userRequested = true;
          play(state);
        }
      };
      state.video.addEventListener("playing", onPlaying);
      state.video.addEventListener("pause", onPause);
      state.video.addEventListener("error", onError);
      state.video.addEventListener("timeupdate", onTime);
      state.button.addEventListener("click", onToggle);
      state.monitor.dataset.interactive = "true";
      return () => {
        state.video.removeEventListener("playing", onPlaying);
        state.video.removeEventListener("pause", onPause);
        state.video.removeEventListener("error", onError);
        state.video.removeEventListener("timeupdate", onTime);
        state.button.removeEventListener("click", onToggle);
      };
    });
    const byMonitor = new Map(states.map((state) => [state.monitor, state]));
    const observer = canObserve
      ? new IntersectionObserver(
          (entries) => {
            if (disposed) return;
            entries.forEach((entry) => {
              const state = byMonitor.get(entry.target as HTMLElement);
              if (!state) return;
              state.visible =
                entry.isIntersecting && entry.intersectionRatio >= 0.2;
              if (state.visible) reveal(state);
              else if (state.started) finishCount(state);
              sync(state);
            });
          },
          { threshold: 0.2, rootMargin: "0px 0px -24px 0px" },
        )
      : undefined;
    const onVisibility = () => states.forEach(sync);
    const onMotion = () => {
      states.forEach((state) => {
        if (motion.matches) {
          state.userRequested = false;
          state.monitor.dataset.reveal = "visible";
          finishCount(state);
        }
        sync(state);
      });
    };
    states.forEach((state) => observer?.observe(state.monitor));
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    return () => {
      disposed = true;
      observer?.disconnect();
      removers.forEach((remove) => remove());
      states.forEach((state) => {
        state.video.pause();
        finishCount(state);
        state.monitor.dataset.reveal = "visible";
        state.monitor.dataset.playing = "false";
        state.monitor.dataset.interactive = "false";
      });
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, [items]);

  return (
    <div
      className={styles.stats}
      role="group"
      aria-label="Project figures and experience"
    >
      <div className="section-wrap">
        <div className={styles.heading}>
          <div>
            <p>Our work, in numbers.</p>
            <span className={styles.caption}>
              Demonstration recording previews
            </span>
          </div>
          {illustrative && (
            <span className={styles.sample}>Illustrative figures</span>
          )}
        </div>
        <dl ref={list} className={styles.list}>
          {items.map((item, index) => {
            const formatted = numberFormat.format(item.value);
            const recording = recordings[item.id];
            const base = "/assets/recordings/" + recording.file;
            return (
              <div
                className={styles.monitor}
                data-stat={item.id}
                key={item.id}
                style={
                  {
                    "--stat-characters": formatted.length,
                    "--monitor-delay": index * 90 + "ms",
                  } as CSSProperties
                }
              >
                <dt className={styles.monitorTitle}>{item.label}</dt>
                <dd className={styles.readout}>
                  <Image
                    className={styles.footage}
                    src={base + ".jpg"}
                    alt=""
                    width="640"
                    height="360"
                    loading="lazy"
                    decoding="async"
                  />
                  <video
                    className={styles.footage}
                    data-src={base + ".mp4"}
                    width="640"
                    height="360"
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    tabIndex={-1}
                    disablePictureInPicture
                  />
                  <span className={styles.screenTop} aria-hidden="true">
                    <span>CH {String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.recordingState}>
                      <i />
                      <span className={styles.recordingText}>REC / DEMO</span>
                      <span className={styles.previewText}>DEMO</span>
                    </span>
                  </span>
                  <span className="sr-only">{formatted}</span>
                  <span
                    className={styles.number}
                    data-count=""
                    aria-hidden="true"
                  >
                    {formatted}
                  </span>
                  <span
                    className={styles.timecode}
                    data-clock=""
                    aria-hidden="true"
                  >
                    00:00:00
                  </span>
                  <span className={styles.cameraName} aria-hidden="true">
                    {recording.name}
                  </span>
                  <button
                    className={styles.playback}
                    type="button"
                    aria-label={"Play recording preview: " + recording.name}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path className={styles.playGlyph} d="M5 3.5v9l7-4.5Z" />
                      <path
                        className={styles.pauseGlyph}
                        d="M4 3h3v10H4zm5 0h3v10H9z"
                      />
                    </svg>
                  </button>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}

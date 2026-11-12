"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { business, whatsappLink } from "@/lib/site-config";
import { Icon } from "./Icons";

export function ContactSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const [prepared, setPrepared] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const lines = [
      `Hi ${business.name}! I'd like to make an enquiry.`,
      "",
      `Name: ${text("name")}`,
      `Email: ${text("email")}`,
      text("phone") ? `Phone: ${text("phone")}` : null,
      `Interested in: ${text("interest")}`,
      text("city") ? `Location: ${text("city")}` : null,
      "",
      text("message"),
    ].filter((line): line is string => line !== null);
    const link = whatsappLink(lines.join("\n"));
    setPrepared(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };
  return (
    <section
      id={standalone ? undefined : "contact"}
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="section-wrap page-body contact-layout">
        <form className="enquiry-form" onSubmit={submit}>
          <span className="eyebrow">LET&apos;S GET STARTED</span>
          <h2 id="contact-title">Let&apos;s plan your setup.</h2>
          <div className="form-grid">
            <label>
              Your name <span>*</span>
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Your full name"
              />
            </label>
            <label>
              Email address <span>*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={24}
                placeholder="Your contact number"
              />
            </label>
            <label>
              Your city
              <input
                name="city"
                autoComplete="address-level2"
                maxLength={100}
                placeholder="Where is your property?"
              />
            </label>
            <label className="full-field">
              I&apos;m interested in <span>*</span>
              <select name="interest" required defaultValue="">
                <option value="" disabled>
                  Select your requirement
                </option>
                <option>CCTV cameras & recording</option>
                <option>PoE switches & networking</option>
                <option>Installation enquiry</option>
                <option>Access control & smart home</option>
                <option>Technical support</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="full-field">
              Tell us a little more <span>*</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={4}
                placeholder="Your property type, camera requirements or the question on your mind…"
              />
            </label>
          </div>
          <button className="button button-dark" type="submit">
            Continue on WhatsApp <Icon name="whatsapp" size={21} />
          </button>
          <p className="form-disclosure">
            You&apos;ll review and send your enquiry in WhatsApp. This form does
            not store your details. Please don&apos;t include passwords or
            private footage.
          </p>
          {prepared && (
            <p className="handoff-note" role="status">
              Your message is ready.{" "}
              <a href={prepared} target="_blank" rel="noopener noreferrer">
                Open WhatsApp
              </a>{" "}
              to review and send it.
            </p>
          )}
        </form>
        <div className="contact-brand">
          <Image
            src={business.logo}
            alt={business.name}
            width={1246}
            height={497}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

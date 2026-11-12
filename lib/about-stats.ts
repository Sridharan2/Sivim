/** Public build-time figures; sample totals remain labelled until verified. */
const verification = process.env.NEXT_PUBLIC_STATS_VERIFIED?.trim() ?? "";
if (verification && !["true", "false"].includes(verification)) {
  throw new Error("NEXT_PUBLIC_STATS_VERIFIED must be true or false.");
}
const verified = verification === "true";

function count(
  input: string | undefined,
  key: string,
  sample: number,
  maximum: number,
) {
  const value = input?.trim() ?? "";
  if (!value) {
    if (verified) throw new Error(`Set ${key} before verifying the About figures.`);
    return sample;
  }
  const result = Number(value);
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(result) || result > maximum) {
    throw new Error(`${key} must be a whole number between 0 and ${maximum}.`);
  }
  return result;
}

export const aboutStats = {
  illustrative: !verified,
  items: [
    {
      id: "ongoing",
      label: "Ongoing projects",
      value: count(
        process.env.NEXT_PUBLIC_ONGOING_PROJECTS,
        "NEXT_PUBLIC_ONGOING_PROJECTS",
        8,
        999999,
      ),
    },
    {
      id: "completed",
      label: "Completed projects",
      value: count(
        process.env.NEXT_PUBLIC_COMPLETED_PROJECTS,
        "NEXT_PUBLIC_COMPLETED_PROJECTS",
        250,
        999999,
      ),
    },
    {
      id: "experience",
      label: "Years of experience",
      value: count(
        process.env.NEXT_PUBLIC_YEARS_EXPERIENCE,
        "NEXT_PUBLIC_YEARS_EXPERIENCE",
        10,
        100,
      ),
    },
  ],
} as const;

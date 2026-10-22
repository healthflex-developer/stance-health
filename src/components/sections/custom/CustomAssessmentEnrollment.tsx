"use client";

import { useState, type ReactNode } from "react";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewList, previewString } from "@/lib/preview-draft";
import { blankGenericPlaceholderCopy } from "@/lib/preview-sync";

const DEFAULT_HEADING = "Let's Get Your Athletes Assessed";
const DEFAULT_DESCRIPTION =
  "Tell us who you are and we'll get back with a plan tailored to your sport and squad.";
const DEFAULT_NOTE =
  "We use your details only to contact you about Stance Health Academics.";

const DEFAULT_BENEFITS = [
  { icon: "document", title: "Individual performance report" },
  { icon: "target", title: "Sport-specific programs" },
  { icon: "pulse", title: "Rehab to performance" },
  { icon: "flask", title: "Tested, not guessed" },
  { icon: "shield", title: "Injury risk screening" },
  { icon: "users", title: "Works with your coach" },
] as const;

const DEFAULT_SPORTS = [
  { label: "Football" },
  { label: "Cricket" },
  { label: "Badminton" },
  { label: "Hockey" },
  { label: "Tennis" },
  { label: "Running" },
] as const;

const DEFAULT_LOCATIONS = [
  { label: "HSR" },
  { label: "Whitefield" },
  { label: "Indiranagar" },
  { label: "JP Nagar" },
  { label: "Koramangala" },
] as const;

const inputClass =
  "mt-1.5 w-full min-w-0 rounded-lg border border-[#e4e8ee] bg-white px-3 py-2.5 text-base text-[#132644] outline-none placeholder:text-[#b0b8c2] focus:border-[#132644]";

export function CustomAssessmentEnrollment({
  props,
  blockId,
  initialAudience = "player",
}: {
  props?: Record<string, unknown> | null;
  blockId?: string;
  initialAudience?: "player" | "academy";
}) {
  const preview = usePreviewProps("CustomAssessmentEnrollment");
  const source = (blankGenericPlaceholderCopy(props ?? preview) ?? {}) as Record<string, unknown>;
  const benefits = previewList(source.benefits, DEFAULT_BENEFITS).map((item, index) => ({
    icon: previewString(item.icon, DEFAULT_BENEFITS[index]?.icon ?? "document"),
    title: previewString(item.title, DEFAULT_BENEFITS[index]?.title ?? "Benefit"),
  }));
  const sports = previewList(source.sports, DEFAULT_SPORTS).map((item, index) =>
    previewString(item.label, DEFAULT_SPORTS[index]?.label ?? "Sport"),
  );
  const locations = previewList(source.locations ?? source.centres, DEFAULT_LOCATIONS).map((item, index) =>
    previewString(item.label, DEFAULT_LOCATIONS[index]?.label ?? "Location"),
  );
  const [audience, setAudience] = useState<"player" | "academy">(initialAudience);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const heading = previewString(
    source.heading,
    [previewString(source.headingPrefix, ""), previewString(source.headingHighlight, "")].filter(Boolean).join(" ") || DEFAULT_HEADING,
  );
  const playerLabel = previewString(source.playerLabel, "I'm a player");
  const academyLabel = previewString(source.academyLabel, "I run an academy");
  const submitLabel = previewString(source.submitLabel ?? source.formTitle, "Enroll now");

  return (
    <section
      className="overflow-x-hidden bg-[#0d2140] py-12 sm:py-16 lg:py-20"
      data-preview-block="CustomAssessmentEnrollment"
      {...(blockId ? { "data-admin-block-id": blockId } : {})}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="min-w-0">
          <h2 className="max-w-md text-[1.75rem] font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-5xl" data-preview-field="heading">
            {heading}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base" data-preview-field="description">
            {previewString(source.description, DEFAULT_DESCRIPTION)}
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
            {benefits.map((benefit, index) => (
              <li key={`${benefit.title}-${index}`} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#16304f] px-3.5 py-3">
                <span className="shrink-0 text-[#cdfe71]">
                  <BenefitIcon name={benefit.icon} />
                </span>
                <span className="min-w-0 text-sm font-medium leading-snug text-white" data-preview-field={`benefits[${index}].title`}>
                  {benefit.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="min-w-0 rounded-[28px] bg-white p-4 shadow-xl sm:p-7"
          onSubmit={(event) => {
            event.preventDefault();
            if (submitting || submitted) return;
            const form = event.currentTarget;
            const data = new FormData(form);
            const leadType = audience === "academy" ? "Academy" : "Player";
            const body =
              audience === "player"
                ? {
                    leadType,
                    playerName: String(data.get("playerName") || ""),
                    contactPerson: String(data.get("playerName") || ""),
                    age: String(data.get("age") || ""),
                    mobile: String(data.get("mobile") || ""),
                    sports: String(data.get("sport") || ""),
                    academyName: String(data.get("academy") || ""),
                    coach: String(data.get("coach") || ""),
                    location: String(data.get("location") || ""),
                  }
                : {
                    leadType,
                    academyName: String(data.get("academyName") || ""),
                    sports: String(data.get("sportsCoached") || ""),
                    contactPerson: String(data.get("contact") || ""),
                    mobile: String(data.get("mobile") || ""),
                    email: String(data.get("email") || ""),
                    athletes: String(data.get("athletes") || ""),
                    location: String(data.get("location") || ""),
                  };
            setError("");
            setSubmitting(true);
            void (async () => {
              try {
                const response = await fetch("/api/academies/lead", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                if (!response.ok) {
                  const payload = (await response.json().catch(() => ({}))) as { error?: string };
                  throw new Error(payload.error || "Could not save your details. Please try again.");
                }
                void import("@/lib/analytics").then(({ track }) => {
                  const formMeta = { form_name: "custom_assessment_enrollment", audience, lead_type: audience };
                  track("web_form_submit", formMeta);
                  track("web_lead_created", formMeta);
                });
                setSubmitted(true);
              } catch (err) {
                setError(err instanceof Error ? err.message : "Could not save your details. Please try again.");
              } finally {
                setSubmitting(false);
              }
            })();
          }}
        >
          <div className="grid grid-cols-2 gap-1 rounded-full bg-[#eef1f4] p-1" role="group" aria-label="Who is enrolling">
            <ToggleButton active={audience === "player"} field="playerLabel" onClick={() => setAudience("player")}>
              {playerLabel}
            </ToggleButton>
            <ToggleButton active={audience === "academy"} field="academyLabel" onClick={() => setAudience("academy")}>
              {academyLabel}
            </ToggleButton>
          </div>
          <input type="hidden" name="audience" value={audience} />

          {audience === "player" ? (
            <div className="mt-5 space-y-4">
              <Field label={previewString(source.playerNameLabel, "Player full name")} field="playerNameLabel" required>
                <input className={inputClass} name="playerName" autoComplete="name" placeholder={previewString(source.playerNamePlaceholder, "e.g. Arjun Sharma")} data-preview-field="playerNamePlaceholder" required />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={previewString(source.ageLabel, "Age")} field="ageLabel">
                  <input className={inputClass} name="age" inputMode="numeric" placeholder={previewString(source.agePlaceholder, "e.g. 16")} data-preview-field="agePlaceholder" />
                </Field>
                <Field label={previewString(source.playerMobileLabel, "Mobile number (parent or player)")} field="playerMobileLabel" required>
                  <input className={inputClass} type="tel" name="mobile" autoComplete="tel" placeholder={previewString(source.playerMobilePlaceholder, "+91")} data-preview-field="playerMobilePlaceholder" required />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={previewString(source.sportLabel, "Sport")} field="sportLabel">
                  <Select name="sport" placeholder={previewString(source.sportPlaceholder, "Select sport")} field="sportPlaceholder" options={sports} />
                </Field>
                <Field label={previewString(source.playerAcademyLabel, "Your academy")} field="playerAcademyLabel" required>
                  <input className={inputClass} name="academy" placeholder={previewString(source.playerAcademyPlaceholder, "Academy name")} data-preview-field="playerAcademyPlaceholder" required />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={previewString(source.coachLabel, "Your coach's name")} field="coachLabel">
                  <input className={inputClass} name="coach" placeholder={previewString(source.coachPlaceholder, "Coach name")} data-preview-field="coachPlaceholder" />
                </Field>
                <Field label={previewString(source.locationLabel, "Nearest Stance location")} field="locationLabel">
                  <Select name="location" placeholder={previewString(source.locationPlaceholder, "Select location")} field="locationPlaceholder" options={locations} />
                </Field>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <Field label={previewString(source.academyNameLabel, "Academy name")} field="academyNameLabel" required>
                <input className={inputClass} name="academyName" placeholder={previewString(source.academyNamePlaceholder, "Academy name")} data-preview-field="academyNamePlaceholder" required />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={previewString(source.sportsCoachedLabel, "Sport(s) coached")} field="sportsCoachedLabel">
                  <input className={inputClass} name="sportsCoached" placeholder={previewString(source.sportsCoachedPlaceholder, "e.g. Football, Cricket")} data-preview-field="sportsCoachedPlaceholder" />
                </Field>
                <Field label={previewString(source.contactLabel, "Contact person")} field="contactLabel" required>
                  <input className={inputClass} name="contact" autoComplete="name" placeholder={previewString(source.contactPlaceholder, "Full name")} data-preview-field="contactPlaceholder" required />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={previewString(source.academyMobileLabel, "Mobile number")} field="academyMobileLabel" required>
                  <input className={inputClass} type="tel" name="mobile" autoComplete="tel" placeholder={previewString(source.academyMobilePlaceholder, "+91")} data-preview-field="academyMobilePlaceholder" required />
                </Field>
                <Field label={previewString(source.emailLabel, "Email")} field="emailLabel">
                  <input className={inputClass} type="email" name="email" autoComplete="email" placeholder={previewString(source.emailPlaceholder, "name@academy.com")} data-preview-field="emailPlaceholder" />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={previewString(source.athletesLabel, "Number of athletes")} field="athletesLabel">
                  <input className={inputClass} name="athletes" inputMode="numeric" placeholder={previewString(source.athletesPlaceholder, "e.g. 60")} data-preview-field="athletesPlaceholder" />
                </Field>
                <Field label={previewString(source.locationLabel, "Nearest Stance location")} field="locationLabel">
                  <Select name="location" placeholder={previewString(source.locationPlaceholder, "Select location")} field="locationPlaceholder" options={locations} />
                </Field>
              </div>
            </div>
          )}

          {error ? <p className="mt-4 text-center text-sm text-[#e11d48]">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting || submitted}
            className="mt-5 w-full rounded-full bg-[#10233f] px-4 py-3.5 text-sm font-bold text-[#cdfe71] disabled:opacity-70 sm:text-base"
            data-preview-field="submitLabel"
          >
            {submitted ? "Sent" : submitting ? "Saving…" : submitLabel}
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-[#7b8794]">
            <span data-preview-field="note">{previewString(source.note, DEFAULT_NOTE)} </span>
            <a className="underline underline-offset-2" href={previewString(source.privacyHref, "/privacy-policy")} data-preview-field="privacyLabel">
              {previewString(source.privacyLabel, "Privacy policy.")}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

function ToggleButton({
  active,
  field,
  onClick,
  children,
}: {
  active: boolean;
  field: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      className={active
        ? "min-w-0 rounded-full bg-white px-2 py-2.5 text-xs font-semibold text-[#132644] shadow-sm sm:text-sm"
        : "min-w-0 rounded-full px-2 py-2.5 text-xs font-semibold text-[#8b97a3] sm:text-sm"}
      aria-pressed={active}
      data-preview-field={field}
      onClick={onClick}
    >
      <span className="block truncate">{children}</span>
    </button>
  );
}

function Field({
  label,
  field,
  required,
  children,
}: {
  label: string;
  field: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="block text-sm font-medium text-[#1c2430]" data-preview-field={field}>
        {label}
        {required ? <span className="text-[#e11d48]"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function Select({
  name,
  placeholder,
  field,
  options,
}: {
  name: string;
  placeholder: string;
  field: string;
  options: string[];
}) {
  return (
    <select className={`${inputClass} appearance-none bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-9`} name={name} defaultValue="" data-preview-field={field} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")" }}>
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

function BenefitIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true as const,
  };
  if (name === "target") {
    return <svg {...props}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>;
  }
  if (name === "pulse") {
    return <svg {...props}><path d="M3 12h4l2-5 4 10 2-5h6" /></svg>;
  }
  if (name === "flask") {
    return <svg {...props}><path d="M9 3h6M10 3v6L5.5 19a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3" /></svg>;
  }
  if (name === "shield") {
    return <svg {...props}><path d="M12 3 5 6v6c0 4.2 2.8 7.2 7 8.5 4.2-1.3 7-4.3 7-8.5V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
  }
  if (name === "users" || name === "user") {
    return <svg {...props}><circle cx="9" cy="8" r="2.4" /><circle cx="16" cy="9" r="2" /><path d="M4.5 18.5c.8-2.4 2.6-3.6 4.6-3.6s3.8 1.2 4.6 3.6M14 14.8c1.5-.2 3 .6 3.8 2.7" /></svg>;
  }
  return <svg {...props}><path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" /><path d="M14 3.5V8h4M8 13h8M8 17h5" /></svg>;
}

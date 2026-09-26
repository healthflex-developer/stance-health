"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Hero from "@/components/sections/Hero";
import Team from "@/components/sections/Team";
import Centers from "@/components/sections/Centers";
import Framework from "@/components/sections/Framework";
import Technology from "@/components/sections/Technology";
import Testimonials from "@/components/sections/Testimonials";
import type { AdminPreviewBlock } from "@/components/PreviewDraft";

type DraftBlock = {
  id: string;
  type: string;
  props: Record<string, unknown>;
};

type DraftMessage = {
  blocks?: DraftBlock[];
};

const SET_DRAFT_MESSAGE = "stance-admin/set-draft";
const PREVIEW_READY_MESSAGE = "stance-admin/preview-ready";

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function rows(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object") : [];
}

function fillBlock(block: DraftBlock): AdminPreviewBlock {
  const props = { ...block.props };
  if (block.type === "Hero") {
    props.headline = text(props.headline, "Add a headline");
    props.highlight = text(props.highlight, "headline");
    props.paragraph = text(props.paragraph, "Add a short description");
    props.ctaLabel = text(props.ctaLabel, "Add button label");
    props.ctaHref = text(props.ctaHref, "https://book.stance.health/stance-health");
  }
  if (block.type === "Team") {
    props.heading = text(props.heading, "Flawless Team");
    props.subtext = text(props.subtext, "Experience That Matters");
    const members = rows(props.members);
    props.members = (members.length ? members : [{}]).map((member, index) => ({
      ...member,
      name: text(member.name, `Team member ${index + 1}`),
      role: text(member.role, "Add role"),
      experience: text(member.experience, "Add experience"),
      bio: text(member.bio, "Add team member bio"),
    }));
  }
  if (block.type === "Centers") {
    props.heading = text(props.heading, "Our Centers");
    const items = rows(props.items);
    props.items = (items.length ? items : [{}]).map((item, index) => ({
      ...item,
      name: text(item.name, `Centre ${index + 1}`),
      phone: text(item.phone, "Add phone"),
      address: text(item.address, "Add address"),
    }));
  }
  if (block.type === "Framework") {
    props.heading = text(props.heading, "Guiding Each Stride in Your Journey");
    const steps = rows(props.steps);
    props.steps = (steps.length ? steps : [{}]).map((step, index) => ({
      ...step,
      id: text(step.id, `step-${index + 1}`),
      label: text(step.label, `Step ${index + 1}`),
      description: text(step.description, "Add step description"),
    }));
  }
  if (block.type === "Technology") {
    props.heading = text(props.heading, "Technology Blended with Science");
    const items = rows(props.items);
    props.items = (items.length ? items : [{}]).map((item, index) => ({
      ...item,
      id: text(item.id, `technology-${index + 1}`),
      name: text(item.name, `Technology ${index + 1}`),
      description: text(item.description, "Add technology description"),
    }));
  }
  if (block.type === "Testimonials") {
    props.heading = text(props.heading, "Testimonial");
    const items = rows(props.items);
    props.items = (items.length ? items : [{}]).map((item, index) => ({
      ...item,
      name: text(item.name, `Patient ${index + 1}`),
      role: text(item.role, "Add role"),
      condition: text(item.condition, "Add condition"),
      quote: text(item.quote, "Add testimonial quote"),
    }));
  }
  if (block.type === "FAQList") {
    const faqs = rows(props.faqs);
    props.faqs = (faqs.length ? faqs : [{}]).map((faq, index) => ({
      ...faq,
      question: text(faq.question, `Question ${index + 1}`),
      answer: text(faq.answer, "Add answer"),
    }));
  }
  if (block.type === "AboutCta") {
    props.heading = text(props.heading, "Ready to begin your journey?");
    props.description = text(props.description, "Our team is ready to help you achieve your performance and recovery goals.");
    props.ctaLabel = text(props.ctaLabel, "Book an Appointment");
    props.ctaHref = text(props.ctaHref, "https://book.stance.health/stance-health");
  }
  return { id: block.id, type: block.type, props };
}

function FaqTemplate({ block }: { block: AdminPreviewBlock }) {
  const faqs = rows(block.props.faqs);
  return (
    <section className="bg-[#0c1b30] px-4 py-20">
      <div className="mx-auto max-w-3xl border-t border-white/10">
        {faqs.map((faq, index) => (
          <article key={index} className="border-b border-white/10 py-6" data-admin-list="faqs" data-admin-list-index={index}>
            <h3 data-admin-list-field="question" className="text-base font-bold text-white">{text(faq.question, `Question ${index + 1}`)}</h3>
            <p data-admin-list-field="answer" className="mt-3 text-sm leading-relaxed text-white/60">{text(faq.answer, "Add answer")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaTemplate({ block }: { block: AdminPreviewBlock }) {
  const props = block.props;
  return (
    <section className="bg-[#cdfe71] px-4 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 data-admin-field="heading" className="mb-4 text-3xl font-extrabold text-black sm:text-4xl">{text(props.heading, "Ready to begin your journey?")}</h2>
        <p data-admin-field="description" className="mb-8 text-black/70">{text(props.description, "Our team is ready to help you achieve your performance and recovery goals.")}</p>
        <a data-admin-field="ctaLabel" href={text(props.ctaHref, "https://book.stance.health/stance-health")} target="_blank" rel="noreferrer" className="booking-cta inline-block rounded-full bg-black px-8 py-3 font-semibold text-white">
          {text(props.ctaLabel, "Book an Appointment")}
        </a>
      </div>
    </section>
  );
}

function humanize(key: string) {
  const spaced = key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ").trim().toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function itemLabel(item: Record<string, unknown>, fallback: string) {
  for (const value of Object.values(item)) {
    if (typeof value === "string" && value.trim()) return value;
  }
  for (const value of Object.values(item)) {
    const nested = rows(value);
    if (nested.length > 0) return itemLabel(nested[0], fallback);
  }
  return fallback;
}

function GenericBlock({ block }: { block: DraftBlock }) {
  const props = block.props;
  const strings = Object.entries(props).filter((entry): entry is [string, string] => typeof entry[1] === "string");
  const lists = Object.entries(props).filter((entry): entry is [string, unknown] => Array.isArray(entry[1]));
  const heading = text(props.heading) || text(props.headline) || text(props.title) || text(props.headingPrefix) || "Add a heading";
  return (
    <section className="bg-[#0d1f3c] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <h2 data-admin-field="heading" className="text-2xl font-bold">{heading}</h2>
        {strings.filter(([key]) => !["heading", "headline", "title", "headingPrefix"].includes(key)).map(([key, value]) => (
          <p key={key} data-admin-field={key} className="mt-3 max-w-2xl text-white/70">{text(value, `Add ${humanize(key).toLowerCase()}`)}</p>
        ))}
        {lists.map(([key, value]) => {
          const items = rows(value);
          const visible = items.length > 0 ? items : [{}];
          return (
            <div key={key} className="mt-6 grid gap-4 sm:grid-cols-2">
              {visible.map((item, index) => (
                <article key={index} className="rounded-2xl border border-white/10 bg-[#132644] p-4" data-admin-list={key} data-admin-list-index={index}>
                  <h3 className="font-semibold">{itemLabel(item, `${humanize(key)} ${index + 1}`)}</h3>
                </article>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SplitHeading({ prefix, highlight, fallbackPrefix, fallbackHighlight }: { prefix: unknown; highlight: unknown; fallbackPrefix: string; fallbackHighlight: string }) {
  return (
    <h2 className="text-3xl font-extrabold sm:text-4xl">
      <span data-admin-field="headingPrefix">{text(prefix, fallbackPrefix)}</span>
      <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{text(highlight, fallbackHighlight)}</span>
    </h2>
  );
}

function PlaceholderSection({ block }: { block: DraftBlock }) {
  const props = block.props;
  const tone = "bg-[#0c1b30] px-6 py-16 text-white";
  const wrap = "mx-auto max-w-5xl";

  if (block.type === "AboutHero" || block.type === "BlogArticle") {
    return (
      <section className="bg-[#132644] px-6 pb-16 pt-28 text-center text-white">
        <div className={wrap}>
          <p data-admin-field="eyebrow" className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#cdfe71]">{text(props.eyebrow, "Add eyebrow")}</p>
          {block.type === "BlogArticle" ? (
            <h1 data-admin-field="title" className="text-4xl font-extrabold">{text(props.title, "Add a title")}</h1>
          ) : (
            <h1 className="text-4xl font-extrabold">
              <span data-admin-field="headingPrefix">{text(props.headingPrefix, "Add a heading ")}</span>
              <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{text(props.headingHighlight, "highlight")}</span>
            </h1>
          )}
          <p data-admin-field={block.type === "BlogArticle" ? "summary" : "description"} className="mx-auto mt-4 max-w-2xl text-white/70">{text(props.summary || props.description, "Add a description")}</p>
          {block.type === "BlogArticle" && (
            <p className="mt-4 text-sm text-white/50">{text(props.authorName, "Add author")} · {text(props.publishedAt, "Add date")} · {text(props.readMinutes, "Add read time")}</p>
          )}
        </div>
      </section>
    );
  }

  if (block.type === "BlogBody" || block.type === "PrivacySections") {
    const sections = rows(props.sections);
    const items = sections.length ? sections : [{}];
    return (
      <section className={tone}>
        <div className={`${wrap} max-w-3xl`}>
          <p data-admin-field="intro" className="mb-8 text-white/70">{text(props.intro, "Add an introduction")}</p>
          {items.map((section, index) => (
            <article key={index} className="mb-8" data-admin-list="sections" data-admin-list-index={index}>
              <h2 className="text-2xl font-bold">{text(section.number, String(index + 1).padStart(2, "0"))} {text(section.title || section.type, "Add a heading")}</h2>
              <p className="mt-3 text-white/70">{text(section.intro || section.content, "Add the section text")}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "AboutMission") {
    return (
      <section className={tone}>
        <div className={`${wrap} grid items-center gap-10 lg:grid-cols-2`}>
          <div>
            <SplitHeading prefix={props.headingPrefix} highlight={props.headingHighlight} fallbackPrefix="Add a heading " fallbackHighlight="highlight" />
            <p data-admin-field="paragraphOne" className="mt-4 text-white/70">{text(props.paragraphOne, "Add the first paragraph")}</p>
            <p data-admin-field="paragraphTwo" className="mt-4 text-white/70">{text(props.paragraphTwo, "Add the second paragraph")}</p>
            <a data-admin-field="ctaLabel" href={text(props.ctaHref, "https://book.stance.health/stance-health")} className="booking-cta mt-6 inline-block rounded-full bg-white px-6 py-3 font-bold text-[#132644]">{text(props.ctaLabel, "Add button label")}</a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div data-admin-field="imageOne" className="aspect-[4/5] rounded-2xl bg-[#3a5070]" />
            <div data-admin-field="imageTwo" className="mt-8 aspect-[4/5] rounded-2xl bg-[#3a5070]" />
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "ServiceAudience" || block.type === "ServiceApproach" || block.type === "ConditionApproach") {
    return (
      <section className={tone}>
        <div className={`${wrap} max-w-3xl`}>
          <h2 data-admin-field="heading" className="text-3xl font-extrabold">{text(props.heading, "Add a heading")}</h2>
          <p data-admin-field="body" className="mt-4 text-lg text-white/70">{text(props.body, "Add a paragraph")}</p>
        </div>
      </section>
    );
  }

  if (block.type === "ServiceFeatures" || block.type === "ConditionSymptoms" || block.type === "ConditionCauses") {
    const listKey = block.type === "ServiceFeatures" ? "features" : "items";
    const features = rows(props[listKey]);
    const items = features.length ? features : [{}];
    return (
      <section className={tone}>
        <div className={`${wrap} max-w-3xl`}>
          <h2 data-admin-field="heading" className="mb-6 text-3xl font-extrabold">{text(props.heading, "Add a heading")}</h2>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} data-admin-list={listKey} data-admin-list-index={index} className="rounded-xl border border-white/10 px-4 py-3 text-white/80">{text(item.text, `Add point ${index + 1}`)}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (block.type === "AboutValues" || block.type === "ServiceCards" || block.type === "PhilosophyHowWeDoIt" || block.type === "CareerTracks") {
    const cards = rows(props.values).concat(rows(props.services), rows(props.pillars), rows(props.tracks));
    const items = cards.length ? cards : [{}];
    return (
      <section className={tone}>
        <div className={wrap}>
          <div className="mb-8 text-center">
            <SplitHeading prefix={props.headingPrefix} highlight={props.headingHighlight} fallbackPrefix="Add a heading " fallbackHighlight="highlight" />
            <p data-admin-field="intro" className="mx-auto mt-3 max-w-2xl text-white/60">{text(props.intro, "Add a short introduction")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => (
              <article key={index} className="rounded-2xl border border-white/10 bg-[#132644] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#cdfe71]">{text(item.badge || item.label, `Item ${index + 1}`)}</p>
                <h3 className="mt-2 text-lg font-bold">{text(item.title || item.heading, "Add a title")}</h3>
                <p className="mt-2 text-sm text-white/60">{text(item.description || item.summary || item.body || item.tagline, "Add a description")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "AboutTeam") {
    const members = rows(props.members);
    const items = members.length ? members : [{}];
    return (
      <section className={tone}>
        <div className={wrap}>
          <div className="mb-8 text-center">
            <SplitHeading prefix={props.headingPrefix} highlight={props.headingHighlight} fallbackPrefix="Meet our " fallbackHighlight="team" />
            <p data-admin-field="intro" className="mt-3 text-white/60">{text(props.intro, "Add an introduction")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {items.map((member, index) => (
              <article key={index} data-admin-list="members" data-admin-list-index={index} className="rounded-2xl bg-[#132644] p-4 text-center">
                <div data-admin-list-field="image" className="mx-auto mb-4 h-28 w-28 rounded-full bg-[#3a5070]" />
                <h3 data-admin-list-field="name" className="font-bold">{text(member.name, `Team member ${index + 1}`)}</h3>
                <p data-admin-list-field="role" className="text-sm text-[#cdfe71]">{text(member.role, "Add role")}</p>
                <p data-admin-list-field="bio" className="mt-2 text-sm text-white/60">{text(member.bio, "Add a short bio")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "LocationInfo") {
    return (
      <section className={tone}>
        <div className={`${wrap} max-w-3xl rounded-2xl border border-white/10 bg-[#132644] p-8`}>
          <h2 data-admin-field="heading" className="text-3xl font-extrabold">{text(props.heading, "Add a place name")}</h2>
          <p data-admin-field="address" className="mt-4 text-white/70">{text(props.address, "Add an address")}</p>
          <p data-admin-field="phone" className="mt-2">{text(props.phone, "Add a phone number")}</p>
          <a data-admin-field="mapLabel" href={text(props.mapUrl, "https://maps.google.com")} className="mt-4 inline-block text-[#cdfe71]">{text(props.mapLabel, "Add a map link")}</a>
        </div>
      </section>
    );
  }

  if (block.type === "CareerStatistics") {
    const stats = rows(props.stats);
    const items = stats.length ? stats : [{}];
    return (
      <section className={tone}>
        <div className={wrap}>
          <SplitHeading prefix={props.headingPrefix} highlight={props.headingHighlight} fallbackPrefix="Add a heading " fallbackHighlight="highlight" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {items.map((stat, index) => (
              <article key={index} className="text-center">
                <p className="text-4xl font-extrabold text-[#cdfe71]">{text(stat.value, "00")}</p>
                <p className="mt-2 font-bold">{text(stat.label, "Add a label")}</p>
                <p className="text-sm text-white/50">{text(stat.sub, "Add supporting text")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "AssessmentPerformanceData") {
    const rows_ = rows(props.measurements);
    const items = rows_.length ? rows_ : [{}];
    return (
      <section className={tone}>
        <div className={wrap}>
          <p data-admin-field="eyebrow" className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]">{text(props.eyebrow, "Add eyebrow")}</p>
          <h2 data-admin-field="heading" className="mt-2 text-3xl font-extrabold">{text(props.heading, "Add a heading")}</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            {items.map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 border-t border-white/10 px-4 py-3 text-sm first:border-t-0">
                <span>{text(row.title, "Add a measure")}</span>
                <span>{text(row.left, "Left")}</span>
                <span>{text(row.right, "Right")}</span>
                <span className="text-[#cdfe71]">{text(row.asym, "Difference")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "AssessmentToolNavigation") {
    const tools = rows(props.tools);
    const items = tools.length ? tools : [{}];
    return (
      <section className={tone}>
        <div className={wrap}>
          <h2 data-admin-field="heading" className="mb-6 text-3xl font-extrabold">{text(props.heading, "Add a heading")}</h2>
          <div className="flex flex-wrap gap-3">
            {items.map((tool, index) => (
              <span key={index} className="rounded-full border border-[#cdfe71]/40 px-4 py-2 text-sm">{text(tool.num, String(index + 1))} {text(tool.label, "Add a tool")}</span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "CareerOpenRoles") {
    const roles = rows(props.roles);
    const items = roles.length ? roles : [{}];
    return (
      <section className={tone}>
        <div className={wrap}>
          <SplitHeading prefix={props.headingPrefix} highlight={props.headingHighlight} fallbackPrefix="Open " fallbackHighlight="roles" />
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
            {items.map((role, index) => (
              <article key={index} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <h3 className="font-bold">{text(role.title, "Add a role")}</h3>
                <p className="text-sm text-white/60">{text(role.location, "Add a location")} · {text(role.category, "Add a category")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "PartnerContactForm") {
    const fields = [
      text(props.nameLabel, "Add name label"),
      text(props.emailLabel, "Add email label"),
      text(props.organisationLabel, "Add organisation label"),
      text(props.messageLabel, "Add message label"),
    ];
    return (
      <section className="bg-[#132644] px-6 py-16 text-white">
        <div className={`${wrap} max-w-xl`}>
          <SplitHeading prefix={props.headingPrefix} highlight={props.headingHighlight} fallbackPrefix="Add a heading " fallbackHighlight="highlight" />
          <p data-admin-field="description" className="mt-3 text-white/60">{text(props.description, "Add a description")}</p>
          <div className="mt-6 space-y-3">
            {fields.map((label) => (
              <div key={label} className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white/40">{label}</div>
            ))}
            <span className="inline-block rounded-full bg-[#cdfe71] px-6 py-3 font-bold text-black">{text(props.submitLabel, "Add submit label")}</span>
          </div>
        </div>
      </section>
    );
  }

  return <GenericBlock block={block} />;
}

function SectionTemplate({ block }: { block: DraftBlock }) {
  const filled = fillBlock(block);
  if (block.type === "Hero") return <Hero previewBlock={filled} />;
  if (block.type === "Team") return <Team previewBlock={filled} />;
  if (block.type === "Centers") return <Centers previewBlock={filled} />;
  if (block.type === "Framework") return <Framework previewBlock={filled} />;
  if (block.type === "Technology") return <Technology previewBlock={filled} />;
  if (block.type === "Testimonials") return <Testimonials previewBlock={filled} />;
  if (block.type === "FAQList" || block.type === "ConditionFaqs") return <FaqTemplate block={filled} />;
  if (block.type === "AboutCta") return <CtaTemplate block={filled} />;
  return <PlaceholderSection block={block} />;
}

// Shows library blocks that the current public page does not already render.
// It runs only inside the admin preview iframe, so the public site is unchanged.
export default function LibraryDraftPreview() {
  const [blocks, setBlocks] = useState<DraftBlock[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("adminPreview") === "1";
    setEnabled(preview);
    if (!preview) return;

    const apply = (value: unknown) => {
      if (!value || typeof value !== "object") return;
      const message = value as { type?: string; draft?: DraftMessage };
      if (message.type !== SET_DRAFT_MESSAGE || !message.draft?.blocks) return;
      const missing = message.draft.blocks.filter((block) => {
        if (block.type === "NavbarContent" || block.type === "FooterContent") return false;
        const marker = document.querySelector<HTMLElement>(`[data-admin-block-id="${CSS.escape(block.id)}"]`);
        return !marker || Boolean(marker.closest("[data-admin-library-preview]"));
      });
      setBlocks(missing);
      setSlot(document.querySelector<HTMLElement>("[data-admin-draft-root]") ?? document.querySelector<HTMLElement>("main"));
    };

    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== window.parent) return;
      apply(event.data);
    };
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: PREVIEW_READY_MESSAGE }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!enabled || blocks.length === 0) return null;
  const content = (
    <div data-admin-library-preview="true">
      {blocks.map((block) => (
        <div key={`${block.id}:${JSON.stringify(block.props)}`} data-admin-block-id={block.id} data-admin-block-type={block.type}>
          <SectionTemplate block={block} />
        </div>
      ))}
    </div>
  );
  if (slot) return createPortal(content, slot);
  return content;
}

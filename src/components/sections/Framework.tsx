"use client";

import Image from "next/image";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import { FRAMEWORK_STEPS } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock, type AdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { applyAssetMeta, assetAlt } from "@/lib/asset-label";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Framework({ previewBlock }: { previewBlock?: AdminPreviewBlock | null } = {}) {
  const listened = useAdminPreviewBlock("framework", "Framework");
  const draft = previewBlock !== undefined ? previewBlock : listened;
  const published = usePublishedBlock("framework");
  const steps = applyAssetMeta(previewList(draft, "steps", FRAMEWORK_STEPS), published?.props?.steps, ["icon"]).map((step, index) => ({
    ...step,
    id: step.id || `step-${index + 1}`,
    label: step.label || `Step ${index + 1}`,
    icon: step.icon || "",
    description: step.description || "Add step description",
  }));
  const heading = previewText(draft, "heading", "Guiding Each Stride in Your Journey") || "Guiding Each Stride in Your Journey";
  const container = useRef<HTMLDivElement>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  // null until the viewport is measured, so the pinned desktop tree is never
  // mounted and then immediately removed on a narrow preview pane.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const stepKey = steps.map((step) => step.id).join("|");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (isMobile !== false) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!container.current) return;
      const endPosition = container.current.clientHeight * 2;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "-=100",
          end: `+=${endPosition}`,
          pin: true,
          snap: 1,
          scrub: -2,
        },
      });

      sections.current.forEach((section, index) => {
        if (!section) return;
        const image = section.querySelector(".pr-img");
        const content = section.querySelector(".pr-con");

        if (index > 0) {
          const dot = dots.current[index];
          if (dot) timeline.from(dot, { duration: 4, opacity: 0.5 }, "-=2");
          if (image) timeline.from(image, { duration: 4, yPercent: 20, opacity: 0 }, "-=2");
          if (content) timeline.from(content, { duration: 4, yPercent: 20, opacity: 0 }, "-=2");
        }

        if (index < sections.current.length - 1) {
          if (image) timeline.to(image, { duration: 4, yPercent: -20, opacity: 0 }, "-=2");
          if (content) timeline.to(content, { duration: 4, yPercent: -20, opacity: 0 }, "-=2");
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isMobile, stepKey]);

  return (
    <>
      <section className="sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <motion.div
                className="banner-btm-head"
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <h2 className="sec-head" data-admin-field="heading">{heading}</h2>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {isMobile === false && (
        <div className="banner-bottom-sec" ref={container}>
          <div className="dots">
            {steps.map((_, index) => (
              <span
                key={index}
                ref={(element) => {
                  dots.current[index] = element;
                }}
              />
            ))}
          </div>
          <div className="btm-wrapper">
            {steps.map((step, index) => (
              <section
                className="btm-sec sec"
                data-admin-list="steps"
                data-admin-list-index={index}
                ref={(element) => {
                  sections.current[index] = element;
                }}
                key={`${step.id}-${index}`}
              >
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-12">
                      <div className="pr-img">
                        {step.icon ? (
                          <Image
                            src={step.icon}
                            alt={assetAlt(step, "icon", step.label)}
                            width={1200}
                            height={1200}
                            data-admin-list-field="icon"
                          />
                        ) : (
                          <div data-admin-list-field="icon" className="w-full h-full bg-[#3a5070]" aria-label="Framework icon placeholder" />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 col-12">
                      <div className="pr-con">
                        <h3 className="sec-head green" data-admin-list-field="label">{step.label}</h3>
                        <p className="para big" data-admin-list-field="description">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {isMobile === true && (
        <section className="sec framework-cards-section">
          <div className="container">
            <div className="framework-cards-grid">
              {steps.map((step, index) => (
                <motion.div
                  className="framework-card"
                  data-admin-list="steps"
                  data-admin-list-index={index}
                  key={`${step.id}-${index}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <div className="framework-card-img">
                      {step.icon ? (
                        <Image
                          src={step.icon}
                          alt={assetAlt(step, "icon", step.label)}
                          width={800}
                          height={800}
                          data-admin-list-field="icon"
                        />
                      ) : (
                        <div data-admin-list-field="icon" className="w-full h-full bg-[#3a5070]" aria-label="Framework icon placeholder" />
                      )}
                  </div>
                  <div className="framework-card-content">
                    <h3 data-admin-list-field="label">{step.label}</h3>
                    <p data-admin-list-field="description">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

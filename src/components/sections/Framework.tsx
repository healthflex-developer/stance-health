"use client";

import Image from "next/image";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import { FRAMEWORK_STEPS } from "@/lib/constants";

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

export default function Framework() {
  const container2 = useRef<HTMLDivElement>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!container2.current) return;

      const endPosition = container2.current.clientHeight * 2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container2.current,
          start: "-=100",
          end: `+=${endPosition}`,
          pin: true,
          snap: 1,
          scrub: -2,
        },
      });

      sections.current.forEach((sec, index) => {
        if (!sec) return;

        const img = sec.querySelector(".pr-img");
        const heading = sec.querySelector(".pr-con");

        if (index > 0) {
          const dot = dots.current[index];

          if (dot) {
            tl.from(dot, {
              duration: 4,
              opacity: 0.5,
            }, "-=2");
          }

          if (img) {
            tl.from(img, {
              duration: 4,
              yPercent: 20,
              opacity: 0,
            }, "-=2");
          }

          if (heading) {
            tl.from(heading, {
              duration: 4,
              yPercent: 20,
              opacity: 0,
            }, "-=2");
          }
        }

        if (index < sections.current.length - 1) {
          if (img) {
            tl.to(img, {
              duration: 4,
              yPercent: -20,
              opacity: 0,
            }, "-=2");
          }

          if (heading) {
            tl.to(heading, {
              duration: 4,
              yPercent: -20,
              opacity: 0,
            }, "-=2");
          }
        }
      });
    }, container2);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

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
                <h2 className="sec-head">
                  Guiding Each Stride in <span>Your Journey</span>
                </h2>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: GSAP scroll-pinned layout */}
      {!isMobile && (
        <div className="banner-bottom-sec" ref={container2}>
          <div className="dots">
            {FRAMEWORK_STEPS.map((_, index) => (
              <span key={index} ref={(el) => {
                if (el) dots.current[index] = el;
              }} />
            ))}
          </div>
          <div className="btm-wrapper">
            {FRAMEWORK_STEPS.map((step, index) => (
              <section
                className="btm-sec sec"
                ref={(el) => {
                  if (el) sections.current[index] = el;
                }}
                key={step.id}
              >
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-12">
                      <div className="pr-img">
                        <Image src={step.icon} alt={step.label} width={1200} height={1200} />
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 col-12">
                      <div className="pr-con">
                        <h3 className="sec-head green">{step.label}</h3>
                        <p className="para big">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div >
      )
      }

      {/* Tablet/Mobile: Vertical card layout with Framer Motion */}
      {
        isMobile && (
          <section className="sec framework-cards-section">
            <div className="container">
              <div className="framework-cards-grid">
                {FRAMEWORK_STEPS.map((step, index) => (
                  <motion.div
                    className="framework-card"
                    key={step.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <div className="framework-card-img">
                      <Image src={step.icon} alt={step.label} width={800} height={800} />
                    </div>
                    <div className="framework-card-content">
                      <h3>{step.label}</h3>
                      <p>{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )
      }
    </>
  );
}

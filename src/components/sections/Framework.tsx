"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { FRAMEWORK_STEPS } from "@/lib/constants";

export default function Framework() {
  const container2 = useRef<HTMLDivElement>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      if (window.innerWidth > 768 && container2.current) {
        const endPosition = container2.current.clientHeight * 2;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container2.current,
            start: "-=100",
            end: `+=${endPosition}`,
            markers: false,
            pin: true,
            snap: 1,
            scrub: -2,
          },
        });

        sections.current.forEach((sec, index) => {
          if (!sec) return;
          const img = sec.querySelector<HTMLElement>(".pr-img");
          const heading = sec.querySelector<HTMLElement>(".pr-con");

          if (index + 1 > 1) {
            dots.current.forEach((dot, ind) => {
              if (index === ind && dot) {
                tl.from(dot, { duration: 4, opacity: 0.5 }, `-=${2}`);
              }
            });
            if (img) tl.from(img, { duration: 4, yPercent: 20, opacity: 0 }, `-=${2}`);
            if (heading) tl.from(heading, { duration: 4, yPercent: 20, opacity: 0 }, `-=${2}`);
          }

          if (sections.current.length > index + 1) {
            if (img) tl.to(img, { duration: 4, yPercent: -20, opacity: 0 }, `-=${2}`);
            if (heading) tl.to(heading, { duration: 4, yPercent: -20, opacity: 0 }, `-=${2}`);
          }
        });
      }
    }, container2);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="banner-btm-head">
                <h2 className="sec-head">
                  Guiding Each Stride in <span>Your Journey</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="banner-bottom-sec" ref={container2}>
        <div className="dots">
          {FRAMEWORK_STEPS.map((_, index) => (
            <span key={index} ref={(el) => { dots.current[index] = el; }} />
          ))}
        </div>
        <div className="btm-wrapper">
          {FRAMEWORK_STEPS.map((step, index) => (
            <section
              className="btm-sec sec"
              ref={(el) => { sections.current[index] = el; }}
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
      </div>
    </>
  );
}

'use client'
import Image from "next/image"
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const BannerBottom = () => {
    const container2 = useRef(null);
const sections = useRef([]);
const dots = useRef([]);

useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
        if (window.innerWidth > 768) {
            const img = container2.current.querySelector('img');
            const endPosition = container2.current.clientHeight * 2;
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container2.current,
                    start: '-=100',
                    end: `+=${endPosition}`,
                    markers: false,
                    pin: true,
                    // pinSpacing: false,
                    snap: 1, // Add snap property,
                    scrub: -2,
                }
            });
            // window.addEventListener('resize', () => {
            //     tl.scrollTrigger.invalidate();
            // });

            sections.current.forEach((sec, index) => {
                const img = sec.querySelector('.pr-img');
                const heading = sec.querySelector('.pr-con');
                
                if (index + 1 > 1) {
                    dots.current.forEach((dot, ind) => {
                        if (index === ind) {
                            tl.from(dot, {
                                duration: 4,
                                opacity: 0.5
                            }, `-=${2}`); // Start animation 2 seconds before the previous one ends
                        }
                    });

                    tl.from(img, {
                        duration: 4,
                        yPercent: 20,
                        opacity: 0
                    }, `-=${2}`) // Start animation 2 seconds before the previous one ends
                    .from(heading, {
                        duration: 4,
                        yPercent: 20,
                        opacity: 0
                    }, `-=${2}`); // Start animation 2 seconds before the previous one ends
                }

                if (sections.current.length > index + 1) {
                    tl.to(img, {
                        duration: 4,
                        yPercent: -20,
                        opacity: 0
                    }, `-=${2}`) // Start animation 2 seconds before the previous one ends
                    .to(heading, {
                        duration: 4,
                        yPercent: -20,
                        opacity: 0
                    }, `-=${2}`); // Start animation 2 seconds before the previous one ends
                }
            });
        }
    }, container2);

    return () => {
        ctx.revert();
    };
}, []);

      const slideContent = [
        {
            imageSrc: "/assets/images/asses.svg",
            imageAlt: "Assess",
            title: "Assess",
            description: "Evaluate your MSK health comprehensively with Stance's advanced diagnostic tools and expert tests, gaining insights into your body's needs while discovering root causes for conditions. Our assessments pave the way for recovery and performance with personalized treatment plans tailored to your unique requirements."
        },
        {
            imageSrc: "/assets/images/rehab.svg",
            imageAlt: "Rehab",
            title: "Rehab",
            description: "Create a personalized recovery and performance plan tailored to your unique requirements. Stance provides expert guidance and tools to help you achieve your health goals effectively."
        },
        {
            imageSrc: "/assets/images/engage.svg",
            imageAlt: "Re-engage",
            title: "Re-engage",
            description: "Implement your personalized plan with Stance's support. Our platform provides the resources and expert advice needed to carry out your plan and achieve your health objectives."
        },
        {
            imageSrc: "/assets/images/enhance.svg",
            imageAlt: "Enhance",
            title: "Enhance",
            description: "Review your progress with regular check-ins and assessments. Stance helps you stay on track by providing insights and adjustments to ensure your continued success."
        }
    ];
  return (
    <>
        <section>
            <div className="container">
            <div className="row">
                  <div className="col-md-6">
                     <div className="banner-btm-head">
                        <h2 className="sec-head">Guiding Each Stride in <span>Your Journey</span></h2>
                     </div>
                  </div>
                </div>
            </div>
        </section>
        <div className="banner-bottom-sec" ref={container2}>
            <div className="dots">
                {
                    [...Array(4)].map((item,index)=>{
                        return(
                         
                                <span key={index} ref={el=> dots.current[index] = el}></span>
                           
                        )
                    })
                }
            </div>
            <div className="btm-wrapper">
                
{[...Array(4)].map((item, index) => {
    const { imageSrc, imageAlt, title, description } = slideContent[index];
    return (
        <section className="btm-sec sec" ref={el => sections.current[index] = el} key={index}>
            <div className="container">
                
                <div className="row align-items-center">
                    <div className="col-lg-7 col-12">
                        <div className="pr-img">
                            <Image src={imageSrc} alt={imageAlt} width={1200} height={1200} />
                        </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 col-12">
                        <div className="pr-con">
                            <h3 className="sec-head green">{title}</h3>
                            <p className="para big">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
})}
            </div>
        </div>
    </>
  )
}

export default BannerBottom
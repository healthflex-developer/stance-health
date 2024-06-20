'use client'
import Image from "next/image";
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const SurgicalRehabBottom = () => {
    const container2 = useRef(null);
    const sections = useRef([]);
    const dots = useRef([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let ctx = gsap.context(() => {
          if (window.innerWidth > 768) {
            console.log('sec', container2.current);
            const img = container2.current.querySelector('img');
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container2.current,
                    start: 'top top',
                    end: `+=2509`,
                    markers: false,
                    pin: true,
                    scrub: -2,
                }
            })
            sections.current.forEach((sec, index)=>{
                const img = sec.querySelector('.pr-img');
                const heading = sec.querySelector('.pr-con');
                if(1 < index + 1){
                    dots.current.forEach((dot, ind)=>{
                        if(index == ind){
                            tl.from(dot, {
                                duration: 5,
                                opacity: 0.5
                            }, `-=${2}`)
                        }
                    })
                    tl.from(img, {
                        duration: 5,
                        yPercent: 20,
                        opacity: 0
                    }, `-=${4}`)
                    tl.from(heading, {
                        duration: 5,
                        yPercent: 20,
                        opacity: 0
                    }, `-=${4}`)
                }
                if(sections.current.length > index + 1){
                    tl.to(img, {
                        duration: 5,
                        yPercent: -20,
                        opacity: 0
                    }, `-=${4}`)
                    tl.to(heading, {
                        duration: 5,
                        yPercent: -20,
                        opacity: 0
                    }, `-=${4}`)
                }
            })
          
          }
        }, container2);
        return () => {
          ctx.revert();
        };
      }, []);
  return (
    <>
        <div className="banner-bottom-sec" ref={container2}>
            <div className="dots two-dots">
                {
                    [...Array(2)].map((item,index)=>{
                        return(
                         
                                <span key={index} ref={el=> dots.current[index] = el}></span>
                           
                        )
                    })
                }
            </div>
            <div className="btm-wrapper">
                {/* {
                    [...Array(2)].map((item,index)=>{
                        return( */}
                            <section className="btm-sec sec" ref={el=> sections.current[0] = el} >
                                <div className="container">
                                    <div className="row">
                                       <div className="col-md-12">
                                           <h3 className="sec-head center running-anim-head">What you <span>can expect?</span></h3>
                                       </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 col-12">
                                            <div className="pr-img">
                                                <Image src="/assets/images/side-img-5.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">Baselines and <span>Constraints</span></h3>
                                                <p className="para big">Incorporating an evidence-based surgical rehab protocol is at the core of our approach. By tracking parameters like pain levels, range of motion, and peak force production, we gain invaluable insights into the prognosis of your rehabilitation journey.<br /><br /> Our technology-based assessments help us pace your rehabilitation and ensure a smooth transition back to activity. Additionally, our specialized gait assessments post lower limb surgeries, facilitated by Runscribe, enable us to tailor precise gait improvement programs.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="btm-sec sec" ref={el=> sections.current[1] = el} >
                                <div className="container">
                                    <div className="row">
                                       <div className="col-md-12">
                                           <h3 className="desk-show sec-head center running-anim-head">What you <span>can expect?</span></h3>
                                       </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 col-12">
                                            <div className="pr-img">
                                                <Image src="/assets/images/side-img-6.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">Your recovery <span>journey</span></h3>
                                                <p className="para big">Setting out on a journey towards full recovery after any musculoskeletal (MSK) or bone and joint surgery is a complex and transformative process.<br /><br /> Our comprehensive approach ensures we manage all aspects of this journey and hand-hold you from diagnosis,recovery to long-term management. We specialize in addressing a wide range of musculoskeletal (MSK) conditions, from Arthroscopies to Joint Replacements.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        {/* )
                    })
                } */}
            </div>
        </div>
    </>
  )
}

export default SurgicalRehabBottom
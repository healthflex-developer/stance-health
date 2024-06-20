'use client'
import Image from "next/image";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const BackToSportsBottom = () => {
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
                                                <Image src="/assets/images/side-img-7.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">What’s <span>holding</span> you back</h3>
                                                <p className="para big">Dive into a transformative journey with Stance as we harmoniously merge cutting-edge rehabilitation techniques into our return-to-play programs, meticulously crafted to reintroduce you to sport-specific movements.<br /><br /> Our approach is powered by state-of-the-art technology that delves deep into aspects like Muscle Strength Asymmetry, Rate of Force, Peak Force Production, Landing Impact, Mobility Range and beyond.</p>
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
                                                <Image src="/assets/images/side-img-8.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">Your path <span>to play</span></h3>
                                                <p className="para big">The precision of every assessment helps personalize recovery plans. Our Return to Play program is designed to address a range of conditions including post-ACL injury, meniscus injuries, ankle sprains, dislocations, rotator cuff injuries, labral injuries, and other overuse injuries.<br /><br /> Our tailored Strength and Conditioning (S&C) plans are crafted based on detailed sport-specific needs analysis and athlete profiling. Join us to make a solid comeback to your sport, feeling stronger and more confident than ever before with no concerns over injury recurrences.</p>
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

export default BackToSportsBottom
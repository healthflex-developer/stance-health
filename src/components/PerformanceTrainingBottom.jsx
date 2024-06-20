'use client'
import Image from "next/image";
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const PerformanceTrainingBottom = () => {
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
                                                <Image src="/assets/images/side-img-9.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">Root causes and <span>symptoms</span></h3>
                                                <p className="para big">Our performance programs aren't just about assessing your health parameters; it's about crafting a journey that aligns with your aspirations and lifestyle.<br /><br /> Our clinicians & S&C coaches delve deep into your strengths and areas for improvement, tailoring every session to maximize your potential. With our tools, that measure muscle strength, endurance, and functional movements, we create achievable milestones based on your goals.</p>
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
                                                <Image src="/assets/images/side-img-10.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">An <span>Active life</span></h3>
                                                <p className="para big">At Stance Health, we empower individuals to embrace active living and enrich their quality of life.<br /><br /> Our programs are crafted to not only combat lifestyle disorders but also to boost overall fitness while fostering enduring habits. Whether you're gearing up for challenging treks or aiming for success in sport, our programs cover a spectrum of needs.</p>
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

export default PerformanceTrainingBottom
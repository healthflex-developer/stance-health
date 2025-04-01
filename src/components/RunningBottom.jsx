'use client'
import Image from "next/image";
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const RunningBottom = () => {
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
                                                <Image src="/assets/images/side-img-3-1.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">Goal & <span>Constrains</span></h3>
                                                <p className="para big">
                                                We use advanced tools like Runscribe and VALD to analyze and then help maximize your running efficiency. Following are some of our measurements and how it will help you:
Running style and gait patterns: 2D analysis of body structures during running.


                                                </p>
                                                <div className="btm-sec-list">
                                                   <div className="btm-list-main">
                                                      <div className="btm-list-f">
                                                      Kinematics <span>:</span>
                                                      </div>
                                                      <div className="btm-list-l">
                                                         <span>angular upper and lower body assessments</span>
                                                      </div>
                                                   </div>
                                                   <div className="btm-list-main">
                                                      <div className="btm-list-f">
                                                      Shock <span>:</span>
                                                      </div>
                                                      <div className="btm-list-l">
                                                         <span>impact Gs and braking Gs</span>
                                                      </div>
                                                   </div>
                                                   <div className="btm-list-main">
                                                      <div className="btm-list-f">
                                                      Efficiency <span>:</span>
                                                      </div>
                                                      <div className="btm-list-l">
                                                         <span>Calculated using Step rate Flight ratio and Contact time</span>
                                                      </div>
                                                   </div>
                                                   <div className="btm-list-main">
                                                      <div className="btm-list-f">
                                                      Pace <span>:</span>
                                                      </div>
                                                      <div className="btm-list-l">
                                                         <span>Stride length and stride rate</span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <p className="para big">A comprehensive analysis across all these parameters, helps us put together a concrete treatment plan.</p>
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
                                                <Image src="/assets/images/side-img-3.png" alt="" width={1200} height={1200} />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 offset-lg-1 col-12">
                                            <div className="pr-con">
                                                <h3 className="sec-head sm">Road to <span>Finish line</span></h3>
                                                <p className="para big">
                                                Our stellar team of Physiotherapists and Strength and Conditioning Coaches use principles of running biomechanics to maximize performance while treating conditions like Patellofemoral Pain, IT Band syndrome, Plantar Fasciitis, Shin Splints, Lower back pain, Muscle strains, Achilles Tendinopathy and many more.


                                                </p>
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

export default RunningBottom
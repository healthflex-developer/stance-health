'use client'
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';


const BannerSlider = () => {

  const container = useRef([]);
  const dots = useRef([]);
  const dotWrapper = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      if (window.innerWidth > 768) {
        console.log('sec', container.current);
        container.current.forEach((sec,index) => {
          const img = sec.querySelector('img');
          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: `bottom center`,
              markers: false,
              scrub: 1
            }
          })
          tl.from(img, {
            duration: 1,
            scale: 2,
          })
          if(1 < index + 1){
            dots.current.forEach((dot, ind)=>{
                if(index == ind){
                    tl.from(dot, {
                        duration: 1,
                        opacity: 0.5
                    })
                }
            })
          }
          if(index == container.current.length - 1){
            tl.to(dotWrapper.current, {
                duration: 1,
                opacity: 0
            })
          }
        })
      }
    }, container);
    return () => {
      ctx.revert();
    };
  }, []);


  const bannerdata = [
    {
      title: 'Welcome To <br className="d-sm-block d-none" /><span>Stance Health</span>',
      description: "Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery",
      buttonLink: "/",
      buttonLabel: "Get Started",
      image: "/assets/images/banner.jpg",
      mobileImage: "/assets/images/banner-mobile.jpg",
    },
    {
      title: 'Welcome To <br className="d-sm-block d-none" /><span>Stance Health</span>',
      description: "Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery",
      buttonLink: "/",
      buttonLabel: "Get Started",
      image: "/assets/images/banner.jpg",
      mobileImage: "/assets/images/banner-mobile.jpg",
    },
    {
      title: 'Welcome To <br className="d-sm-block d-none" /><span>Stance Health</span>',
      description: "Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery",
      buttonLink: "/",
      buttonLabel: "Get Started",
      image: "/assets/images/banner.jpg",
      mobileImage: "/assets/images/banner-mobile.jpg",
    },
  ]
  return (
    <header className="main-header" >
      <div className="dots" ref={dotWrapper}>
          {
              [...Array(3)].map((item,index)=>{
                  return(
                     
                          <span key={index} ref={el=> dots.current[index] = el}></span>
                    
                  )
              })
          }
      </div>
      {
        bannerdata.map((item, index) => {
          const titleHtml = { __html: item.title };
          return (
            <section key={index} className="banner-slide" ref={el => container.current[index] = el}>
              <picture>
                <source srcset={item.mobileImage} media="(max-width:600px)" />
                <Image src={item.image} width={1920} height={1080} alt="" />
              </picture>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <div className="banner-con">
                      <h1 dangerouslySetInnerHTML={titleHtml} />
                      <p className="para">
                        {item.description}
                      </p>
                      <Link href={item.buttonLink} className="main-btn">
                        {item.buttonLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })
      }
    </header>
  )
}

export default BannerSlider
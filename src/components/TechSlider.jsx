import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import gsap from 'gsap';
import Image from 'next/image';

const TechSlider = () => {
    const [tab, setTab] = useState(null);
    const container = useRef(null);
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    useLayoutEffect(() => {
        if (container.current) {
            let ctx = gsap.context(() => {
                const img = container.current.querySelector('.s-img');
                const text = container.current.querySelector('.con');
                var tl = gsap.timeline({});
                tl.from(img, {
                    duration: 1,
                    yPercent: 20,
                    opacity: 0,
                });
                tl.from(text, {
                    duration: 1,
                    yPercent: 20,
                    opacity: 0,
                }, "-=0.5");
            }, container);
            return () => {
                ctx.revert();
            };
        }
    }, [tab]);

    const slideContent = [
        {
            imageSrc: "/assets/images/run.svg",
            imageAlt: "Assess",
            title: "Run Scribe",
            description: "Comprehensive gait and running analysis built for Runners and Sports Enthusiasts",
        },
        {
            imageSrc: "/assets/images/dynamo.svg",
            imageAlt: "Rehab",
            title: "VALD : <span>Dynamo</span>",
            description: "Portable Dynamometer and inclinometer for testing strength and range of motion",
        },
        {
            imageSrc: "/assets/images/force.svg",
            imageAlt: "Re-engage",
            title: "VALD : <span>Force Frame</span>",
            description: " Accurate testing of isometric strength across various muscle groups. ",
        },
        {
            imageSrc: "/assets/images/deck.svg",
            imageAlt: "Enhance",
            title: "VALD : <span>Force Decks</span>",
            description: " Dual, Uniaxial Force Plates for assessing power, balance & movement.",
        },
        {
            imageSrc: "/assets/images/tech1.jpg",
            imageAlt: "Enhance",
            title: "HealthFlex",
            description: "AI-based motion sensors that guide you in your rehabilitation journey at home.",
        },
    ];

    return (
        <>
            <section data-scroll data-scroll-css-progress="1" data-scroll-position="start, end" data-scroll-offset="-200%, 100%" className="sec tech-sec">
                <div className="card-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h3 className="sec-head dark">
                                    Technology Blended with Science
                                </h3>
                                <p className="dark para sub-txt">
                                    Data that helps us, help you
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Swiper
                                    ref={sliderRef}
                                    className="tech-swiper"
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    slidesPerView={4}
                                    spaceBetween={0}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1.5,
                                            spaceBetween: 20,
                                        },
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                    }}
                                >
                                    {slideContent.map((item, index) => {
                                        const titleHtml = { __html: item.title };
                                        return (
                                            <SwiperSlide key={index}>
                                                <div className="tech-card" onClick={() => setTab(index + 1)}>
                                                    <div className="tech-img">
                                                        <Image src={item.imageSrc} width={500} height={500} alt="" />
                                                    </div>
                                                    <div className="det">
                                                        <h3 dangerouslySetInnerHTML={titleHtml} />
                                                        <p className="para">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="tech-nav">
                                    <button className='tech-prev' onClick={handlePrev}>
                                        <Image src="/assets/images/prev.svg" width={50} height={50} />
                                    </button>
                                    <button className='tech-next' onClick={handleNext}>
                                        <Image src="/assets/images/next.svg" width={50} height={50} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {slideContent.map((item, index) => {
                    const titleHtml = { __html: item.title };
                    return (
                        tab === index + 1 && (
                            <div className="tech-popup" key={index} ref={container}>
                                <div className="popup-overlay" onClick={() => setTab(null)} />
                                <div className="popup-content">
                                    <div className="container">
                                        <div className="row flex-lg-row-reverse align-items-center">
                                            <div className="col-lg-6 col-12">
                                                <div className="s-img">
                                                    <button onClick={() => setTab(null)}>
                                                        <Image src="/assets/images/close.svg" alt="" width={50} height={50} />
                                                    </button>
                                                    <Image src={item.imageSrc} alt="" width={1920} height={1920} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="con">
                                                    {/* <h3 className="sec-head dark">
                                                        Technology Blended with Media Science
                                                    </h3> */}
                                                    <div className="con-inner">
                                                        <h3 className="sm-head dark" dangerouslySetInnerHTML={titleHtml} />
                                                        <p className="para dark">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    );
                })}
            </section>
        </>
    );
};

export default TechSlider

'use client'
import React,{useRef, useCallback} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules';
import "swiper/css";

import Image from 'next/image';
import Link from 'next/link';
const TeamSlider = () => {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    return (
        <section data-scroll data-scroll-css-progress="1" data-scroll-position="start, end" data-scroll-offset="-100%, 100%" className="sec test-sec">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3 className="sec-head">
                        Flawless Team
                        </h3>
                        <p className="para sub-txt">
                        Experience That Matters
                        </p>
                    </div>
                    <div className="col-12">
                        <div className="team-slider">
                            <Swiper
                            ref={sliderRef}
                                scrollbar={{
                                    hide: false,
                                    draggable: true,
                                }}
                                className="team-swiper"
                                modules={[Scrollbar]}
                                // autoplay={{
                                //     delay: 3000,
                                //     disableOnInteraction: false,
                                // }}
                                slidesPerView={4}
                                spaceBetween={0}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1.3,
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
                                        slidesPerView: 4,
                                        spaceBetween: 40,
                                    },
                                }}
                                // onBeforeInit={(swiper) => {
                                // }}
                                // ref={sliderRef}
                            >
                                {/* {
                                    [...Array(5)].map((item,index)=>{
                                        return( */}
                                            <SwiperSlide>
                                                <div className="team-card hover-card">
                                                    <Image src="/assets/images/team-1.svg" width={1500} height={1500} alt="" />
                                                    <div className="con">
                                                        <div className="tp">
                                                            <h3>
                                                            Durga Joshi
                                                            </h3>
                                                            <h4>Lead Musculoskeletal and Sports Physiotherapist</h4>
                                                        </div>
                                                        <p className="para">
                                                        Durga brings over 12 years of experience in musculoskeletal and sports physiotherapy, specializing in manual therapy techniques such as Maitland, McKenzie, Clinical Pilates, and Butler’s Neurodynamic treatments. Her professional journey includes collaborations with esteemed institutions like Sakra World Hospital and YOS Sports Health Specialists, as well as working closely with industry’s best physiotherapists and sports medicine doctors.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="team-card hover-card">
                                                    <Image src="/assets/images/team-2.svg" width={1500} height={1500} alt="" />
                                                    <div className="con">
                                                        <div className="tp">
                                                            <h3>
                                                            Sumesh Ashokan
                                                            </h3>
                                                            <h4>Senior Musculoskeletal and Sports Physiotherapist</h4>
                                                        </div>
                                                        <p className="para">
                                                        As an athlete turned physiotherapist, Sumesh's mission at Stance is to guide you from injury recovery to performance enhancement. With his experience in various sports and a deep understanding of human anatomy, he provides personalized care tailored to your needs. His holistic approach ensures accurate diagnosis and prevention of future injuries, helping you achieve a better tomorrow.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="team-card hover-card">
                                                    <Image src="/assets/images/team-3.svg" width={1500} height={1500} alt="" />
                                                    <div className="con">
                                                        <div className="tp">
                                                            <h3>
                                                            Arjun K Raj
                                                            </h3>
                                                            <h4>Senior Strength and Conditioning Coach</h4>
                                                        </div>
                                                        <p className="para">
                                                        At Stance, Arjun's goal is to help you achieve your fitness aspirations through personalized, meticulously crafted training programs. By understanding your unique needs, he tailors each plan to guide you towards peak performance and a healthier lifestyle. Together, you will unlock your full potential and ensure every step is taken towards your success.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="team-card hover-card">
                                                    <Image src="/assets/images/team-4.svg" width={1500} height={1500} alt="" />
                                                    <div className="con">
                                                        <div className="tp">
                                                            <h3>
                                                            Surbhi Paranjpe
                                                            </h3>
                                                            <h4>Senior Musculoskeletal and Sports Physiotherapist</h4>
                                                        </div>
                                                        <p className="para">
                                                        With a commitment to precise diagnosis and evidence-based treatment, Surbhi helps you manage and overcome musculoskeletal conditions. Her focus is on pain management and performance enhancement, ensuring you achieve your objectives while minimizing injury risks. Through tailored programs and education, she empowers you to reach your full athletic potential.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        {/* )
                                    })
                                } */}
                            </Swiper>
                            <div className="tech-nav">
                                <button className='tech-prev' onClick={handlePrev}>
                                    <Image src="/assets/images/prev.svg" width={50} height={50} />
                                </button>
                                <button className='tech-next' onClick={handleNext}>
                                    <Image src="/assets/images/next.svg" width={50} height={50} />
                                </button>
                            </div>
                        </div>
                            <Link href="/about" className='main-btn center'>
                                <span>Explore Now</span>
                            </Link>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamSlider
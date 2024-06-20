'use client'
import React, {useRef, useCallback} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";

import Image from 'next/image';
const TestimonialSlider = () => {
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
        <section data-scroll data-scroll-css-progress="1" data-scroll-offset="10%, 100%" className="sec test-sec">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3 className="sec-head">
                        Testimonial
                        </h3>
                    </div>
                    <div className="col-12">
                        <Swiper
                        ref={sliderRef}
                            className="test-swiper"
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            slidesPerView={4}
                            spaceBetween={0}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
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
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/ritura.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    “I went through an ACL surgery 4 months ago and have worked with multiple people to get back  to normalcy. Both the technology assessments and knowledgeable consultation with the Physio at Stance helped  me to understand the underlying issues which helped the team to curate my rehab.”
                                                    </p>
                                                    <div className="test-bt">
                                                        <h3>Ritura Biswas</h3>
                                                        <span>Fintech Growth Lead <br />Undergone ACL & Meniscus Surgery</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/anuj.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    “After living with prolonged back pain for years, I had the opportunity of visiting Stance where I acquired a deeper understanding about my condition. The transparent diagnosis and Data based assessments provided a sense of relief in tackling my rehab goals.”

                                                    </p>
                                                    <div className="test-bt">
                                                        <h3>Anuj Jindal</h3>
                                                        <span>SVP of MediAssist<br />
                                                        Chronic Back pain</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/nikhil.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    “After consulting with the physios at Stance, they reassured me that I was displaying progress and clarified all my doubts and queries. Their process of treatment and care enabled me to gain immense confidence in my abilities.” 
                                                    </p>
                                                    <div className="test-bt">
                                                        <h3>Nikhil Thard</h3>
                                                        <span>Chairman of Edifice Labs <br />Low back pain</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/divyanshu.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    The experience as Stance was new for me. While I have a trainer, after coming to Stance and undergoing their assessments I learnt alot of new things about my strength, muscle imbalances and areas of improvement. Kudos, to the team for building something so data and technology-first in this space!
                                                    </p>
                                                    <div className="test-bt">
                                                    <h3>Divyanshu</h3>
                                                    <span>Founder - Glam+<br /> Health Enthusiast</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/linganmeni.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    I am a fervent basketball fan and often take time out of my busy schedule to indulge in the sport. I was unable to continue to play due to some pain in my knee. I wanted to get back to sport unhindered and I visited Stance to consult Dr. Durga. With the combination of data-backed assessments and thorough treatment plans, I feel I’m in capable hands with Stance.
                                                    </p>
                                                    <div className="test-bt">
                                                        <h3>Ashish Lingamneni</h3>
                                                        <span>Marketing Leader</span><br />
                                                        <span>Basketball Enthusiast</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/aastha.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    I consulted Dr. Durga at Stance Health for sharp pain in my left knee. She quickly diagnosed the issue, supported by strength test tools available at Stance Health. After a series of rehab and mobility sessions, along with recommended home exercises, my knee pain was resolved within a couple of weeks. I'm very happy with Dr. Durga and Stance Health, and I've been recommending them to everyone I know.
                                                    </p>
                                                    <div className="test-bt">
                                                        <h3>Aastha Gupth</h3>
                                                        <span>Digital experience architect at Adobe<br /> Anterior knee pain</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/saumya.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    I’ve met multiple physiotherapists in Bangalore, and have also been training with multiple coaches, but I was very impressed with Stance’s scientific approach and data-backed assessments. Their commitment to building a solution using state-of-the-art technology helped me understand my recovery journey better.
                                                    </p>
                                                    <div className="test-bt">
                                                        <h3>Saumya Dubey</h3>
                                                        <span>Product Leader <br />Recurrent Ankle Pain</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="test-card">
                                                <div className="test-pf">
                                                    <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                    <Image src="/assets/images/pranav.png" className='prof' alt="" width={100} height={100} />
                                                </div>
                                                <div className="test-det">
                                                    <p className="para">
                                                    “I went through an ACL surgery 2 months ago and my experience at Stance was reassuring and reinforced my dedication to rehabilitation. Dr Durga’s evaluation and Stance’s best-in-class technology assessments provided an objective understanding of my recovery. I’m eager now to complete my rehab at Stance and return to playing football, hopefully stronger than before.”</p>
                                                    <div className="test-bt">
                                                        <h3>Pranav Iyer</h3>
                                                        <span>Founding Team at Stable Money <br />Acl Surgery</span>
                                                    </div>
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
                </div>
            </div>
        </section>
    )
}

export default TestimonialSlider
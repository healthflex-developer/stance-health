import React, {useCallback, useRef} from "react";

"use-client";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import {Autoplay, Scrollbar} from "swiper/modules";
import {LinkedIn} from "@mui/icons-material";
import Link from "next/link";

const vcContent = [
    {
        imageSrc: "/assets/images/gc-vc-logo.png",
        imageAlt: "gc-vc-logo",
    },
    {
        imageSrc: "/assets/images/antler-vc-logo.svg",
        imageAlt: "antler-vc-logo",
    },
    {
        imageSrc: "/assets/images/dev-vc-logo.webp",
        imageAlt: "dev-vc-logo",
    },
    {
        imageSrc: "/assets/images/sword-vc-logo.png",
        imageAlt: "sword-vc-logo",
    },
];

const angelsContent = [
    {
        name:"Shriharsha Majety",
        company:"Co-Founder, Swiggy",
        imageSrc:"/assets/images/sriharsha-majety-swiggy.png",
        imageAlt:"sriharsha-majety-swiggy-image",
        linkedin:"https://www.linkedin.com/in/sriharsha-m-563aa217/",
        company_logo: "/assets/images/swiggy-logo.svg",
    },
    {
        name:"Nandan Reddy",
        company:"Co-Founder, Swiggy",
        imageSrc:"/assets/images/nandan-reddy-swiggy.webp",
        imageAlt:"nandan-reddy-swiggy-image",
        linkedin:"https://www.linkedin.com/in/nandan-reddy-1830659/",
        company_logo: "/assets/images/swiggy-logo.svg",
    },
    {
        name:"Amarendra Sahu",
        company:"Co-Founder, NestAway",
        imageSrc:"/assets/images/amarendra-sahu-nestaway.png",
        imageAlt:"amarendra-sahu-nestaway-image",
        linkedin: "https://www.linkedin.com/in/amarendra-sahu-09b6848/",
        company_logo:"/assets/images/nestway-logo.png",
    },
    {
        name:"Varun Khona",
        company:"Co-Founder & CEO, Headout",
        imageSrc:"/assets/images/varun-khona-headout.png",
        imageAlt:"varun-khona-headout-image",
        linkedin: "https://www.linkedin.com/in/varunkhona/",
        company_logo: "/assets/images/headout-logo.svg",
    },
    {
        name:"Kulin Shah",
        company:"Co-Founder, Onsurity",
        imageSrc:"/assets/images/kulin-shah-onsurity.png",
        imageAlt:"sriharsha-majety-swiggy-image",
        linkedin: "https://www.linkedin.com/in/kcshah/",
        company_logo: "/assets/images/onsurity-logo.jpg",
    },
    {
        name:"Suren Sultania",
        company:"Co-Founder & CEO, Headout",
        imageSrc:"/assets/images/suren-sultania-headout.png",
        imageAlt:"suren-sultania-headout-image",
        linkedin: "https://www.linkedin.com/in/sultania/",
        company_logo: "/assets/images/headout-logo.svg",
    },
    {
        name:"Shan MS",
        company:"Co-Founder, Namma Yatri",
        imageSrc:"/assets/images/shan-ms-namma-yatri.png",
        imageAlt:"shan-ms-namma-yatri-image",
        linkedin: "https://www.linkedin.com/in/shan-m-s-9474a1/",
        company_logo: "/assets/images/namma-yatri-logo.png",
    },
];

const asSeenInContent = [
    {
        imageSrc:"/assets/images/biovoice-logo.png",
        imageAlt:"biovoice-image",
    },
    {
        imageSrc: "/assets/images/business-world-logo.jpeg",
        imageAlt:"businesswolrd-image",

    }
]

export default function BackedByBanner(){
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
        <section data-scroll data-scroll-css-progress="1" data-scroll-position="start, end" data-scroll-offset="-200%, 100%" className="sec backed-by-sec">
            <Container>
                <Row>
                    <Col className="text-center">
                        <h3 className="sec-head backed-by-sec-heading dark">Backed by Top VC Firms</h3>
                    </Col>
                </Row>
                <Row className="backed-by-container">
                    <Swiper
                        className="backed-by-swiper"
                        slidesPerView={3}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{ delay: 0, disableOnInteraction: false }}
                        modules={[Autoplay]}
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4},
                        }}
                        freeMode={true}
                        speed={8000}
                    >
                    {vcContent.map((item, index) => (
                        <SwiperSlide key={index} className="d-flex justify-content-center as-seen-in-slide">
                            <div className="p-2 border bg-light d-flex align-items-center justify-content-center backed-by-image-container">
                                <Image
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    width={140}
                                    height={0}
                                    style={{ height: "auto", objectFit: "contain" }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </Row>
                {/* DON'T DELETE THIS. KEPT TO ENABLE LATER */}

                {/*<Row className="as-seen-in-container">*/}
                {/*    <Col className="text-center">*/}
                {/*        <h3 className="sec-head dark">As Seen In</h3>*/}
                {/*    </Col>*/}
                {/*    <Col className="as-seen-in-slider">*/}
                {/*        <Swiper*/}
                {/*            className="as-seen-in-swiper"*/}
                {/*            slidesPerView={3}*/}
                {/*            spaceBetween={20}*/}
                {/*            loop={true}*/}
                {/*            autoplay={{ delay: 0, disableOnInteraction: false }}*/}
                {/*            modules={[Autoplay]}*/}
                {/*            breakpoints={{*/}
                {/*                0: { slidesPerView: 2 },*/}
                {/*                640: { slidesPerView: 2 },*/}
                {/*                1024: { slidesPerView:2},*/}
                {/*            }}*/}
                {/*            freeMode={true}*/}
                {/*            speed={8000}*/}
                {/*        >*/}
                {/*            {asSeenInContent.map((item, index) => (*/}
                {/*                <SwiperSlide key={index} className="d-flex justify-content-center as-seen-in-slide">*/}
                {/*                    <div className="p-2 border rounded bg-light d-flex align-items-center justify-content-center backed-by-vc-image-container">*/}
                {/*                        <img src={item.imageSrc} alt={item.imageAlt} width={160} height={80} />*/}
                {/*                    </div>*/}
                {/*                </SwiperSlide>*/}
                {/*            ))}*/}
                {/*        </Swiper>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row className="angels-container">
                    <Col className="text-center">
                        <h3 className="sec-head dark">Trusted by leading Angel Investors</h3>
                    </Col>
                    <Swiper
                        ref={sliderRef}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                        }}
                        className="team-swiper"
                        modules={[Autoplay,Scrollbar]}
                        slidesPerView={4}
                        spaceBetween={0}
                        loop
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
                        >
                        {
                            angelsContent.map((item,index)=>(
                                <SwiperSlide key={{index}}>
                                    <div className="team-card angels-card">
                                        {/*<Image src={item.imageSrc} width={1500} height={1500} alt={item.imageAlt}/>*/}
                                        <img src={item.imageSrc} alt={item.imageAlt}/>
                                        <div className="con angels-card-content">
                                            <div>
                                                <div className="angels-card-title">
                                                    <h3>
                                                        {item.name}
                                                    </h3>
                                                    <Link href={item.linkedin}>
                                                        <LinkedIn width={50} height={50} />
                                                    </Link>
                                                </div>
                                                <div className="angels-card-desc">
                                                    <h4>{item.company}</h4>
                                                    <div style={{backgroundColor:"white", borderRadius:"2px", padding:"0 1px"}}>
                                                        <img src={item.company_logo}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className="tech-nav">
                        <button className='tech-prev' onClick={handlePrev}>
                            <Image src="/assets/images/prev.svg" width={50} height={50} />
                        </button>
                        <button className='tech-next' onClick={handleNext}>
                            <Image src="/assets/images/next.svg" width={50} height={50} />
                        </button>
                    </div>
                </Row>
            </Container>
        </section>
    );
}

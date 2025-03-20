'use client';
import React, { useRef, useCallback, useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import axios from 'axios';

import Image from 'next/image';
import Spinner from "react-bootstrap/Spinner";

import {PLACE_ID} from "@/pages/api/reviews";

import {truncateText} from "@/utils/truncateText";

const GoogleReviewWidget = () => {
    const sliderRef = useRef(null);
    const [reviews, setReviews] = useState([]);
    const [overallReviewData, setOverallReviewData] = useState({
        rating: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const starFilledStyle = { color: '#FFD700' };
    const starEmptyStyle = { color: '#ccc' };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('api/reviews');
                if (response.data && response.data.result && response.data.result.reviews) {
                    setReviews(response.data.result.reviews);
                    setOverallReviewData({
                        rating: response.data.result?.rating || 0,
                        total: response.data.result?.user_ratings_total || 0,
                    });
                } else {
                    setError('No reviews found');
                }
            } catch (err) {
                setError('Failed to fetch reviews');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);


    const renderOverallStarRating = (rating) => {
        const max = 5;
        const percentage = Math.round((rating / max) * 100);

        return (
            <div className="rating-container">
                {Array.from(Array(max).keys()).map((_, i) => (
                    <img src="/assets/images/star.svg" className="start" width={20} height={20}/>
                ))}
                <div className="overlay" style={{ width: `${100 - percentage}%` }} />
            </div>
        )
    };

    const renderStarRating = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} style={i < rating ? starFilledStyle : starEmptyStyle}>
                {i < rating ? '★' : '☆'}
            </span>
            );
        }
        return <div style={{ marginBottom: '10px' }}>{stars}</div>;

    };


    const handleWriteReview = () => {
        // Open Google review page in a new tab
        window.open(`https://search.google.com/local/writereview?placeid=${PLACE_ID}`, "_blank");
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const formatName = (name) => {
        if (!name) return '';
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <section data-scroll data-scroll-css-progress="1" data-scroll-offset="10%, 100%" className="sec test-sec google-widget-sec">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between align-items-center mb-4 google-widget-heading">
                        <h3 className="sec-head mb-0">
                            What our Customers Say About Us
                        </h3>
                    </div>

                    {/* Overall Rating Section */}
                    {!loading && !error && (
                        <div className="col-12 mb-4 d-flex justify-content-between overall-rating">
                            <div className="d-flex align-items-center flex-md-row">
                                <div style={{ marginRight: '1rem' }} className="mb-md-0">
                                    <h2>{overallReviewData.rating.toFixed(1)}</h2>
                                </div>
                                <div style={{ marginRight: '1.5rem' }}>
                                    {renderOverallStarRating(overallReviewData.rating)}
                                </div>
                                <div>
                                    <p style={{ marginBottom: 0 }}>Based on {overallReviewData.total} reviews</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-12">
                        {loading && <div className="text-center"><Spinner/></div>}
                        {error && <div className="text-center text-danger">{error}</div>}

                        {!loading && !error && (
                            <>
                                <Swiper
                                    ref={sliderRef}
                                    className="test-swiper"
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
                                >
                                    {/* Map through the API reviews */}
                                    {reviews.map((review, index) => (
                                        review.rating >= 4 && (
                                            <SwiperSlide key={index}>
                                                <div className="test-card">
                                                    <div className="test-pf">
                                                        <Image src="/assets/images/quote.svg" className='quote' alt="" width={100} height={100} />
                                                        <Image
                                                            src={review.profile_photo_url}
                                                            className='prof'
                                                            alt={review.author_name}
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className="test-det">
                                                        {renderStarRating(review.rating)}
                                                        <p className="para" style={{marginTop:"0.5rem"}}>"{truncateText(review.text,250)}"</p>
                                                        <div className="test-bt">
                                                            <h3>{formatName(review.author_name)}</h3>
                                                            <span>{review.relative_time_description}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    ))}
                                </Swiper>
                                <div className="tech-nav">
                                    <button className='tech-prev' onClick={handlePrev}>
                                        <Image src="/assets/images/prev.svg" width={50} height={50} alt="Previous" />
                                    </button>
                                    <button className='tech-next' onClick={handleNext}>
                                        <Image src="/assets/images/next.svg" width={50} height={50} alt="Next" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoogleReviewWidget;

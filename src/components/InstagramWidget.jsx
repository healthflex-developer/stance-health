'use client';
import React, { useRef, useCallback, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import axios from 'axios';

import Image from 'next/image';
import { Button } from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

import { truncateText } from "@/utils/truncateText";

const InstagramWidget = () => {
    const sliderRef = useRef(null);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const handlePlayPause = (id) => {
        setPlayingVideoId((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/ig-posts', {
                    params: {
                        media_type: "VIDEO",
                    }
                });

                if (response.data?.data && Array.isArray(response.data.data)) {
                    setPosts(response.data.data);
                } else {
                    setError('No Instagram posts found');
                }
            } catch (err) {
                setError('Failed to fetch Instagram posts');
                console.error('Error fetching Instagram posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramPosts();
    }, []);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        setPlayingVideoId(null); // Stop any playing video
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        setPlayingVideoId(null); // Stop any playing video
        sliderRef.current.swiper.slideNext();
    }, []);

    const handleFollowUs = () => {
        window.open('https://www.instagram.com/stance.health/', '_blank');
    };

    return (
        <section className="instagram-widget-sec">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex gap-2 align-items-center instagram-widget-sec-head">
                            <img src="/assets/images/ig-icon.png" className="instagram-logo"/>
                            <h3 className="sec-head mb-0 instagram-gradient-text">Stance In Motion</h3>
                        </div>
                        <Button variant="outline-danger" onClick={handleFollowUs} className="main-btn follow-button">
                            Follow Us
                        </Button>
                    </div>

                    <div className="col-12">
                        {loading && <div className="loading-text"><Spinner/></div>}
                        {error && <div className="error-text">{error}</div>}

                        {!loading && !error && (
                            <>
                                {/* Desktop View */}
                                <div className="row d-none d-md-flex">
                                    {posts.map((post) => (
                                        <div key={post.id} className="col-md-4 mb-4">
                                            <div className="reel-card">
                                                <div className="reel-media">
                                                    {post.media_type === 'VIDEO' ? (
                                                        <div className="video-wrapper">
                                                            <ReactPlayer
                                                                url={post.media_url}
                                                                height="100%"
                                                                width="100%"
                                                                playing={playingVideoId === post.id}
                                                                controls={false}
                                                                loop={false}
                                                                onEnded={() => handlePlayPause(post.id)}
                                                            />
                                                            {/* Custom Controls on Top */}
                                                            <Button className="play-icon" onClick={() => handlePlayPause(post.id)}>
                                                                {playingVideoId === post.id ? (
                                                                    <PauseCircleFilledIcon />
                                                                ) : (
                                                                    <PlayCircleFilledIcon />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Image
                                                            src={post.media_url}
                                                            alt={truncateText(post.caption, 200)}
                                                            fill
                                                            className="reel-image"
                                                        />
                                                    )}
                                                    <div className="reel-overlay">
                                                        <div className="user-info">
                                                            <div className="profile-image">
                                                                <Image
                                                                    src={'/assets/images/logo.svg'}
                                                                    alt={post.username}
                                                                    fill
                                                                />
                                                            </div>
                                                            <span className="username">{post.username}</span>
                                                        </div>
                                                        <p className="caption">{truncateText(post.caption, 200)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile View */}
                                <div className="d-md-none">
                                    <Swiper ref={sliderRef} className="instagram-swiper" slidesPerView={1} spaceBetween={20} onSlideChange={()=>setPlayingVideoId(null)} loop>
                                        {posts.map((post) => (
                                            <SwiperSlide key={post.id}>
                                                <div className="reel-card">
                                                    <div className="reel-media">
                                                        {post.media_type === 'VIDEO' ? (
                                                            <div className="video-wrapper">
                                                                <ReactPlayer
                                                                    url={post.media_url}
                                                                    height="100%"
                                                                    width="100%"
                                                                    playing={playingVideoId === post.id}
                                                                    controls={false}
                                                                    loop={false}
                                                                />
                                                                <Button className="play-icon" onClick={() => handlePlayPause(post.id)}>
                                                                    {playingVideoId === post.id ? (
                                                                        <PauseCircleFilledIcon />
                                                                    ) : (
                                                                        <PlayCircleFilledIcon />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Image
                                                                src={post.media_url}
                                                                alt={truncateText(post.caption, 200)}
                                                                fill
                                                                className="reel-image"
                                                            />
                                                        )}
                                                        <div className="reel-overlay">
                                                            <div className="user-info">
                                                                <div className="profile-image">
                                                                    <Image
                                                                        src={'/assets/images/logo.svg'}
                                                                        alt={post.username}
                                                                        fill
                                                                    />
                                                                </div>
                                                                <span className="username">{post.username}</span>
                                                            </div>
                                                            <p className="caption">{truncateText(post.caption, 200)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
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
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstagramWidget;

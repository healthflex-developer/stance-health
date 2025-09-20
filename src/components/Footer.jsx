'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CentersCarousel from './CentersCarousel';



const Footer = () => {
  return (
    <>
      <CentersCarousel />
      <footer className="main-footer">
        <div className="container">
            <div className="ft-main-wrap pb-0">
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <Link href="/" className="ft-logo">
                            <Image src="/assets/images/logo.png" alt="" width={24} height={24} />
                        </Link>
                        <h3 className="mt-30 ft-head">Follow Us</h3>
                        <ul className="soc-list">
                            <li>
                                <Link href="https://www.facebook.com/profile.php?id=61560825009195" target='_blank'>
                                <Image src="/assets/images/facebook.svg" alt="" width={24} height={24} />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.linkedin.com/company/stancehealth/?originalSubdomain=in" target='_blank'>
                                <Image src="/assets/images/linkedin.svg" alt="" width={32} height={32} />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.instagram.com/stance.health/" target='_blank'>
                                <Image src="/assets/images/insta.svg" alt="" width={24} height={24} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-12">
                        <h3 className="ft-head">
                            About Us
                        </h3>
                        <ul className="ft-list">
                            <li>
                                <Link href="/">
                                Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                We are Stance
                                </Link>
                            </li>
                            <li>
                                <Link href="/philosophy">
                                Philosophy
                                </Link>
                            </li>
                            <li>
                                <Link href="/partners">
                                Partner With Us
                                </Link>
                            </li>
                            {/* <li>
                                <a href="https://dashboard.stance.health/onboarding-patient" target='_blank' rel="noreferrer">
                                Book an Appointment
                                </a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <h3 className="ft-head">
                            Programs
                        </h3>
                        <ul className="ft-list">
                            <li><Link href="/running">In Your Stride</Link></li>
                            <li><Link href="/back-to-sports">Reclaim Your Game</Link></li>
                            <li><Link href="/surgical-rehab">Back on your feet</Link></li>
                            <li><Link href="/injury-management">Prevention & Recovery</Link></li>
                            <li><Link href="/performance-training">Breaking Barriers</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 col-12">
                        <h3 className="ft-head">
                            Other Links
                        </h3>
                        <ul className="ft-list">
                            <li>
                                <Link target='_blank' href="https://maps.app.goo.gl/ybtjB2YiqPV9yyUw6?g_st=aw">
                                Location
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="btm-text">
                        © 2024 Stance - All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </>

  )
}

export default Footer
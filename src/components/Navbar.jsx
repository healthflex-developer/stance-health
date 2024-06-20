'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';


const Navbar = () => {
    const [menuOpen, setMenuClose] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const [domloaded, setDomLoaded] = useState(false);

    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const handleContentLoad = () => {
            // setIsLoading(false);
        };
        window.addEventListener('DOMContentLoaded', handleContentLoad);
        setTimeout(() => {
        console.log('Fetching data (simulated delay)...');
        setIsLoading(false);
        }, 5000);

        return () => {
        window.removeEventListener('DOMContentLoaded', handleContentLoad);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          if (scrollPosition > 50) {
            setSticky(true);
          } else {
            setSticky(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
        setDomLoaded(true)
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const links = [
        {
            name : 'We are Stance',
            link : '/about',
            mega: false
        },
        {
            name : 'Philosophy',
            link : '/philosophy',
            mega: false
        },
        {
            name : 'Programs',
            link : '/program',
            mega: true
        },
        {
            name : 'Partners',
            link : '/partners',
            mega: false
        },
        // {
        //     name : 'Faq',
        //     link : '/faq',
        //     mega: false
        // },
        
        // {
        //     name : 'Blogs',
        //     link : '/blog',
        //     mega: false
        // },
        // {
        //     name : 'Gallery',
        //     link : '/gallery',
        //     mega: false
        // },
    ]

  return (
    <>
    
        <nav className={`main-nav  ${isSticky ? 'sticky-menu' : ''}`}>
            <div className="container">
                <div className="nav-inner">
                    <div className="l-part">
                        <button className="menu-btn" onClick={()=>setMenuClose(true)}>
                            <Image src={'/assets/images/menu.svg'} width={50} height={50} alt="" />
                        </button>
                        <Link href="/" className='head-logo'>
                            <Image src={'/assets/images/logo.svg'} width={50} height={50} alt="" />
                        </Link>
                    </div>
                    <div className="r-part">
                        <ul className="nav-list">
                            {
                                links.map((link,index) =>{
                                    return(
                                        <li key={index}>
                                            <Link href={link.link}>
                                            {link.name}
                                            </Link>
                                            {link.mega && (
                        <div className='sub-menu-pad'>                        
                        <ul className='sub-menu'>
                            <li><Link href="/running">In Your Stride</Link></li>
                            <div className='menu-divider'></div>
                            <li><Link href="/back-to-sports">Reclaim Your Game</Link></li>
                            <div className='menu-divider'></div>
                            <li><Link href="/surgical-rehab">Back on your feet</Link></li>
                            <div className='menu-divider'></div>
                            <li><Link href="/injury-management">Prevention & Recovery</Link></li>
                            <div className='menu-divider'></div>
                            <li><Link href="/performance-training">Breaking Barriers</Link></li>
                        </ul>
                        </div>
                    )}
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                        <ul className="ot-nav">
                            <li>
                                <Link href="/book-now" className='main-btn'>
                                    Book an Appointment
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        {/* mobile menu */}
        <div className={`mob-menu ${menuOpen && 'active'}`}>
            <Link href="/" className='mob-logo'>
                <Image src={'/assets/images/logo.svg'} width={50} height={50} alt="" />
            </Link>
            <button className="close-btn" onClick={()=>setMenuClose(false)}>
                <Image src={'/assets/images/cross.svg'} width={50} height={50} alt="" />
            </button>
            <ul>
                {
                    links.map((link,index) =>{
                        return(
                            <li key={index}>
                                <Link href={link.link} onClick={()=>setMenuClose(false)}>
                                {link.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </>
  )
}

export default Navbar
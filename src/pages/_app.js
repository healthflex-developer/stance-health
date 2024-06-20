import { useEffect } from 'react';
import dynamic from 'next/dynamic';


// Dynamically import Navbar and Footer components if they rely on 'document'
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Layout = dynamic(() => import('../../node_modules/react-masonry-list'), {
  ssr: false,
});

// Importing CSS directly, these should not cause any issues
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import ButtonEffect from '@/components/ButtonEffect';
import useAnimateOnIntersection from '@/components/useAnimateOnIntersection';
import SmoothScrolling from "@/components/SmoothScrolling";

import "@/styles/main.scss";
import "@/styles/res.scss";


function App({ Component, pageProps }) {
  useEffect( () => {

    (

      async () => {

          const LocomotiveScroll = (await import('locomotive-scroll')).default

          const locomotiveScroll = new LocomotiveScroll();

      }

    )()

  }, [])
  useEffect(() => {
    require('../../node_modules/jquery/dist/jquery.min.js');
    require('../../node_modules/bootstrap/dist/js/bootstrap.bundle.js');
  }, []);
  const selectors = [
    '.sec-head',
    '.banner-con h1',
    '.pr-slider-con h1'
  ];

  // Use the custom hook
  useAnimateOnIntersection(selectors);

  return (
    <>
      <ButtonEffect />
      <Navbar />
      <SmoothScrolling>
        <Component {...pageProps} />
      </SmoothScrolling>
      <Footer />
    </>
  );
}

export default App;
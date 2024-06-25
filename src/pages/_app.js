import Head from "next/head";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Layout = dynamic(() => import("../../node_modules/react-masonry-list"), { ssr: false });

import "../../node_modules/bootstrap/dist/css/bootstrap.css";

import { gtmPageView } from "../hooks/gtm";
import ButtonEffect from "@/components/ButtonEffect";
import SmoothScrolling from "@/components/SmoothScrolling";
import useAnimateOnIntersection from "@/components/useAnimateOnIntersection";

import "@/styles/main.scss";
import "@/styles/res.scss";

function App({ Component, pageProps }) {
  React.useEffect(() => {
    const props = {
      page_title: pageProps.slug || null,
    };
    gtmPageView(props);
  }, [pageProps]);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  useEffect(() => {
    require("../../node_modules/jquery/dist/jquery.min.js");
    require("../../node_modules/bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  const selectors = [".sec-head", ".banner-con h1", ".pr-slider-con h1"];

  // Use the custom hook
  useAnimateOnIntersection(selectors);

  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta property="og:title" content="Stance" />
        <meta
          property="og:description"
          content="Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery"
        />
        <meta
          property="og:image"
          content="https://www.stance.health/assets/images/og.jpg"
        />
        <GoogleTagManager gtmId="GTM-KBBN732J" />
      </Head>
      <ButtonEffect />
      <Navbar />
      <SmoothScrolling>
        <Component {...pageProps} />
      </SmoothScrolling>
      <Footer />
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics gaId="G-DZWCZWH78P" />
    </>
  );
}

export default App;

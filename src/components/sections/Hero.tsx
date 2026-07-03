import BookingCta from "@/components/BookingCta";

const VIDEO_URL = "https://res.cloudinary.com/hhi5ylfc/video/upload/v1782911031/home_video_mglaq1.mp4";

export default function Hero() {
  return (
    <header className="homepage-banner">
      <section className="banner-slide">
        <video width="100%" height="100%" muted autoPlay loop playsInline preload="auto">
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        <div className="banner-overlay" />

        <div className="banner-inner">
          <div className="banner-con">
            <h1>
              Welcome To{" "}
              <span>Stance Health</span>
            </h1>
            <p className="para">
              Evidence-backed Orthopaedic Rehab, where Medical Science &amp; Technology are
              tailored for your performance and recovery
            </p>
            <BookingCta className="main-btn">
              <span>Book an Appointment</span>
            </BookingCta>
          </div>
        </div>
      </section>
    </header>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";

const PartnersBanner = () => {
  const bannerdata = [
    {
      title: "Partner with <span>us</span>",
      description:
        "Our Multi-disciplinary approach can help you maximize outcomes for your tribe. We collaborate with Doctors, Hospitals, Sports Academies & Corporates.",
      buttonLink: "#",
      buttonLabel: "Get in Touch",
      image: "/assets/images/partners.svg",
      mobileImage: "/assets/images/partners.svg",
    },
  ];
  return (
    <header className="main-header">
      {bannerdata.map((item, index) => {
        const titleHtml = { __html: item.title };
        const descHtml = { __html: item.description };
        return (
          <section key={index} className="banner-slide">
            <picture>
              <source srcset={item.mobileImage} media="(max-width:600px)" />
              <Image src={item.image} width={1920} height={1080} alt="" />
            </picture>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="banner-con">
                    <h1 dangerouslySetInnerHTML={titleHtml} />
                    {<p className="para" dangerouslySetInnerHTML={descHtml} />}
                    {item.buttonLabel && (
                      <Link
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        href={item.buttonLink}
                        className="main-btn"
                      >
                        <span>{item.buttonLabel}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </header>
  );
};

export default PartnersBanner;

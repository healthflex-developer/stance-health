'use client'
import Image from 'next/image';
import Link from 'next/link';

const WalkthroughBanner = () => {
  
  const bannerdata = [
    {
      title: 'Experience <span>Stance</span> in Action!',
      description: "<p>Join us at Stance to see our approach in action - how we assess, treat, and support recovery with a structured, results-driven process.</p>",
      buttonLink: "https://lu.ma/3femrxy3",
      buttonLabel: "Book a Walkthrough",
      image: "/assets/images/about-banner.png",
      mobileImage: "/assets/images/about-banner.png",
    },
  ]
  return (
    <header className="main-header" >
        {
          bannerdata.map((item,index)=>{
            const titleHtml = {__html: item.title};
            const descHtml = {__html: item.description}
            return(
              <section key={index} className="banner-slide" >
                <picture>
                  <source srcset={item.mobileImage} media="(max-width:600px)" />
                  <Image src={item.image} width={1920} height={1080} alt="" />
                </picture>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="banner-con">
                        <h1 dangerouslySetInnerHTML={titleHtml} />
                        {
                            <div className='ul-con' dangerouslySetInnerHTML={descHtml} />
                           
                        }
                        {
                            item.buttonLabel &&
                            <Link href={item.buttonLink} className="main-btn" target='_blank'>
                            <span>{item.buttonLabel}</span>
                            </Link>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }
      </header>
  )
}

export default WalkthroughBanner

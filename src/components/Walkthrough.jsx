'use client'
import Image from 'next/image';
import Link from 'next/link';

const WalkthroughBanner = () => {
  
  const bannerdata = [
    {
      title: 'Ready to Take a <span>Stance?</span>',
      description: "<p>Meet our team at Stance, where pain meets resilience and goals become reality. Join us to conquer pain and meet your goals with personalized, expert-led programs.</p>",
      buttonLink: "https://lu.ma/rseyimqj",
      buttonLabel: "Book an Appointment",
      image: "/assets/images/about-banner.svg",
      mobileImage: "/assets/images/about-banner.svg",
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

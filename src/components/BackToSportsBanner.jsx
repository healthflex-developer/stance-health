'use client'
import Image from 'next/image';
import Link from 'next/link';


const BackToSportsBanner = () => {
  
  const bannerdata = [
    {
      title: 'Reclaim Your <span>Game</span>',
      description: "Our return-to-play program leverages the latest in sports health and physiotherapy to maximize your recovery and performance.<br /> We ensure setbacks don't hold you down",
      buttonLink: "/book-now",
      buttonLabel: "Book an Appointment",
      image: "/assets/images/bts-banner.svg",
      mobileImage: "/assets/images/bts-banner.svg",
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
                            item.description &&
                            <p className='para' dangerouslySetInnerHTML={descHtml} />
                           
                        }
                        {
                            item.buttonLabel &&
                            <Link href={item.buttonLink} className="main-btn">
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

export default BackToSportsBanner
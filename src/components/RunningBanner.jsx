'use client'
import Image from 'next/image';
import Link from 'next/link';


const RunningBanner = () => {
  
  const bannerdata = [
    {
      title: 'In Your <span>Stride</span>',
      description: "At Stance, we're committed to supporting you as you pursue your running objectives and perform at your best.<br />Let’s ensure we help you tackle that leap",
      buttonLink: "/book-now",
      buttonLabel: "Book an Appointment",
      image: "/assets/images/running-banner.png",
      mobileImage: "/assets/images/running-banner.png",
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

export default RunningBanner
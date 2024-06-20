'use client'
import Link from 'next/link';

const HomePageBanner = () => {
  
  const bannerdata = [
    {
      title: 'Welcome To <br className="d-sm-block d-none" /><span>Stance Health</span>',
      description: "Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery",
      buttonLink: "/book-now",
      buttonLabel: "Book an Appointment",
      image: "/assets/images/home_video.mp4",
      mobileImage: "/assets/images/home_video.mp4",
    },
  ]
  return (
    <header className="main-header homepage-banner" >
        {
          bannerdata.map((item,index)=>{
            const titleHtml = {__html: item.title};
            const descHtml = {__html: item.description}
            return(
              <section key={index} className="banner-slide" >
                <video width="100%" height="100%" muted autoPlay loop preload='none'>
      <source src={item.image} type="video/mp4" />
    </video>
                
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

export default HomePageBanner
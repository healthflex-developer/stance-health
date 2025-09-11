'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const centers = [
  {
    id: 1,
    name: "HSR Layout",
    phone: "+91 6361056456",
    email: "hsr@stance.health",
    address: "2nd Floor, 1555, 19th Main Rd, Agara, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102",
    mapLink: "https://maps.app.goo.gl/ybtjB2YiqPV9yyUw6?g_st=aw",
    image: "/assets/images/HSR.JPG"
  },
  {
    id: 2,
    name: "Whitefield",
    phone: "+91 6361056456 ",
    email: "wfld@stance.health",
    address: "4th Floor, Kailash Parbat, No. 149, Doddanakundi, 2nd Phase, Hoodi, Whitefield, Bengaluru, Karnataka 560066",
    mapLink: "https://maps.app.goo.gl/bPuF68ZwmAWS95MVA",
    image: "/assets/images/whitefield.webp"
  },
  {
    id: 3,
    name: "Indiranagar",
    phone: "+91 9008417804",
    email: "indiranagar@stance.health",
    address: "3rd Floor, Srinivasan Towers, ESI Hospital Road, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038",
    mapLink: "https://maps.app.goo.gl/dwMzmKL5nQxXzLWL9",
    image: "/assets/images/indra.webp"
  }
]

const CentersCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % centers.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % centers.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + centers.length) % centers.length)
  }

  const getSlideClass = (index) => {
    if (index === activeIndex) {
      return "scale-110 z-20 opacity-100"
    } else if (index === (activeIndex - 1 + centers.length) % centers.length || 
               index === (activeIndex + 1) % centers.length) {
      return "scale-90 z-10 opacity-70"
    } else {
      return "scale-75 z-0 opacity-40"
    }
  }

  return (
    <div className="py-12" style={{marginTop: '30px', background: "rgba(24, 37, 66, 0.95)"}}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Centers</h2>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="flex items-center justify-center min-h-[500px] relative overflow-hidden">
            {centers.map((center, index) => (
              <div
                key={center.id}
                className={`absolute transition-all duration-700 ease-out transform ${getSlideClass(index)}`}
                style={{
                  left: `${50 + (index - activeIndex) * 25}%`,
                  transform: `translateX(-50%) ${getSlideClass(index).includes('scale-110') ? 'scale(1.1)' : 
                    getSlideClass(index).includes('scale-90') ? 'scale(0.9)' : 'scale(0.75)'}`
                }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl w-80 sm:w-96 md:w-[500px] lg:w-[600px]">
                  {/* Center Image with Overlay Info */}
                  <div className="relative h-80 sm:h-80 md:h-96 overflow-hidden rounded-2xl">
                    <Image
                      src={center.image}
                      alt={center.name}
                      fill
                      className="object-cover rounded-2xl"
                      onError={(e) => {
                        e.target.src = "/assets/images/default-center.jpg"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                    
                    {/* Center Info Overlay */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center px-4 pb-4 w-full">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#CDFE71] mb-2 sm:mb-4" style={{ color: "#CDFE71" }}>{center.name}</h3>
                      
                      <div className="space-y-1 sm:space-y-2">
                     <Link href={`tel:${center.phone}`} className="block text-white hover:text-[#CDFE71] transition-colors text-sm sm:text-base md:text-lg">
                          {center.phone}
                        </Link>
                        
                        <Link href={`mailto:${center.email}`} className="block text-white hover:text-[#CDFE71] transition-colors text-sm sm:text-base md:text-lg">
                          {center.email}
                        </Link>
                       <Link 
                          href={center.mapLink} 
                          target="_blank" 
                          className="block text-white hover:text-[#CDFE71] transition-colors text-xs sm:text-sm leading-relaxed max-w-xs mx-auto"
                        >
                          {center.address}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent border-2 border-[#CDFE71] hover:border-[#B8E85C] text-[#CDFE71] hover:text-[#B8E85C] p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-30"
            style={{borderRadius: '50%'}}
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-2 border-[#CDFE71] hover:border-[#B8E85C] text-[#CDFE71] hover:text-[#B8E85C] p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-30"
             style={{borderRadius: '50%'}}
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {centers.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-[#CDFE71] scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CentersCarousel
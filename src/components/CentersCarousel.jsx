'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % centers.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + centers.length) % centers.length)
  }

  const getSlidePosition = (index) => {
    const diff = index - activeIndex
    return diff * 25
  }

  const getSlideScale = (index) => {
    if (index === activeIndex) return 1.1
    const distance = Math.abs(index - activeIndex)
    return Math.max(0.75, 1.1 - distance * 0.2)
  }

  const getSlideOpacity = (index) => {
    if (index === activeIndex) return 1
    const distance = Math.abs(index - activeIndex)
    return Math.max(0.4, 1 - distance * 0.3)
  }

  return (
    <div className="py-12" style={{marginTop: '30px', background: "rgba(24, 37, 66, 0.95)"}}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Centers</h2>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="flex items-center justify-center min-h-[500px] relative overflow-hidden mx-auto max-w-7xl">
            <AnimatePresence mode="sync">
              {centers.map((center, index) => (
                <motion.div
                  key={center.id}
                  className="absolute"
                  initial={{ x: `${getSlidePosition(index)}%`, scale: getSlideScale(index), opacity: getSlideOpacity(index) }}
                  animate={{ 
                    x: `${getSlidePosition(index)}%`, 
                    scale: getSlideScale(index), 
                    opacity: getSlideOpacity(index),
                    zIndex: index === activeIndex ? 20 : 10 - Math.abs(index - activeIndex)
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    mass: 0.8
                  }}
                  style={{
                    // left: '50%',
                    transform: 'translateX(-50%)',
                    transformOrigin: 'center center'
                  }}
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl w-80 sm:w-96 md:w-[500px] lg:w-[600px]">
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
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-2 sm:px-4 pb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: index === activeIndex ? 1 : 0.8 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold  text-[#CDFE71] mb-1 sm:mb-2"   style={{ color: "#CDFE71" }}>{center.name}</h3>
                        
                        <div className="space-y-1 w-full max-w-[280px] sm:max-w-xs">
                          <Link href={`tel:${center.phone}`} className="block text-white hover:text-[#CDFE71] transition-colors text-xs sm:text-sm md:text-base">
                            {center.phone}
                          </Link>
                          
                          <Link href={`mailto:${center.email}`} className="block text-white hover:text-[#CDFE71] transition-colors text-xs sm:text-sm md:text-base">
                            {center.email}
                          </Link>
                          
                          <Link 
                            href={center.mapLink} 
                            target="_blank" 
                            className="block text-white hover:text-[#CDFE71] transition-colors text-xs leading-tight"
                          >
                            {center.address}
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? 'bg-[#CDFE71]' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: index === activeIndex ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CentersCarousel
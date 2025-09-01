"use client"

import { useState, useEffect } from "react"

import { MapPin, Phone, Mail, Clock, Award, Heart, Activity, Target, Shield, Brain, Gauge, Zap } from "lucide-react"
import LeadForm from "@/components/LeadForn"
import { InlineSpinWheel } from "@/components/InlineSpinWheel"
import { FallbackBookingForm } from "@/components/FallbackBookingForm"

export default function HomePage() {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingType, setBookingType] = useState("assessment")
  const [wonPrize, setWonPrize] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSpinComplete = (prize) => {
    setWonPrize(prize)
    setShowLeadForm(true)
  }

  const handleFormSubmit = () => {
    setShowLeadForm(false)
  }

  const handleBookingSubmit = () => {
    setShowBookingForm(false)
  }

  const openBookingForm = (type) => {
    setBookingType(type)
    setShowBookingForm(true)
  }

  return (
    <div className="min-h-screen bg-[rgba(24,37,66,0.95)]" style={{ paddingTop: '120px', background: "rgba(24, 37, 66, 0.95)" }}>
      {/* <header className="bg-[#252B4A] border-b border-[#3A4374]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-[#CDFE71]" />
              <span className="text-white font-bold text-lg">STANCE HEALTH</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6 text-sm text-gray-300">
                <a href="#" className="hover:text-[#CDFE71] transition-colors">
                  We are Stance
                </a>
                <a href="#" className="hover:text-[#CDFE71] transition-colors">
                  Physiotherapy
                </a>
                <a href="#" className="hover:text-[#CDFE71] transition-colors">
                  Programs
                </a>
                <a href="#" className="hover:text-[#CDFE71] transition-colors">
                  Partners
                </a>
              </nav>
            </div>
            <div className="md:hidden flex items-center space-x-2 text-sm text-gray-300">
              <Phone className="h-4 w-4 text-[#CDFE71]" />
              <a href="tel:9008417804" className="hover:text-[#CDFE71] transition-colors font-semibold">
                9008417804
              </a>
            </div>
          </div>
        </div>
      </header> */}

      <section className="relative bg-gradient-to-br from-[#2D3561] via-[#252B4A] to-[#2D3561] py-12 md:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div>

              {!isMobile ? (
                // Desktop Layout
                <div className="flex justify-center items-center gap-8">
                  <div className="flex-1 max-w-2xl">
                    <div className="text-center mb-4 md:mb-6">
                      <div className="inline-flex items-center space-x-2 bg-[#CDFE71]/10 border border-[#CDFE71]/20 rounded-full px-3 py-2 mb-4 md:mb-6 text-xs md:text-sm">
                        <Award className="h-3 w-3 md:h-4 md:w-4 text-[#CDFE71]" />
                        <span className="text-[#CDFE71] font-medium">
                          Technology-Driven Physiotherapy - Now in Whitefield!
                        </span>
                      </div>
                      <div className="flex items-center justify-center">


                        <img src="/assets/images/logo.png" alt="" style={{ width: "300px", height: "150px" }} />

                      </div>
                      <span className="text-gray-400 text-sm md:text-2xl font-light tracking-wide block">
                        Now in Whitefield
                      </span>
                    </div>
                    <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-center lg:text-left">
                      Experience cutting-edge physiotherapy with AI-powered assessments, advanced equipment, and data-driven
                      treatment protocols at our new Whitefield center.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <InlineSpinWheel onSpinComplete={handleSpinComplete} />
                  </div>
                </div>
              ) : (
                // Mobile Layout
                <div>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-4 mb-2">
                        <img src="/assets/images/logo.png" alt="" style={{ width: "250px", height: "150px" }} />
                    </div>
                    <span className="text-gray-400 text-sm font-light tracking-wide block">
                      Now in Whitefield
                    </span>
                  </div>

                  <p className="text-base text-gray-300 mb-6 leading-relaxed text-center">
                    Experience cutting-edge physiotherapy with AI-powered assessments, advanced equipment, and data-driven
                    treatment protocols at our new Whitefield center.
                  </p>

                  <div className="text-center mb-6">
                    {/* <h2 className="text-2xl font-bold text-[#CDFE71] mb-2">SPIN TO WIN!</h2> */}
                    {/* <p className="text-gray-300 text-sm">Try your luck and win exciting prizes!</p> */}
                  </div>
                  <div className="flex justify-center">
                    <InlineSpinWheel onSpinComplete={handleSpinComplete} />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-[#252B4A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Expertise</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Technology-driven programs, advanced equipment, and comprehensive treatment for optimal recovery
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg hover:border-[#CDFE71]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-4 md:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#CDFE71]/10 rounded-full mx-auto mb-3 md:mb-4">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-[#CDFE71]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                  Prevention & Sports Recovery
                </h3>
              { !isMobile &&   <p className="text-gray-400 text-xs md:text-sm mb-3">
                  Comprehensive injury prevention, sports rehabilitation, and post-surgical recovery programs
                </p>}
                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Prevention</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Sports Rehab</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">
                    Surgery Recovery
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg hover:border-[#CDFE71]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-4 md:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#CDFE71]/10 rounded-full mx-auto mb-3 md:mb-4">
                  <Gauge className="h-6 w-6 md:h-8 md:w-8 text-[#CDFE71]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Advanced Technology</h3>
                {!isMobile && <p className="text-gray-400 text-xs md:text-sm mb-3">
                  VALD Force Decks, RunScribe gait analysis, and HealthFlex AI for comprehensive assessment
                </p>}
                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">VALD Testing</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Gait Analysis</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">AI Guidance</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg hover:border-[#CDFE71]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-4 md:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#CDFE71]/10 rounded-full mx-auto mb-3 md:mb-4">
                  <Target className="h-6 w-6 md:h-8 md:w-8 text-[#CDFE71]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Conditions We Treat</h3>
                {!isMobile && <p className="text-gray-400 text-xs md:text-sm mb-3">
                  Sports injuries, chronic pain, arthritis, post-surgical rehabilitation, and joint disorders
                </p>}
                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Sports Injuries</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Chronic Pain</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Post-Surgical</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg hover:border-[#CDFE71]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-4 md:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#CDFE71]/10 rounded-full mx-auto mb-3 md:mb-4">
                  <Activity className="h-6 w-6 md:h-8 md:w-8 text-[#CDFE71]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Performance Optimization</h3>
                {!isMobile && <p className="text-gray-400 text-xs md:text-sm mb-3">
                  Return to sports programs, movement analysis, power testing, and athletic performance enhancement
                </p>}
                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Power Testing</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">
                    Balance Training
                  </span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Performance</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg hover:border-[#CDFE71]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-4 md:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#CDFE71]/10 rounded-full mx-auto mb-3 md:mb-4">
                  <Brain className="h-6 w-6 md:h-8 md:w-8 text-[#CDFE71]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Data-Driven Treatment</h3>
                {!isMobile && <p className="text-gray-400 text-xs md:text-sm mb-3">
                  AI-powered assessments, objective measurements, and personalized treatment protocols based on data
                </p>}
                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">AI Assessment</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Data Analysis</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Personalized</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg hover:border-[#CDFE71]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-4 md:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#CDFE71]/10 rounded-full mx-auto mb-3 md:mb-4">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-[#CDFE71]" />
                </div>
                <h3 className="text-sm md:text-xl font-semibold text-white mb-2 md:mb-3">Comprehensive Care</h3>
                {!isMobile && <p className="text-gray-400 text-xs md:text-sm mb-3">
                  ACL/MCL injuries, back pain, arthritis, joint replacements, and complete rehabilitation programs
                </p>}
                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">ACL/MCL</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Back Pain</span>
                  <span className="px-2 py-1 bg-[#CDFE71]/20 text-[#CDFE71] text-xs rounded-full">Joint Care</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 pt-10" style={{marginTop: '30px'}}>
            <p className="text-gray-400">
              Ready to experience technology-driven physiotherapy?
            </p>
            <a
              href="tel:9008417804"
              className="inline-flex items-center bg-[#CDFE71] hover:bg-[#B8E85C] text-black font-bold px-6 md:px-8 py-3 transition-all rounded-2xl duration-300 transform hover:scale-105 p-3"
            >
            Call Now
            </a>
          </div>

        </div>
      </section>

      {/* <section className="py-12 md:py-20 bg-[#2D3561]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visit Our Technology-Enabled Centers</h2>
              <p className="text-lg md:text-xl text-gray-400">
                Experience the future of physiotherapy with our advanced equipment and AI-powered assessments
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#CDFE71]/10 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[#CDFE71]" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Our Locations</h3>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm md:text-base">📍 Whitefield (New Center)</p>
                      <p className="text-gray-400 text-sm md:text-base">📍 HSR Layout</p>
                      <p className="text-gray-400 text-sm md:text-base">📍 Indiranagar</p>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/gEwf1VSBqjiBVLgL6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CDFE71] hover:text-[#B8E85C] underline inline-block mt-2 text-sm md:text-base"
                    >
                      View Whitefield on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#CDFE71]/10 rounded-full flex-shrink-0">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-[#CDFE71]" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Phone</h3>
                    <a
                      href="tel:9008417804"
                      className="text-gray-400 hover:text-[#CDFE71] transition-colors text-sm md:text-base"
                    >
                      📞 9008417804
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#CDFE71]/10 rounded-full flex-shrink-0">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-[#CDFE71]" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Email</h3>
                    <a
                      href="mailto:wfld@stance.health"
                      className="text-gray-400 hover:text-[#CDFE71] transition-colors text-sm md:text-base"
                    >
                      wfld@stance.health
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#CDFE71]/10 rounded-full flex-shrink-0">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#CDFE71]" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Operating Hours</h3>
                    <p className="text-gray-400 text-sm md:text-base">Monday - Saturday</p>
                    <p className="text-gray-400 text-sm md:text-base">7:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#252B4A] rounded-2xl p-6 md:p-8 border border-[#3A4374]">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                  Ready for Advanced Assessment?
                </h3>
                <div className="space-y-4 mt-25">
                  <a
                    href="tel:9008417804"
                    className="w-full bg-[#CDFE71] hover:bg-[#B8E85C] text-black font-bold py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 block text-center"
                  >
                    📞 Call 9008417804
                  </a>
                  <p className="text-center text-xs md:text-sm text-gray-500 mt-30">
                    Follow us on{" "}
                    <a
                      href="https://www.instagram.com/stance.health/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CDFE71] hover:text-[#B8E85C] underline"
                    >
                      Instagram
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* 
      <footer className="bg-[#252B4A] border-t border-[#3A4374] py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-[#CDFE71]" />
                <span className="text-white font-bold">STANCE HEALTH</span>
              </div>
              <span className="text-gray-400 text-xs md:text-sm">© 2024 Stance Health. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-xs md:text-sm text-gray-400">
              <span>Technology-Driven Physiotherapy - Multiple Locations</span>
            </div>
          </div>
        </div>
      </footer> */}

      {showLeadForm && (
        <LeadForm wonPrize={wonPrize} onClose={() => setShowLeadForm(false)} onSubmit={handleFormSubmit} />
      )}

      {showBookingForm && (
        <FallbackBookingForm
          bookingType={bookingType}
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  )
}
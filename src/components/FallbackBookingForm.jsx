"use client"

import { useState } from "react"

import { X, Calendar, Phone, User, MapPin } from 'lucide-react'

export function FallbackBookingForm({ onClose, onSubmit, bookingType }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    location: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const bookingData = {
        ...formData,
        bookingType,
        timestamp: new Date().toISOString(),
        id: Date.now()
      }
      
      const existingBookings = JSON.parse(localStorage.getItem('stance_bookings') || '[]')
      existingBookings.push(bookingData)
      localStorage.setItem('stance_bookings', JSON.stringify(existingBookings))
      
      console.log('Booking stored locally:', bookingData)
      
      setSubmitted(true)
      setTimeout(() => {
        onSubmit()
      }, 3000)
    } catch (error) {
      console.error('Error storing booking:', error)
      alert('There was an error processing your booking. Please call us directly at 9019410049.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLocationChange = (value) => {
    setFormData({
      ...formData,
      location: value
    })
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg max-w-md w-full">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#00D4AA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Booking Request Received! 📅</h3>
            <p className="text-gray-300 mb-6">
              Thank you for your interest in Stance Health. Our team member will connect with you shortly to book your appointment.
            </p>
            <div className="bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-lg p-4 mb-6">
              <p className="text-[#00D4AA] font-semibold">
                {bookingType === 'assessment' ? 'VALD Assessment' : 'Appointment'} Request - {formData.location}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              We'll call you at {formData.mobile} within 24 hours to confirm your appointment.
            </p>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-xs">
                For immediate assistance, call us at 9019410049
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg max-w-md w-full">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {bookingType === 'assessment' ? '📊 Book VALD Assessment' : '📅 Book Appointment'}
          </h2>
          <p className="text-gray-400 text-center mt-2">
            {bookingType === 'assessment' 
              ? 'Schedule your advanced technology assessment' 
              : 'Schedule your physiotherapy consultation'
            }
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-white flex items-center space-x-2">
                <User className="h-4 w-4 text-[#00D4AA]" />
                <span>Full Name *</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#252B4A] border border-[#3A4374] text-white rounded-md focus:border-[#00D4AA] focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="mobile" className="text-white flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#00D4AA]" />
                <span>Mobile Number *</span>
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#252B4A] border border-[#3A4374] text-white rounded-md focus:border-[#00D4AA] focus:outline-none"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-white flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#00D4AA]" />
                <span>Preferred Location *</span>
              </label>
              <select 
                onChange={(e) => handleLocationChange(e.target.value)} 
                required
                className="w-full px-3 py-2 bg-[#252B4A] border border-[#3A4374] text-white rounded-md focus:border-[#00D4AA] focus:outline-none"
              >
                <option value="">Select your preferred location</option>
                <option value="indiranagar">Indiranagar (New Center)</option>
                <option value="hsr-layout">HSR Layout</option>
                <option value="whitefield">Whitefield</option>
              </select>
            </div>

            <div className="bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-lg p-4 mt-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-[#00D4AA]" />
                <span className="text-[#00D4AA] font-semibold text-sm">
                  {bookingType === 'assessment' 
                    ? 'VALD Technology Assessment includes comprehensive movement analysis' 
                    : 'Initial consultation includes assessment and treatment plan'
                  }
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.location}
              className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-white font-bold py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : `Book ${bookingType === 'assessment' ? 'Assessment' : 'Appointment'}`}
            </button>
          </form>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-xs text-center">
              For immediate booking, call us at 9019410049
            </p>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting this form, you agree to be contacted by Stance Health regarding your appointment booking.
          </p>
        </div>
      </div>
    </div>
  )
}

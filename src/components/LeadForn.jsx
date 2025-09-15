"use client"

import { useState } from "react"

import { X, Gift, Phone, Mail, User } from "lucide-react"

export default function LeadForm({ wonPrize, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/spin-wheel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          prize: wonPrize
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.message || 'Failed to save data')
      }

      const result = await response.json()
      console.log('Success:', result)

      setSubmitted(true)
      setTimeout(() => {
        onSubmit()
      }, 3000)
    } catch (error) {
      console.error("Error:", error)
      alert("There was an error saving your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg max-w-md w-full">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#DDFE71] rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Congratulations! 🎉</h3>
            <p className="text-gray-300 mb-6">
              Your information has been saved successfully. Our team will contact you soon to schedule your appointment
              and redeem your prize!
            </p>
            <div className="bg-[#DDFE71]/10 border border-[#DDFE71]/20 rounded-lg p-4 mb-6">
              <p className="text-[#DDFE71] font-semibold">Your Prize: {wonPrize}</p>
            </div>
            <p className="text-sm text-gray-400">We'll call you at the provided number within 24 hours.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-10">
      <div className="bg-[#2D3561] border border-[#3A4374] rounded-lg max-w-md w-full  p-10">
        <div className="relative p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-white text-center mb-4 mt-3">🎉 Congratulations 🎉 </h2>
          <div className="bg-[#DDFE71]/10 border border-[#DDFE71]/20 rounded-lg p-4 m-4">
            <div className="flex items-center justify-center">
              <span className="text-[#DDFE71] font-semibold">You Won: {wonPrize}</span>
            </div>
          </div>
        </div>
        <div className="p-6 m-4">
          <p className="text-gray-300 text-center mb-6">
            Please fill in your details below so we can contact you to schedule your appointment and redeem your prize!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4">
              <label htmlFor="name" className="text-white flex items-center space-x-2">
                <User className="h-6 w-6 text-[#DDFE71]" />
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#252B4A] border border-[#3A4374] text-white rounded-md focus:border-[#DDFE71] focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="mobile" className="text-white flex items-center space-x-2 mr-3">
                <Phone className="h-6 w-6 text-[#DDFE71]" />
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#252B4A] border border-[#3A4374] text-white rounded-md focus:border-[#DDFE71] focus:outline-none mt-2"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="email" className="text-white flex items-center space-x-2">
                <Mail className="h-6 w-6 text-[#DDFE71]" />
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#252B4A] border border-[#3A4374] text-white rounded-md focus:border-[#DDFE71] focus:outline-none mt-2"
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                style={{borderRadius: '10px'}}
                className="w-[40%] bg-[#DDFE71] hover:bg-[#00B894] text-black font-bold py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "Submitting..." : "Claim My Prize!"}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting this form, you agree to be contacted by Stance Health regarding your appointment and prize
            redemption.
          </p>
        </div>
      </div> 
    </div>
  )
}
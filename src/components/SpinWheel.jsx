"use client"

import { useState } from "react"

import { X } from 'lucide-react'

const prizes = [
  { text: "First Session\n₹199", shortText: "₹199 Session", probability: 25, color: "#00D4AA" },
  { text: "First Session\n₹499", shortText: "₹499 Session", probability: 60, color: "#00B894" },
  { text: "10% Off\nNext Session", shortText: "10% Off", probability: 10, color: "#FFD93D" },
  { text: "Free\nT-Shirt", shortText: "Free T-Shirt", probability: 5, color: "#FF6B6B" },
  { text: "Better Luck\nNext Time", shortText: "Try Again", probability: 0, color: "#6C7293" }
]

export function SpinWheel({ onClose, onSpinComplete }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // Determine winner based on probabilities
    const random = Math.random() * 100
    let winner = prizes[4] // Default to "Better Luck Next Time"

    if (random <= 60) {
      winner = prizes[1] // ₹499 - 60%
    } else if (random <= 85) {
      winner = prizes[0] // ₹199 - 25%
    } else if (random <= 95) {
      winner = prizes[2] // 10% off - 10%
    } else if (random <= 100) {
      winner = prizes[3] // Free T-shirt - 5%
    }

    // Calculate rotation to land on winner
    const winnerIndex = prizes.indexOf(winner)
    const segmentAngle = 360 / prizes.length
    const targetAngle = (winnerIndex * segmentAngle) + (segmentAngle / 2)
    const spins = 5 + Math.random() * 5 // 5-10 full rotations
    const finalRotation = (spins * 360) + (360 - targetAngle)

    setRotation(prev => prev + finalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      onSpinComplete(winner.text.replace('\n', ' '))
    }, 4000)
  }

  const segmentAngle = 360 / prizes.length

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-[#2D3561] rounded-2xl p-4 sm:p-8 max-w-sm sm:max-w-lg w-full border border-[#3A4374] relative max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">🎯 Spin to Win!</h2>
          <p className="text-sm sm:text-base text-gray-400">Try your luck for amazing offers at our new Indiranagar center!</p>
        </div>

        <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8">
          {/* Wheel SVG */}
          <svg 
            className="w-full h-full transition-transform duration-4000 ease-out border-4 border-[#00D4AA] rounded-full"
            style={{ transform: `rotate(${rotation}deg)` }}
            viewBox="0 0 200 200"
          >
            {prizes.map((prize, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180)
              const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180)
              const midAngle = (startAngle + endAngle) / 2

              const x1 = 100 + 100 * Math.cos(startAngle)
              const y1 = 100 + 100 * Math.sin(startAngle)
              const x2 = 100 + 100 * Math.cos(endAngle)
              const y2 = 100 + 100 * Math.sin(endAngle)

              const largeArcFlag = segmentAngle > 180 ? 1 : 0

              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ')

              // Text position (70% from center)
              const textX = 100 + 70 * Math.cos(midAngle)
              const textY = 100 + 70 * Math.sin(midAngle)

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={prize.color}
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.8))'
                    }}
                  >
                    {prize.text.split('\n').map((line, lineIndex) => (
                      <tspan
                        key={lineIndex}
                        x={textX}
                        dy={lineIndex === 0 ? 0 : 10}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-[#00D4AA] drop-shadow-lg"></div>
          </div>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-[#00D4AA] rounded-full border-4 border-white z-10 flex items-center justify-center shadow-lg">
            <div className="text-white font-bold text-xs sm:text-sm">SPIN</div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="bg-[#00D4AA] hover:bg-[#00B894] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isSpinning ? "Spinning..." : "SPIN NOW!"}
          </button>
        </div>

        {/* Prize Legend */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-1 sm:gap-2 text-xs sm:text-sm">
          <div className="text-center text-gray-400 font-semibold mb-2">What You Can Win:</div>
          {prizes.map((prize, index) => (
            <div key={index} className="flex items-center justify-center space-x-2">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white/20 flex-shrink-0"
                style={{ backgroundColor: prize.color }}
              ></div>
              <span className="text-gray-300 text-center">{prize.text.replace('\n', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

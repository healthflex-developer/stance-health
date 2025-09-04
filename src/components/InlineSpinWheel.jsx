"use client"

import { useState } from "react"


const prizes = [
  { text: "First Session\n₹199", shortText: "₹199 Session", probability: 0, color: "#DDFE71", canWin: false },
  { text: "First Session\n₹499", shortText: "₹499 Session", probability: 0, color: "#00B894", canWin: false },
  {
    text: "Free Consultation\nCall with\nPhysiotherapist",
    shortText: "Free Consultation",
    probability: 80,
    color: "#FFD93D",
    canWin: true,
  },
  { text: "Better Luck\nNext Time", shortText: "Better Luck", probability: 0, color: "#FF6B6B", canWin: false },
  { text: "10% Off\nNext Session", shortText: "10% Off", probability: 20, color: "#4ECDC4", canWin: true },
]

export function InlineSpinWheel({ onSpinComplete }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)

    const random = Math.random() * 100
    let winner

    if (random <= 80) {
      winner = prizes.find(p => p.text.includes("Free Consultation")) // Free Consultation - 80%
    } else {
      winner = prizes.find(p => p.text.includes("10% Off")) // 10% Off - 20%
    }

    const winnerIndex = prizes.indexOf(winner)
    const segmentAngle = 360 / prizes.length
    const targetAngle = winnerIndex * segmentAngle + segmentAngle / 2
    const spins = 5 + Math.random() * 5
    const finalRotation = spins * 360 + (360 - targetAngle)

    setRotation((prev) => prev + finalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      let winMessage = winner.text.replace(/\n/g, " ")
      if (winner.text.includes("Consultation")) {
        // winMessage = "You Won: Free Consultation Short Voice Consultation with Physiotherapist"
      }
      onSpinComplete(winMessage)
    }, 4000)
  }

  const segmentAngle = 360 / prizes.length

  return (
    <div className="p-6 sm:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#CDFE71] mb-2"> Spin to Win!</h2>
        <p className="text-sm sm:text-base text-gray-400">
          Try your luck for amazing offers at our new Whitefield center!
        </p>
      </div>

      <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 mb-8">
        {/* Wheel SVG */}
        <svg
          className="w-full h-full transition-transform duration-4000 ease-out border-4 border-[#DDFE71] rounded-full shadow-lg"
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

            const pathData = [`M 100 100`, `L ${x1} ${y1}`, `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

            const textX = 100 + 65 * Math.cos(midAngle)
            const textY = 100 + 65 * Math.sin(midAngle)

            return (
              <g key={index}>
                <path d={pathData} fill={prize.color} stroke="#ffffff" strokeWidth="1" />
                <text
                  x={textX}
                  y={textY}
                  fill="white"
                  fontSize={prize.text.includes("Consultation") ? "7" : "8"}
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                    filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.8))",
                  }}
                >
                  {prize.text.split("\n").map((line, lineIndex) => (
                    <tspan key={lineIndex} x={textX} dy={lineIndex === 0 ? 0 : 8}>
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
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-[#DDFE71] drop-shadow-lg"></div>
        </div>

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-[#DDFE71] rounded-full border-4 border-[#DDFE71] z-10 flex items-center justify-center shadow-lg">
          <div className="text-[#252B4A] font-bold text-xs sm:text-sm">SPIN</div>
        </div>
      </div>

      <div className="text-center mt-3">
        <button  style={{borderRadius: '10px'}}
          onClick={spinWheel}
          disabled={isSpinning}
          className="bg-[#DDFE71] hover:bg-[#DDFE71] text-[#252B4A] font-bold px-4 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isSpinning ? "Spinning..." : "SPIN NOW!"}
        </button>
      </div>
    </div>
  )
}

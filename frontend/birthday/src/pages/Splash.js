import React from 'react'
import { motion } from 'framer-motion'

export default function Splash({ onContinue }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-white"
      style={{ backgroundColor: '#ffffff' }}
    >
  <div className="cutout-title font-handwritten lg mb-4">Hello Darling</div>

      <div className="text-center mb-6">
        <div className="font-inter text-base text-midcentury-warmgray">wanna see a little surprise? Click the cake.</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="cursor-pointer"
        onClick={onContinue}
      >
        <img src="/images/cake.png" alt="cake" className="w-48 md:w-72" />
      </motion.div>

    </div>
  )
}

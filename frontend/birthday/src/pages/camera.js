import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Camera({ onBack }) {
  const [step, setStep] = useState("camera");

  // Preload camera click sound
  const cameraClickSound = useRef(null);
  useEffect(() => {
    cameraClickSound.current = new Audio("/camera.mp3");
    cameraClickSound.current.load();
  }, []);

  // Add all your collage images here
  const photos = [
    "/images/1.JPG",
    "/images/7.jpg",
    "/images/4.JPG",
    "/images/5.JPG",
    "/images/6.jpg",
    "/images/2.JPG",
  ];

  const handleCapture = () => {
    if (cameraClickSound.current) {
      cameraClickSound.current.currentTime = 0;
      cameraClickSound.current.play().catch((err) => console.log("Sound error:", err));
    }

    setStep("flash");

    // Show drawing after a short delay to match the sound
    setTimeout(() => setStep("drawing"), 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4e3] relative overflow-hidden p-4">

      {/* Back button */}
      <div className="flex justify-start w-full mb-6">
        <button
          onClick={onBack}
          className="text-sm text-midcentury-warmgray bg-white/80 px-3 py-1 rounded-full shadow inline-flex items-center gap-2"
          aria-label="Back"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="#5b463f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* CAMERA */}
        {step === "camera" && (
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.img
              src="/images/camera.png"
              className="w-40 mb-6 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCapture}
            />
            <motion.p
              className="font-handwritten text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              Smile !!!
            </motion.p>
          </motion.div>
        )}

        {/* FLASH EFFECT */}
        {step === "flash" && (
          <motion.div
            key="flash"
            className="absolute inset-0 bg-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* DRAWING */}
        {step === "drawing" && (
          <motion.div
            key="drawing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setStep("collage")}
          >
            <motion.p
              className="font-handwritten text-2xl mb-4 text-[#5b463f]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Wowwww
            </motion.p>
            <motion.img
              src="/images/collage.jpeg"
              alt="drawing"
              className="rounded-lg shadow-xl mb-4"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/baby.png'; }}
            />
            <p className="font-handwritten text-center">We look cute dont we hihi</p>
            <span className="text-xs opacity-40 mt-2">(want to see more?)</span>
          </motion.div>
        )}

        {/* COLLAGE GRID */}
        {step === "collage" && (
          <motion.div
            key="collage"
            className="w-full flex flex-col items-center"
          >
            <motion.p
              className="font-handwritten text-2xl mb-2 text-[#5b463f] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              I really enjoy our moments together
            </motion.p>

            <motion.p
              className="font-handwritten text-lg text-[#7a5c4d] text-center mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              To many more to come!
            </motion.p>

            <motion.div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {photos.map((photo, i) => (
                <motion.img
                  key={i}
                  src={photo}
                  className="w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.2, type: "spring", stiffness: 120 }}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

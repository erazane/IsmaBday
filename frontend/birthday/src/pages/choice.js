import React from "react";
import { motion } from "framer-motion";

export default function ChoicePage({ onClose, onSelect }) {
  // preload audio
  const clickSound = new Audio("/click.mp3");

  const handleClick = (target) => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    // delay navigation so the sound plays
    setTimeout(() => {
      onSelect(target);
    }, 250); // 250ms delay
  };

  const handleBack = () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4e3] px-4">
      <center>
        <div className="cutout-title font-handwritten lg mb-4">
          Choose Your Surprise
        </div>
      </center>

      <div className="w-full flex justify-center overflow-hidden">
        <div className="flex gap-6 overflow-x-auto pb-4 px-4 max-w-full">

          {/* CAMERA */}
          <motion.button
            onClick={() => handleClick("camera")}
            className="flex-shrink-0 cursor-pointer text-center w-32 md:w-40"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/images/camera.png" alt="Camera option" className="w-full" />
          </motion.button>

          {/* LETTER */}
          <motion.button
            onClick={() => handleClick("letter")}
            className="flex-shrink-0 cursor-pointer text-center w-32 md:w-40"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/images/letter.png" alt="Letter option" className="w-full" />
          </motion.button>

          {/* SURPRISE / GAME */}
          <motion.button
            onClick={() => handleClick("game")}
            className="flex-shrink-0 cursor-pointer text-center w-32 md:w-40"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/images/fav.png" alt="Surprise game option" className="w-full" />
          </motion.button>

        </div>
      </div>

      <button
        onClick={handleBack}
        className="mt-6 text-sm opacity-60"
      >
        (back)
      </button>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Surprise({ onNext }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Trigger dramatic fade out
    setClicked(true);

    // Wait for suspenseful fade before going to next page
    setTimeout(() => {
      onNext();
    }, 1800); // 1.8s for suspense
  };

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          key="surprise"
          onClick={handleClick}
          className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4e3] text-center cursor-pointer relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="font-handwritten text-2xl mb-4 text-[#5b463f]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            I'm not very great with my words
          </motion.p>

          <motion.p
            className="font-handwritten text-lg text-[#7a5c4d]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            but I want to say...
          </motion.p>

          <motion.span
            className="mt-10 text-xs opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            (click anywhere)
          </motion.span>
        </motion.div>
      )}

      {/* DRAMATIC FADE-OUT OVERLAY */}
      {clicked && (
        <motion.div
          className="absolute inset-0 bg-[#f8f4e3] z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}

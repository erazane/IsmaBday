import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Surprise({ onNext }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // start fade
    setClicked(true);

    // wait for fade animation, then call onNext
    setTimeout(() => {
      onNext();
    }, 800); // 0.8s fade
  };

  return (
    <div
      onClick={handleClick} 
      className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4e3] text-center cursor-pointer relative overflow-hidden"
    >
      <motion.p
        className="font-handwritten text-2xl mb-4 text-[#5b463f]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Oops..my bad.. thats not the surprise I had in mind
      </motion.p>

      <motion.p
        className="font-handwritten text-lg text-[#7a5c4d]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        What I mean was...
      </motion.p>

      <span className="mt-10 text-xs opacity-40">(click anywhere)</span>

      {/* Fade to black overlay */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            key="fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

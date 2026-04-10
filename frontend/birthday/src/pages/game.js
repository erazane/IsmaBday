import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MiniGame({ onComplete, onBack }) {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // spawn hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const screenWidth = window.innerWidth;

      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * (screenWidth - 60),
        size: Math.random() * 20 + 30,
        duration: Math.random() * 2 + 3,
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  function catchHeart(id) {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((prev) => prev + 1);
  }

  // win condition
  useEffect(() => {
    if (score >= 5) {
      setShowCelebration(true);

      setTimeout(() => {
        onComplete();
      }, 2500); // longer so celebration shows
    }
  }, [score, onComplete]);

  return (
    <div className="min-h-screen bg-[#f8f4e3] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* TITLE */}
      <h1 className="font-handwritten text-xl md:text-2xl text-[#5b463f] text-center mb-2">
        Catch 5 hearts to win a prize 💌
      </h1>

      <p className="text-sm opacity-60 mb-6">{score}/5 collected</p>

      {/* HEARTS */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: window.innerHeight + 100, opacity: 1 }}
          transition={{ duration: heart.duration, ease: "linear" }}
          onClick={() => catchHeart(heart.id)}
          className="absolute select-none cursor-pointer active:scale-125"
          style={{
            left: heart.x,
            fontSize: `${heart.size}px`,
            touchAction: "manipulation",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* CELEBRATION */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {/* Gift popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={{
                opacity: 1,
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute bg-white/90 px-6 py-4 rounded-2xl shadow-xl text-center z-50"
            >
              <p className="font-handwritten text-lg text-[#5b463f]">
                🎁 Gift unlocked!
              </p>
            </motion.div>

            {/* Heart confetti */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -50, opacity: 0, scale: 0.5 }}
                animate={{
                  y: window.innerHeight + 100,
                  opacity: [1, 0],
                  x: Math.random() * 100 - 50,
                  rotate: Math.random() * 360,
                  scale: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2 + Math.random(), ease: "easeOut" }}
                className="absolute text-red-400 text-2xl"
                style={{ left: Math.random() * window.innerWidth }}
              >
                ❤️
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="absolute bottom-6 text-xs opacity-50"
      >
        (back)
      </button>
    </div>
  );
}

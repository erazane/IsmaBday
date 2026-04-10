import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function SceneOne({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [texts, setTexts] = useState([]);

  const audioRef = useRef(null);

  // MUTE
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  // CLEANUP AUDIO
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        try {
          audioEl.pause();
          audioEl.currentTime = 0;
        } catch (e) {}
      }
    };
  }, []);

  // PLAY AUDIO
  async function playAudio() {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Play failed", err);
    }
  }

  function stopAudio() {
    if (!audioRef.current) return;
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } catch (e) {}
    setIsPlaying(false);
  }

  // AUTOPLAY ATTEMPT
  useEffect(() => {
    (async () => {
      try {
        await playAudio();
      } catch (e) {}
    })();
  }, []);

  // 🔥 CHAOTIC TEXT SPAWN
  useEffect(() => {
    const interval = setInterval(() => {
      const newText = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotate: Math.random() * 40 - 20,
        size: Math.random() * 20 + 16,
      };

      setTexts((prev) => [...prev, newText]);

      setTimeout(() => {
        setTexts((prev) => prev.filter((t) => t.id !== newText.id));
      }, 2000);
    }, 100); // adjust for chaos

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4e3] px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }} // dramatic fade-in
      onClick={onNext}
    >
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src="/67.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* TOP RIGHT CONTROLS */}
      <div className="absolute top-6 right-6 flex gap-2 z-50">
        <button
          onClick={async (e) => {
            e.stopPropagation();
            if (isPlaying) stopAudio();
            else await playAudio();
          }}
          className="bg-white/80 px-3 py-1 rounded-full shadow text-xs"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted((m) => {
              const next = !m;
              if (audioRef.current) audioRef.current.muted = next;
              return next;
            });
          }}
          className="bg-white/80 px-3 py-1 rounded-full shadow text-xs"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* 💥 FLOATING CHAOS TEXT */}
      {texts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: t.y - 80,
            x: t.x,
            scale: [0.5, 1.2, 1],
            rotate: t.rotate,
          }}
          transition={{ duration: 2 }}
          className="absolute font-handwritten pointer-events-none"
          style={{
            left: t.x,
            top: t.y,
            fontSize: `${t.size}px`,
            color: "#5b463f",
          }}
        >
          SIX SEVENNN!!
        </motion.div>
      ))}

      {/* CARD */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col items-center max-w-sm w-full z-10"
      >
        {/* GIF */}
        <motion.img
          src="/images/cat.gif"
          className="w-40 mb-4 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />

        {/* TEXT */}
        <h1 className="font-handwritten text-lg text-[#5b463f] text-center">
          SIX SEVENNNNN !!!
        </h1>
      </motion.div>

      {/* CLICK HINT */}
      <span className="mt-8 text-xs opacity-40 z-10">
        (click anywhere to continue)
      </span>
    </motion.div>
  );
}

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Use collage.jpeg in public/images/collage.jpeg. If missing, fallback to baby.png
export default function Card({ onBack }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    // copy the ref value locally so the cleanup uses the stable reference
    const audioEl = audioRef.current
    return () => {
      if (audioEl) {
        try { audioEl.pause(); audioEl.currentTime = 0 } catch (e) {}
      }
    }
  }, [])

  async function playAudio() {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (err) {
      console.warn('Play failed', err)
    }
  }

  function stopAudio() {
    if (!audioRef.current) return
    try {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } catch (e) {}
    setIsPlaying(false)
  }

  // Attempt autoplay when the Card mounts. Browsers may block autoplay with sound;
  // we try to play and fall back silently if blocked. The user can always press Play.
  useEffect(() => {
    // try to autoplay once when entering the card
    (async () => {
      try {
        await playAudio()
      } catch (e) {
        // ignored - user gesture required on some browsers
      }
    })()
    // don't re-run
  }, [])

  // inline style for card background: prefer paper-texture if available in public/images
  // (removed cardBgStyle - page uses a soft gradient background now)

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-white"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* simplified page: show collage and a roomy letter area for writing */}
      <div className="confetti-root pointer-events-none">
        {/* expanded confetti coverage */}
        <span className="confetti c1" />
        <span className="confetti c2" />
        <span className="confetti c3" />
        <span className="confetti c4" />
        <span className="confetti c5" />
        <span className="confetti c6" />
        <span className="confetti c7" />
        <span className="confetti c8" />
        <span className="confetti c9" />
        <span className="confetti c10" />
        <span className="confetti c11" />
        <span className="confetti c12" />
        <span className="confetti c13" />
        <span className="confetti c14" />
        <span className="confetti c15" />
        <span className="confetti c16" />
        <span className="confetti c17" />
        <span className="confetti c18" />
        <span className="confetti c19" />
        <span className="confetti c20" />
        <span className="confetti c21" />
        <span className="confetti c22" />
        <span className="confetti c23" />
        <span className="confetti c24" />
      </div>

      <motion.div
        initial={{ scale: 0.995, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl w-full relative"
        style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          backgroundImage: "url('/images/paper-texture.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
          borderRadius: 12,
          padding: '22px',
        }}
      >
        <div className="flex justify-between items-start mb-6">
          <button onClick={onBack} className="text-sm text-midcentury-warmgray bg-white/80 px-3 py-1 rounded-full shadow inline-flex items-center gap-2" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="#5b463f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div className="flex items-center gap-3">
            {/* audio element - place your file at public/audio/everyone_adores_you.mp3 */}
            {/* audio file is stored in public/ - file name includes spaces; use encoded URL */}
            <audio ref={audioRef} src="/Everyone%20Adores%20You%20(at%20least%20I%20do).mp3" loop preload="auto" playsInline />

            <button
              onClick={async () => {
                if (isPlaying) {
                  stopAudio()
                } else {
                  await playAudio()
                }
              }}
              className="bg-white/80 px-3 py-1 rounded-full shadow inline-flex items-center gap-2"
              aria-label={isPlaying ? 'Stop music' : 'Play music'}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#5b463f"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3v18l15-9L5 3z" fill="#5b463f"/></svg>
              )}
            </button>

            <button
              onClick={() => {
                setIsMuted((m) => {
                  const next = !m
                  if (audioRef.current) audioRef.current.muted = next
                  return next
                })
              }}
              className="bg-white/80 px-3 py-1 rounded-full shadow inline-flex items-center gap-2"
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            >
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7.41L14.59 6 12 8.59 9.41 6 8 7.41 10.59 10 8 12.59 9.41 14 12 11.41 14.59 14 16 12.59 13.41 10 16 7.41z" fill="#5b463f"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9v6h4l5 5V4L9 9H5z" fill="#5b463f"/><path d="M19 12c0-1.77-.77-3.36-2-4.47v8.94c1.23-1.11 2-2.7 2-4.47z" fill="#5b463f"/></svg>
              )}
            </button>
          </div>
        </div>
        {/* single-line animated title */}
          {/* two-line animated title: first line "Happy Birthday", second line "Isma" */}
          <motion.div
            className="cutout-title card-title font-handwritten text-center mb-2"
            initial={{ y: -140, opacity: 0, rotate: -12 }}
            animate={{ y: [ -140, 0, -26, 0, -10, 0 ], rotate: [ -12, 8, -6, 6, -3, 0 ], opacity: [0,1,1,1,1,1] }}
            transition={{ duration: 1.05, times: [0,0.35,0.6,0.8,1], ease: 'easeOut' }}
          >
            Happy Birthday
          </motion.div>
            <center>
          <motion.div
            className="cutout-title font-handwritten text-center mb-2"
            initial={{ y: -120, opacity: 0, rotate: 12 }}
            animate={{ y: [ -120, 0, -18, 0 ], rotate: [ 12, -8, 5, 0 ], opacity: [0,1,1,1] }}
            transition={{ duration: 1.05, delay: 0.12, times: [0,0.5,0.8,1], ease: 'easeOut' }}
          >
            Isma
          </motion.div>
          </center>
        {/* collage remains as-is */}
        <div className="flex justify-center mb-6">
          <div className="frame" style={{cursor: 'zoom-in'}}>
            <img
              src="/images/collage.jpeg"
              alt="collage"
              className="frame-img"
              onClick={() => setIsZoomed(true)}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/baby.png' }}
            />
            <div className="frame-tape tape-left" />
            <div className="frame-tape tape-right" />
          </div>
        </div>

        {/* roomy editable letter area */}
        <div className="mb-12">
          <div className="letter-area font-handwritten"  role="textbox" aria-label="Write your letter here">
            Dearest Isma, <br/><br/>

            Happy 21st birthday, my love.

            I hope this year becomes a meaningful one for you which full of growth, clarity, and moments that make you feel proud of who you are becoming. I don’t wish for perfection for you, only that you find peace within yourself, confidence in your path, and happiness in the little things. You deserve a life that feels good to live, you’re already doing so well, and I’m really proud of you. <br></br><br></br>

            As for the future, none can really predict it and maybe that’s why the present matters the most. And in this present I get to share with you, I feel nothing but ease and joy. I hope you always stay true to who you are, even as you grow and change. You are loved for who you are by so many people, and by me too.

            May you always be surrounded by goodness, and may this life grant you the happiness you deserve.

            Love you with all my heart 🤍
            <br/><br/>

            Sincerely, <br/>
            Nazeera Nashar
          </div>
        </div>

      </motion.div>

      {/* zoom overlay triggered by clicking the collage image */}
      {isZoomed && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsZoomed(false)} />
          <motion.img
            src="/images/collage.jpeg"
            alt="collage large"
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg relative z-50"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.28 }}
            onClick={() => setIsZoomed(false)}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/baby.png' }}
            style={{ cursor: 'zoom-out' }}
          />
        </motion.div>
      )}
    </div>
  )
}

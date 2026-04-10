import React, { useState } from 'react'
import Splash from './pages/Splash'
import Card from './pages/Card'
import ChoicePage from './pages/choice'
import Camera from './pages/camera'
import Surprise from './pages/suprise' // Letter intro before SceneOne
import SceneOne from './pages/SceneOne'
import SceneTwo from './pages/Scenetwo'
import Game from './pages/game' // the hearts game


export default function App() {
  const [view, setView] = useState('splash')

  return (
    <div className="app-root">
      {view === 'splash' && (
        <Splash onContinue={() => setView('choice')} />
      )}

      {view === 'choice' && (
        <ChoicePage
          onClose={() => setView('splash')}
          onSelect={(page) => setView(page)}
        />
      )}

      {/* CAMERA PAGE */}
      {view === 'camera' && (
        <Camera onNext={() => setView('choice')} onBack={() => setView('choice')} />
      )}

      {/* LETTER → SURPRISE PAGE → SceneOne → SceneTwo → Card */}
      {view === 'letter' && (
        <Surprise onNext={() => setView('sceneOne')} onBack={() => setView('choice')} />
      )}

      {view === 'sceneOne' && (
        <SceneOne onNext={() => setView('sceneTwo')} />
      )}

      {view === 'sceneTwo' && (
        <SceneTwo onNext={() => setView('card')} />
      )}

      {view === 'card' && (
        <Card onBack={() => setView('choice')} />
      )}

      {/* SURPRISE BUTTON → GAME */}
      {view === 'game' && (
        <Game onComplete={() => setView('choice')} onBack={() => setView('choice')} />
      )}
    </div>
  )
}

import { useEffect, useState, lazy, Suspense } from "react";
import DeathlyLoader from "./DeathlyLoader";
import VoiceActivator from "./VoiceActivator";

// Lazy load the Home component
const Home = lazy(() => import("../Home"));

function OnLoadAnimation({audioRef, onHomeLoad}) {
  const [phase, setPhase] = useState("loader"); // 'loader' → 'spell' → 'reveal'
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (phase === "loader") {
      const timer = setTimeout(() => setPhase("spell"), 5000); // loader ends in 5s
      return () => clearTimeout(timer);
    }
    if (phase === "reveal") {
      const timer = setTimeout(() => {
        setShowButton(true);
        onHomeLoad?.(true);
      }, 3000); // same as lumos-screen-glow animation duration
      return () => clearTimeout(timer);
    }
  }, [phase, onHomeLoad]);

  return (
    <div className="relative min-h-screen bg-[radial-gradient(#4b2e18_0%,#0a0a23_70%,#000000_100%)] flex items-center justify-center overflow-hidden">

      {/* PHASE 1: Deathly Hallows Loader */}
      {phase === "loader" && <DeathlyLoader />}
      {/* PHASE 2: Voice Prompt */}
      {phase === "spell" && (
        <>
          <VoiceActivator
            onTrigger={() => {
              setPhase("reveal");
              audioRef.current.play();
            }}
          />
          <div className="animate-bottom text-white text-center text-xl lg:text-3xl xl:text-4xl">
        <h2> Say "Lumos Maxima"</h2>
        <p>to illuminate the world</p>
        <button 
            onClick={() => {
              setPhase("reveal");
              audioRef.current.play();
            }}
            className="mt-8 px-6 py-3 bg-[#4b2e18] text-white rounded-lg hover:bg-[#6b4e38] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Cast Spell
          </button>
      </div>
      
        </>
      )}
      
      {/* PHASE 3: Magical Reveal */}
      {phase === "reveal" && (
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="lumos-screen-glow" />
    </div>
      )}

      {/* Button Reveal */}
      {showButton && (
        <div className="w-full h-screen relative">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <Home />
            
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default OnLoadAnimation;

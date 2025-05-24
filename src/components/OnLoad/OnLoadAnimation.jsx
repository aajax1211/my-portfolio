import { useEffect, useState, lazy, Suspense } from "react";
import DeathlyLoader from "./DeathlyLoader";
import VoiceActivator from "./VoiceActivator";
import { useViewerCount } from "../../hooks/useViewerCount";

// Lazy load the Home component
const Home = lazy(() => import("../Home"));

function OnLoadAnimation({audioRef, onHomeLoad}) {
  const [phase, setPhase] = useState("loader"); // 'loader' → 'spell' → 'reveal'
  const [showButton, setShowButton] = useState(false);
  const viewerCount = useViewerCount();

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
            <h2> Say "Lumos"</h2>
            <p>Or press the button<br/>to illuminate the world</p>
            <div className="mt-4 text-sm text-white/70 animate-pulse">
              <span className="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {viewerCount.toLocaleString()} wizards have cast this spell
              </span>
            </div>
            <button 
              onClick={() => {
                setPhase("reveal");
                audioRef.current.play();
              }}
              className="magic-btn mt-8 px-6 py-3 bg-[#4b2e18] text-white rounded-lg hover:bg-[#6b4e38] transition-colors duration-300 shadow-lg hover:shadow-xl tooltip-animate"
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

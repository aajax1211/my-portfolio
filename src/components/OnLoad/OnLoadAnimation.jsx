import { useEffect, useState } from "react";
import DeathlyLoader from "./DeathlyLoader";
import VoiceActivator from "./VoiceActivator";
import Home from "../Home";


function OnLoadAnimation() {
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
      }, 3000); // same as lumos-screen-glow animation duration
      return () => clearTimeout(timer);
    }
  }, [phase]);

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
            }}
          />
          <div className="animate-bottom text-white text-center text-xl lg:text-3xl xl:text-4xl">
        <h2>"Lumos Maxima"</h2>
        <p>to illuminate the world</p>
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
        <Home></Home>
        </div>
      )}
    </div>
  );
}

export default OnLoadAnimation;

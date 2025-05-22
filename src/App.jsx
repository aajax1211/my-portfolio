import OnLoadAnimation from "./components/OnLoad/OnLoadAnimation";
import AudioController from "./components/AudioController/AudioController";
import { useRef, useState } from "react";
import { ResumeButton } from "./components/ResumeButton";

function App() {
  const audioRef = useRef(null);
  const [showResumeButton, setShowResumeButton] = useState(false);

  return (
    <>
      <OnLoadAnimation 
        audioRef={audioRef} 
        onHomeLoad={setShowResumeButton}
      />
      <AudioController audioRef={audioRef} />
      {showResumeButton && (
        <div className="fixed bottom-10 right-10 pointer-events-auto cursor-pointer z-50">
          <ResumeButton />
        </div>
      )}
    </>
  );
}

export default App;

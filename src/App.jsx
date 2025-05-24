import OnLoadAnimation from "./components/OnLoad/OnLoadAnimation";
import { useRef, useState } from "react";
import MouseFollower from "./components/MouseFollower";
import { Navigation } from "./components/Navigation";
import { BASE_URL } from "./components/constants/constants";

function App() {
  const audioRef = useRef(null);
  const [showResumeButton, setShowResumeButton] = useState(false);

  return (
    <>
      <MouseFollower />
      <OnLoadAnimation 
        audioRef={audioRef} 
        onHomeLoad={setShowResumeButton}
      />
      <audio ref={audioRef} loop>
        <source src={`${BASE_URL}sounds/theme.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {showResumeButton && (
        <Navigation audioRef={audioRef} />
      )}
    </>
  );
}

export default App;

import OnLoadAnimation from "./components/OnLoad/OnLoadAnimation";
import AudioController from "./components/AudioController/AudioController";
import { useRef } from "react";

function App() {
   const audioRef = useRef(null);
  return (
    <>
      <OnLoadAnimation audioRef={audioRef}></OnLoadAnimation>
      <AudioController audioRef={audioRef} />
    </>
  );
}

export default App;

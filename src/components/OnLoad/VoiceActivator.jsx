import { useEffect } from "react";

export default function VoiceActivator({ onTrigger }) {
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn’t support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = () => {
      // Detected *any* voice input
      recognition.stop();
      
      setTimeout(() => {
        onTrigger();
         // delay to build illusion of “processing spell”
      }, 500); // 1 second for realism
    };

    recognition.start();

    return () => recognition.stop();
  }, [onTrigger]);

  return null;
}

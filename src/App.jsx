import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import OnLoadAnimation from "./components/OnLoad/OnLoadAnimation";

function App() {
  return (
    <>
      <OnLoadAnimation></OnLoadAnimation>
    </>
  );
}

export default App;

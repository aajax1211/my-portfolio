import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./Experience";
import { UI } from "./UI";

function Home() {
  return (
    <>
      <UI />
      <Loader />
      <Canvas className="absolute inset-0 w-full h-full" shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
          
        </group>
      </Canvas>
    </>
  );
}

export default Home;

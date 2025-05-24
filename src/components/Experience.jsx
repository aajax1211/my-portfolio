import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";
import { useAtom } from "jotai";
import { pageAtom } from "./UI";
import { useSpring, a } from "@react-spring/three";

export const Experience = () => {
  const [currentPage] = useAtom(pageAtom);
  const isBookClosed = currentPage === 0;
  const { position } = useSpring({
    position: isBookClosed ? [0, 0, 0.5] : [0, 0, 0],
    config: { mass: 0.5, tension: 120, friction: 20 }, 
  });

  return (
    <>
      <a.group position={position}>
      <Book />
    </a.group>
      <OrbitControls />
      <Environment preset="studio"></Environment>
      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

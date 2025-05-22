import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PAGE_DEPTH, PAGE_SEGMENTS, SEGMENT_WIDTH, easingFactor, outsideCurveStrength, pageGeometry } from "../constants/constants";
import { pageMaterials } from "../helper/pageMaterials";
import { applySkinningToPageGeometry } from "../helper/skinningToPageGeo";
import { useTexture } from "@react-three/drei";
import { pages } from "../UI";
import { useFrame, useLoader } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
import { easing } from "maath";

pages.forEach((page) => {
  useLoader.preload(THREE.TextureLoader, [`/textures/${page.front}.jpg`]);
  useLoader.preload(THREE.TextureLoader, [`/textures/${page.back}.jpg`]);
  useLoader.preload(THREE.TextureLoader, [`/textures/book-cover-roughness.jpg`]);
});

export const Page = ({ number, front, back,page,opened,bookClosed, ...props }) => {
    const [picture, picture2, pictureRoughness] = useTexture([
  `/textures/${front}.jpg`,
  `/textures/${back}.jpg`,
  ...(number === 0 || number === pages.length - 1
    ? [`/textures/book-cover-roughness.jpg`]
    : [])
]);
  const group = useRef();
  const skinnedMeshRef = useRef();
   const turnedAt = useRef(0);
    const lastOpened = useRef(opened);

    // create the two textured materials
  const frontMat = new THREE.MeshStandardMaterial({
    map: picture,
    roughnessMap: number === 0 ? pictureRoughness : null,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });

  const backMat = new THREE.MeshStandardMaterial({
    map: picture2,
    roughnessMap: number === pages.length - 1 ? pictureRoughness : null,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });

  const { mesh, bones, skeleton } = useMemo(() => {
    const clonedGeometry = pageGeometry.clone();
    applySkinningToPageGeometry(clonedGeometry);

    const bones = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new THREE.Bone();
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) bones[i - 1].add(bone);
      bones.push(bone);
    }

    const skeleton = new THREE.Skeleton(bones);
    const materials = [...pageMaterials, 
        frontMat,
        backMat,
    ]
    picture.colorSpace= picture2.colorSpace = THREE.SRGBColorSpace;

    const mesh = new THREE.SkinnedMesh(clonedGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;

    mesh.add(bones[0]); // Add root bone to mesh
    mesh.bind(skeleton); // Bind skeleton to mesh
    bones[0].updateMatrixWorld(true);
    return { mesh, bones, skeleton };
  }, []);

useFrame((_,delta) => {
  if (!skinnedMeshRef.current) return;

  const bones = skinnedMeshRef.current.skeleton.bones;

  if(lastOpened.current !== opened){
    turnedAt.current = +new Date();
    lastOpened.current = opened;
  }


  let turningTime = Math.min(400, +new Date() - turnedAt.current)/400;

  let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;

  if(!bookClosed){
    targetRotation += degToRad(number * 0.8);
  }

  // Smoothly interpolate current rotation towards target
  for (let i = 0; i < bones.length; i++) {
    const target = i === 0 ? group.current : bones[i];
    const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
    const outsideCurveIntensity = i > 8 ? Math.cos(i * 0.3 + 0.09) : 0;



    let rotationAngle = 
    targetRotation * insideCurveIntensity * 0.18 - 
    outsideCurveStrength * outsideCurveIntensity * targetRotation 

    if(bookClosed){
        if (i === 0) {
            rotationAngle = targetRotation;
        }else{
            rotationAngle = 0
        }
    }
    easing.dampAngle(
      target.rotation,
      "y",
      rotationAngle,
      easingFactor,
      delta // speed factor (0.1 = slow, 1 = instant)
    );
  }
});
const activePageIndex = bookClosed ? page.length + 1 : page;
  return (
    <group {...props} ref={group} rotation-y={0} position-x={-number * PAGE_DEPTH}>
      <primitive ref={skinnedMeshRef} object={mesh} position-z={-number * PAGE_DEPTH
        + (number === activePageIndex ? PAGE_DEPTH * 2 : 0)
      }
      renderOrder={number === activePageIndex ? 1 : 0}/>
    </group>
  );
};

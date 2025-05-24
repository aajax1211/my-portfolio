import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BASE_URL, PAGE_DEPTH, PAGE_SEGMENTS, SEGMENT_WIDTH, easingFactor, outsideCurveStrength, pageGeometry } from "../constants/constants";
import { pageMaterials } from "../helper/pageMaterials";
import { applySkinningToPageGeometry } from "../helper/skinningToPageGeo";
import { useCursor, useTexture } from "@react-three/drei";
import { pageAtom, pages } from "../UI";
import { useFrame, useLoader } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
import { easing } from "maath";
import { useAtom } from "jotai";

// Add error handling for texture loading
const loadTexture = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      path,
      (texture) => resolve(texture),
      undefined,
      (error) => {
        console.error(`Failed to load texture: ${path}`, error);
        reject(error);
      }
    );
  });
};

pages.forEach((page) => {
  try {
    useLoader.preload(THREE.TextureLoader, [`${BASE_URL}/textures/${page.front}.jpg`]);
    useLoader.preload(THREE.TextureLoader, [`${BASE_URL}/textures/${page.back}.jpg`]);
    useLoader.preload(THREE.TextureLoader, [`${BASE_URL}/textures/book-cover-roughness.jpg`]);
  } catch (error) {
    console.error('Error preloading textures:', error);
  }
});

export const Page = ({ number, front, back,page,opened,bookClosed, ...props }) => {
    const[highlighted, setHighlighted] = useState(false)
    const[_,setPage] = useAtom(pageAtom)
    useCursor(highlighted)

    const [picture, picture2, pictureRoughness] = useTexture([
  `${BASE_URL}/textures/${front}.jpg`,
  `${BASE_URL}/textures/${back}.jpg`,
  ...(number === 0 || number === pages.length - 1
    ? [`${BASE_URL}/textures/book-cover-roughness.jpg`]
    : [])
], undefined, undefined);
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
    <group {...props} ref={group} rotation-y={0} position-x={-number * PAGE_DEPTH} onPointerEnter={(e)=>{
      e.stopPropagation()
      setHighlighted(true)
    }}
    onPointerLeave={(e)=>{
      e.stopPropagation()
      setHighlighted(false)
    }}
    onClick={(e)=>{
      e.stopPropagation()
      setPage(opened ? number : number + 1)
      setHighlighted(false)
    }}>
      <primitive ref={skinnedMeshRef} object={mesh} position-z={-number * PAGE_DEPTH
        + (number === activePageIndex ? PAGE_DEPTH * 2 : 0)
      }
      renderOrder={number === activePageIndex ? 1 : 0}/>
    </group>
  );
};

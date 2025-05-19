import { Float16BufferAttribute, Uint16BufferAttribute, Vector3 } from "three";
import { PAGE_WIDTH, SEGMENT_WIDTH } from "../constants/constants";
import * as THREE from "three";

export function applySkinningToPageGeometry(geometry) {
  if (!geometry.attributes.position) {
    console.warn("Geometry has no position attribute!");
    return;
  }

  geometry.translate(PAGE_WIDTH / 2, 0, 0);

  const position = geometry.attributes.position;
  const vertex = new THREE.Vector3();
  const skinIndexes = [];
  const skinWeights = [];

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;

    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndexes, 4));
  geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeights, 4)); // Float32 is safer than Float16

  geometry.computeBoundingBox(); // 🔥 Very important after mutation
}

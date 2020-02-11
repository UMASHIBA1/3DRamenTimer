import * as THREE from "three";

class RingFragment extends THREE.Mesh {
  constructor() {
    // ring1周でarcの値は6.3となる
    const geometry = new THREE.TorusGeometry(14, 1, 16, 0.5);
    const material = new THREE.MeshToonMaterial({ color: "#6DFF6F" });
    super(geometry, material);
  }
}

export default RingFragment;

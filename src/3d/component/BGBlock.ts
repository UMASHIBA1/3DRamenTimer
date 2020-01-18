import * as THREE from "three";

class BGBlock extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(300, 300, 300);
    const material = new THREE.MeshNormalMaterial();
    super(geometry, material);
  }
}

export default BGBlock;

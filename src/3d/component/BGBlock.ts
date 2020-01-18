import * as THREE from "three";

class BGBlock extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const material = new THREE.MeshToonMaterial({ color: "#61e363" });
    super(geometry, material);
    const height = window.innerHeight;
    const width = window.innerWidth;
    this.position.x = (Math.random() - 0.5) * width;
    this.position.y = (Math.random() - 0.5) * height;
    this.position.z = Math.random() * 1000;
    this.rotation.x = Math.random() * 2 * Math.PI;
    this.rotation.y = Math.random() * 2 * Math.PI;
    this.rotation.z = Math.random() * 2 * Math.PI;
  }
}

export default BGBlock;

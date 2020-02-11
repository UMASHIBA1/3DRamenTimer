import * as THREE from "three";

class RingFragment extends THREE.Mesh {
  constructor(fragmentIndex: number, radius: number) {
    // ring1周でarcの値は6.3となる
    // 6.3を9で割り0.7、それに0.9を掛け0.63。残りの0.07は空白
    const thisAngleDiff = (2 / 9) * Math.PI * fragmentIndex;
    const circleDiameter = 10;
    const geometry = new THREE.TorusGeometry(radius, 3, 16, 100, 0.63);
    const material = new THREE.MeshToonMaterial({ color: "#FF0000" });
    super(geometry, material);
    this.position.x = Math.sin(thisAngleDiff) * circleDiameter;
    this.position.y = Math.cos(thisAngleDiff) * circleDiameter;
    this.rotation.y = 0;
    this.rotation.x = 0;
    this.rotation.z = -thisAngleDiff + 1.23;
  }
}

export default RingFragment;

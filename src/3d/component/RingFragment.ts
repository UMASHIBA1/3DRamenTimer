import * as THREE from "three";

class RingFragment extends THREE.Mesh {
  constructor(
    fragmentIndex: number,
    radius: number,
    tube: number = 3,
    // ring1周でarcの値は6.3となる
    // 6.3を9で割り0.7、それに0.9を掛け0.63。残りの0.07は空白
    arc: number = 0.63
  ) {
    const thisAngleDiff = (2 / 9) * Math.PI * fragmentIndex;
    const circleDiameter = 10;
    const geometry = new THREE.TorusGeometry(radius, tube, 2, 100, arc);
    const material = new THREE.MeshToonMaterial({ color: "#FF0000" });
    super(geometry, material);
    this.position.x = Math.sin(thisAngleDiff) * circleDiameter;
    this.position.y = Math.cos(thisAngleDiff) * circleDiameter;
    this.rotation.y = 0;
    this.rotation.x = 0;
    // 1.23は初期でのangleの傾きを修正するための値
    this.rotation.z = -thisAngleDiff + 1.23;
  }
}

export default RingFragment;

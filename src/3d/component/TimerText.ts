import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";

class TimerText extends THREE.Mesh {
  constructor(minute: number, second: number) {
    const font = new THREE.Font(regularFont);
    const geometry = new THREE.TextGeometry(`${minute}:${second}`, {
      font: font,
      size: 20,
      height: 5
    });
    const material = new THREE.MeshLambertMaterial();
    super(geometry, material);
    this.position.x = -34;
    this.position.y = 0;
    this.position.z = 800;
    this.rotation.x = -Math.PI * 2;
  }
}

export default TimerText;

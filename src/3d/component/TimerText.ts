import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";

class TimerText extends THREE.Mesh {
  constructor(text: string) {
    const font = new THREE.Font(regularFont);
    const geometry = new THREE.TextGeometry(text, {
      font: font,
      size: 20,
      height: 5
    });
    const material = new THREE.MeshBasicMaterial({ color: "#000000" });
    super(geometry, material);
    this.position.x = 0;
    this.position.y = 0;
    this.position.z = 800;
  }
}

export default TimerText;
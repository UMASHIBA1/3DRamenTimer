import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";

class FinishText extends THREE.Mesh {
  constructor(character: string, positionX: number) {
    const font = new THREE.Font(regularFont);
    const geometry = new THREE.TextGeometry(character, {
      font: font,
      size: 20,
      height: 5
    });
    const material = new THREE.MeshToonMaterial({ color: "#FAF4EC" });
    super(geometry, material);

    this.position.x = positionX;
  }
}

export default FinishText;

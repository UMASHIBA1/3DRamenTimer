import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import calcTextLocation from "../system/calcTextLocation";

class ColonText extends THREE.Mesh {
  constructor() {
    const font = new THREE.Font(regularFont);
    const geometry = new THREE.TextGeometry(":", {
      font: font,
      size: 20,
      height: 5
    });
    const material = new THREE.MeshToonMaterial({ color: "#FAF4EC" });
    super(geometry, material);
    const { positionY, positionZ, rotationX } = calcTextLocation(0, 0);
    this.position.x = 1;
    this.position.y = positionY;
    this.position.z = positionZ;
    this.rotation.x = rotationX;
  }
}

export default ColonText;

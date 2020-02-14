import * as THREE from "three";
import startImg from "../../statics/start-button.png";

class StartButton extends THREE.Mesh {
  constructor() {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(startImg);
    const geometry = new THREE.CylinderGeometry(4, 4, 0.4, 50, 50);
    // const material = new THREE.MeshToonMaterial();
    const material = new THREE.MeshToonMaterial({
      map: texture
    });
    super(geometry, material);
    this.position.z = 450;
    // this.position.x = 12;
    this.position.y = -16;
    this.rotation.x = 0.5 * Math.PI;
    this.rotation.y = 0.5 * Math.PI;
  }
}

export default StartButton;

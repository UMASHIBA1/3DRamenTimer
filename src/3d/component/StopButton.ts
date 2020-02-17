import * as THREE from "three";
import stopImg from "../../statics/stop-button.png";
import ButtonMeta from "./meta/ButtonMeta";

class StopButton extends ButtonMeta {
  constructor(camera: THREE.Camera) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(stopImg);
    const material = new THREE.MeshToonMaterial({
      map: texture
    });
    super(camera, material);
  }
}

export default StopButton;

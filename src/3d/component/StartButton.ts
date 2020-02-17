import * as THREE from "three";
import startImg from "../../statics/start-button.png";
import ButtonMeta from "./meta/ButtonMeta";

class StartButton extends ButtonMeta {
  constructor(camera: THREE.Camera) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(startImg);
    const material = new THREE.MeshToonMaterial({
      map: texture
    });
    super(camera, material);
  }
}

export default StartButton;

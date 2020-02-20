import * as THREE from "three";
import OKImg from "../../statics/ok-button.png";
import ButtonMeta from "./meta/ButtonMeta";
import easing from "../system/easing";
import { risedLocation } from "../../settings/finishAnimation";

class OKButton extends ButtonMeta {
  private _transitionDirection: "rise" | "descent" | "stopping";
  constructor(camera: THREE.Camera) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(OKImg);
    const material = new THREE.MeshToonMaterial({
      map: texture
    });
    super(camera, material);
    this.position.y = 650;
    this.scale.x = 0;
    this.scale.y = 0;
    this._transitionDirection = "stopping";
  }

  public startAppearAnimation() {
    this.scale.x = 1;
    this.scale.y = 1;
    this._transitionDirection = "rise";
  }

  tick() {
    if (this._transitionDirection === "rise") {
      this.position.y += easing(this.position.y, risedLocation - 16);
    }
  }
}
export default OKButton;

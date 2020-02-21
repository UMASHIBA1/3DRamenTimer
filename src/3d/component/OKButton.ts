import * as THREE from "three";
import OKImg from "../../statics/ok-button.png";
import ButtonMeta from "./meta/ButtonMeta";
import easing from "../system/easing";
import { risedLocation } from "../../settings/finishAnimation";

const defaultPositionY = 650;
const risedPositionY = risedLocation - 16;

class OKButton extends ButtonMeta {
  private _transitionDirection: "rise" | "descent" | "stopping";
  constructor(camera: THREE.Camera) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(OKImg);
    const material = new THREE.MeshToonMaterial({
      map: texture
    });
    super(camera, material);
    this.position.y = defaultPositionY;
    this.scale.x = 0.0001;
    this.scale.y = 0.0001;
    this._transitionDirection = "stopping";
    this.activate();
  }

  public startAppearAnimation() {
    this.scale.x = 1;
    this.scale.y = 1;
    this._transitionDirection = "rise";
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve();
      }, 800);
    });
  }

  public startDisappearAnimation() {
    this._transitionDirection = "descent";
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve();
      }, 200);
    });
  }

  public tick() {
    if (this._transitionDirection === "rise") {
      this.position.y += easing(this.position.y, risedPositionY);
      if (risedPositionY - this.position.y < 0.1) {
        this._transitionDirection = "stopping";
      }
    } else if (this._transitionDirection === "descent") {
      this.position.y += easing(this.position.y, defaultPositionY);
      if (this.position.y - defaultPositionY < 0.1) {
        this._transitionDirection = "stopping";
        this.scale.x = 0.0001;
        this.scale.y = 0.0001;
      }
    }
    super.tick();
  }
}
export default OKButton;

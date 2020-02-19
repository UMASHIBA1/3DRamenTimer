import * as THREE from "three";
import MultiRing from "./MultiRing";
import { risedLocation } from "../../settings/finishAnimation";
import easeOut from "../system/easing";
import MyCamera from "../MyCamera";

class FinishAnimation {
  private _startFinishAnimation: boolean;
  private _ring: MultiRing;
  constructor(scene: THREE.Scene) {
    this._startFinishAnimation = false;
    this._ring = new MultiRing(400, 10, 30, 10, 0.7);
    this._ring.setPositionXY(0, risedLocation);
    this._ring.setScaleXY(0, 0);
    this._ring.addToScene(scene);
  }

  public startAnimation() {
    this._startFinishAnimation = true;
  }

  public tick() {
    this._ring.tick();
    if (this._startFinishAnimation) {
      const { x, y } = this._ring.scaleXY;
      this._ring.setScaleXY(x + easeOut(x, 1), y + easeOut(y, 1));
      if (x >= 1 || y >= 1) {
        this._startFinishAnimation = false;
      }
    }
  }
}

export default FinishAnimation;

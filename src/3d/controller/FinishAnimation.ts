import * as THREE from "three";
import MultiRing from "./MultiRing";
import { risedLocation } from "../../settings/finishAnimation";
import easing from "../system/easing";
import MyCamera from "../MyCamera";
import FinishTextController from "./FinishTextController";
import OKButton from "../component/OKButton";

class FinishAnimation {
  private _redRingAnimationDirection: "expand" | "minimum" | "stopping";
  private _ring: MultiRing;
  private _finishTextController: FinishTextController;
  private _myCamera: MyCamera;
  private _okButton: OKButton;
  constructor(scene: THREE.Scene, myCamera: MyCamera) {
    this._redRingAnimationDirection = "stopping";
    this._ring = new MultiRing(400, 10, 30, 10, 0.7);
    this._ring.setPositionXY(0, risedLocation);
    this._ring.setScaleXY(0, 0);
    this._ring.addToScene(scene);
    this._finishTextController = new FinishTextController(scene);
    this._myCamera = myCamera;
    this._okButton = new OKButton(this._myCamera.camera);
    scene.add(this._okButton);
  }

  public startAppearAnimation() {
    return new Promise(resolve => {
      this._myCamera.riseCamera().then(() => {
        this._redRingAnimationDirection = "expand";
        // RedRingのアニメーションにかかる時間を600msとしてFinishTextのアニメーションを待たせる
        setTimeout(() => {
          this._finishTextController.startAppearAnimation().then(() => {
            this._okButton.startAppearAnimation().then(() => {
              return resolve();
            });
          });
        }, 600);
      });
    });
  }

  public _startDisappearAnimation() {
    this._okButton.startDisappearAnimation().then(() => {
      this._finishTextController.startDisappearAnimation().then(() => {
        this._redRingAnimationDirection = "minimum";
        // redRingのアニメーションにかかる時間を600msとして計算
        setTimeout(() => {
          this._myCamera.descentCamera();
        }, 600);
      });
    });
  }

  public tick() {
    this._finishTextController.tick();
    this._ring.tick();
    this._okButton.tick();
    if (this._redRingAnimationDirection === "expand") {
      const { x, y } = this._ring.scaleXY;
      this._ring.setScaleXY(x + easing(x, 1), y + easing(y, 1));
      if (x >= 1 || y >= 1) {
        this._redRingAnimationDirection = "stopping";
      }
    } else if (this._redRingAnimationDirection === "minimum") {
      const { x, y } = this._ring.scaleXY;
      this._ring.setScaleXY(x + easing(x, 0, 0.2), y + easing(y, 0, 0.2));
      if (x < 0.001 || y < 0.001) {
        this._redRingAnimationDirection = "stopping";
      }
    }
    if (this._okButton.isClicked) {
      this._okButton.isClicked = false;
      this._startDisappearAnimation();
    }
  }
}

export default FinishAnimation;

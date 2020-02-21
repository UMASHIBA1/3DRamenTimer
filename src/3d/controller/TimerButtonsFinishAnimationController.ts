import * as THREE from "three";
import Timer from "./Timer";
import Buttons from "./Buttons";
import Canvas from "../../Canvas";
import MinuteSecondType from "../../types/MinuteSecondType";
import MyCamera from "../MyCamera";
import FinishAnimation from "./FinishAnimation";

class TimerButtonsFinishAnimationController {
  private _timer: Timer;
  private _buttons: Buttons;
  private _finishAnimation: FinishAnimation;
  private _isWaitingRiseCamera: boolean;
  constructor(
    canvas: Canvas,
    scene: THREE.Scene,
    myCamera: MyCamera,
    firstMinute: MinuteSecondType = 3,
    firstSecond: MinuteSecondType = 0
  ) {
    this._timer = new Timer(canvas, scene, firstMinute, firstSecond);
    this._buttons = new Buttons(scene, myCamera.camera);
    this._finishAnimation = new FinishAnimation(scene, myCamera);
    this._isWaitingRiseCamera = true;
  }

  public tick() {
    if (this._timer.isFinished) {
      this._buttons.deactivateStopButton();
      this._buttons.activateStartButton();
      if (this._isWaitingRiseCamera) {
        // ユーザーがカウントが終わったと理解しやすくするため00:00になってからCameraを上昇させる前に800ms待つ
        setTimeout(() => {
          this._finishAnimation.startAppearAnimation();
        }, 800);
        this._isWaitingRiseCamera = false;
      }
    }
    if (this._buttons.isStarted && !this._timer.isStartedCount) {
      this._timer.startCount();
    }
    if (!this._buttons.isStarted && this._timer.isStartedCount) {
      this._timer.stopCount();
    }
    this._timer.tick();
    this._buttons.tick();
    this._finishAnimation.tick();
  }
}

export default TimerButtonsFinishAnimationController;

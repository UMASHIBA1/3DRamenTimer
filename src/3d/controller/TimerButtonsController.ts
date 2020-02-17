import * as THREE from "three";
import Timer from "./Timer";
import Buttons from "./Buttons";
import Canvas from "../../Canvas";
import MinuteSecondType from "../../types/MinuteSecondType";

class TimerButtonsController {
  private _timer: Timer;
  private _buttons: Buttons;
  constructor(
    canvas: Canvas,
    scene: THREE.Scene,
    camera: THREE.Camera,
    firstMinute: MinuteSecondType = 3,
    firstSecond: MinuteSecondType = 0
  ) {
    this._timer = new Timer(canvas, scene, firstMinute, firstSecond);
    this._buttons = new Buttons(scene, camera);
  }

  public tick() {
    if (this._buttons.isStarted && !this._timer.isStartedCount) {
      this._timer.startCount();
    }
    if (!this._buttons.isStarted && this._timer.isStartedCount) {
      this._timer.stopCount();
    }
    this._timer.tick();
    this._buttons.tick();
  }
}

export default TimerButtonsController;

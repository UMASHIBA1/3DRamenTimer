import * as THREE from "three";
import StartButton from "../component/StartButton";
import StopButton from "../component/StopButton";

class Buttons {
  public isStarted: boolean;
  private _startButton: StartButton;
  private _stopButton: StopButton;
  private _scene: THREE.Scene;
  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this.isStarted = false;
    this._startButton = new StartButton(camera);
    this._stopButton = new StopButton(camera);
    this._scene = scene;
    this.activateStartButton();
  }

  public activateStartButton() {
    this._scene.add(this._startButton);
    this._startButton.activate();
    this.isStarted = false;
  }

  private _deactivateStartButton() {
    this._scene.add(this._stopButton);
    this._stopButton.deactivate();
  }

  private _activateStopButton() {
    this._scene.add(this._stopButton);
    this._stopButton.activate();
    this.isStarted = true;
  }

  public deactivateStopButton() {
    this._scene.remove(this._stopButton);
    this._stopButton.deactivate();
  }

  public tick() {
    if (this._startButton.isClicked) {
      this._startButton.isClicked = false;
      this._deactivateStartButton();
      this._activateStopButton();
    }
    if (this._stopButton.isClicked) {
      this._stopButton.isClicked = false;
      this.deactivateStopButton();
      this.activateStartButton();
    }
    this._startButton.tick();
    this._stopButton.tick();
  }
}

export default Buttons;

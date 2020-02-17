import * as THREE from "three";
import StartButton from "../component/StartButton";
import StopButton from "../component/StopButton";

class Buttons {
  private _startButton: StartButton;
  private _stopButton: StopButton;
  private _scene: THREE.Scene;
  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this._startButton = new StartButton(camera);
    this._stopButton = new StopButton(camera);
    this._scene = scene;
    this._activateStart();
  }

  private _activateStart() {
    this._scene.add(this._startButton);
    this._startButton.activate();
  }

  private _deactivateStart() {
    this._scene.add(this._stopButton);
    this._stopButton.deactivate();
  }

  private _activateStop() {
    this._scene.add(this._stopButton);
    this._stopButton.activate();
  }

  private _deactivateStop() {
    this._scene.remove(this._stopButton);
    this._stopButton.deactivate();
  }

  public tick() {
    if (this._startButton.isClicked) {
      this._startButton.isClicked = false;
      this._deactivateStart();
      this._activateStop();
    }
    if (this._stopButton.isClicked) {
      this._stopButton.isClicked = false;
      this._deactivateStop();
      this._activateStart();
    }
    this._startButton.tick();
    this._stopButton.tick();
  }
}

export default Buttons;

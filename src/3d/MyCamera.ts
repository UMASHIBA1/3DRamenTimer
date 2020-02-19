import * as THREE from "three";
import easing from "./system/easing";
import { risedLocation } from "src/settings/finishAnimation";

const resizeCameraAspect = (camera: THREE.PerspectiveCamera) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const defaultLocation = 0;
const cameraPositionZ = 500;

class MyCamera {
  private _camera: THREE.PerspectiveCamera;
  private _transitionDirection: "rise" | "descent" | "stopping";
  constructor() {
    this._camera = new THREE.PerspectiveCamera(45);
    this._transitionDirection = "stopping";
    this._camera.position.set(0, 0, cameraPositionZ);
    // this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    resizeCameraAspect(this._camera);
    window.addEventListener("resize", () => {
      resizeCameraAspect(this._camera);
    });
  }

  public get camera() {
    return this._camera;
  }

  public riseCamera() {
    this._transitionDirection = "rise";
  }

  public descentCamera() {
    this._transitionDirection = "descent";
  }

  public tick() {
    const easingSpeed = 0.12;
    const canStopDiff = 0.1;
    if (this._transitionDirection === "rise") {
      this._camera.position.y += easing(
        this._camera.position.y,
        risedLocation,
        easingSpeed
      );
      if (risedLocation - this._camera.position.y < canStopDiff) {
        this._transitionDirection = "stopping";
      }
    } else if (this._transitionDirection === "descent") {
      this._camera.position.y += easing(
        this._camera.position.y,
        defaultLocation,
        easingSpeed
      );
      if (this._camera.position.y - defaultLocation < canStopDiff) {
        this._transitionDirection = "stopping";
      }
    }
  }
}

export default MyCamera;

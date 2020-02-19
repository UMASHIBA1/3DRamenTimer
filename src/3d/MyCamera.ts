import * as THREE from "three";

const resizeCameraAspect = (camera: THREE.PerspectiveCamera) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const cameraPositionZ = 500;
class MyCamera {
  private _camera: THREE.PerspectiveCamera;
  constructor() {
    this._camera = new THREE.PerspectiveCamera(45);
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
}

export default MyCamera;

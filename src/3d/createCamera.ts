import * as THREE from "three";

const resizeCameraAspect = (camera: THREE.PerspectiveCamera) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

export default () => {
  const camera = new THREE.PerspectiveCamera(45);
  camera.position.set(0, 0, +1000);
  resizeCameraAspect(camera);

  window.addEventListener("resize", () => {
    resizeCameraAspect(camera);
  });
  return camera;
};

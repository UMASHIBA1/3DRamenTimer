import * as THREE from "three";

const resizeCameraAspect = (camera: THREE.PerspectiveCamera) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

export default () => {
  const cameraPositionZ = 500;
  const fov =
    (Math.atan2(window.innerWidth / 2, cameraPositionZ) / Math.PI) * 180;
  const camera = new THREE.PerspectiveCamera(fov);
  camera.position.set(0, 0, cameraPositionZ);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  resizeCameraAspect(camera);

  window.addEventListener("resize", () => {
    resizeCameraAspect(camera);
  });
  return camera;
};

import * as THREE from "three";

const adjustRendererSize = (
  webGLRenderer: THREE.WebGLRenderer,
  width: number,
  height: number
) => {
  webGLRenderer.setSize(width, height);
};

const resizeCameraAspect = (
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number
) => {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const onResizeFC = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  adjustRendererSize(renderer, width, height);
  resizeCameraAspect(camera, width, height);
};

export default () => {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setPixelRatio(window.devicePixelRatio);

  const camera = new THREE.PerspectiveCamera(45);
  camera.position.set(0, 0, +1000);
  onResizeFC(renderer, camera);

  window.addEventListener("resize", () => {
    onResizeFC(renderer, camera);
  });
};

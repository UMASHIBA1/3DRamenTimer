import * as THREE from "three";

const adjustRendererSize = (webGLRenderer: THREE.WebGLRenderer) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  webGLRenderer.setPixelRatio(window.devicePixelRatio);
  webGLRenderer.setSize(width, height);
};

export default () => {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setClearColor(0xffffff);
  adjustRendererSize(renderer);

  window.addEventListener("resize", () => {
    adjustRendererSize(renderer);
  });
  return renderer;
};

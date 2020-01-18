import "./scss/index.scss";
import controllGeneral from "./controllGeneral";
import createCamera from "./3d/createCamera";
import createRenderer from "./3d/createRenderer";
import createScene from "./3d/createScene";
import BGBlock from "./3d/component/BGBlock";

document.addEventListener("DOMContentLoaded", () => {
  controllGeneral();
  const camera = createCamera();
  const renderer = createRenderer();
  const scene = createScene();

  const bgBlock = new BGBlock();
  scene.add(bgBlock);
  renderer.render(scene, camera);
});

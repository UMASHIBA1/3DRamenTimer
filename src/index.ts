import "./scss/index.scss";
import controllGeneral from "./controllGeneral";
import createCamera from "./3d/createCamera";
import createRenderer from "./3d/createRenderer";
import createScene from "./3d/createScene";
import BGBlock from "./3d/component/BGBlock";
import createLight from "./3d/createLight";

const bgBlocksTick = (bgBlockList: BGBlock[]) => {
  for (let bgBlock of bgBlockList) {
    bgBlock.tick();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const bgBlocksList: BGBlock[] = [];
  controllGeneral();
  const camera = createCamera();
  const renderer = createRenderer();
  const scene = createScene();
  const light = createLight();

  const tick = () => {
    bgBlocksTick(bgBlocksList);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  scene.add(light);
  for (let i = 0; i < 200; i++) {
    const bgBlock = new BGBlock();
    bgBlocksList.push(bgBlock);
    scene.add(bgBlock);
  }

  tick();
});

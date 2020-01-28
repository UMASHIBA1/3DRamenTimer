import "./scss/index.scss";
import controllGeneral from "./controllGeneral";
import createCamera from "./3d/createCamera";
import createRenderer from "./3d/createRenderer";
import createScene from "./3d/createScene";
import BGBlock from "./3d/component/BGBlock";
import createLight from "./3d/createLight";
import Timer from "./3d/system/Timer";

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
  // let timerText: TimerText;

  const tick = () => {
    bgBlocksTick(bgBlocksList);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  // const timerTick = () => {
  //   // requestAnimationFrame(timerTick);
  //   scene.remove(timerText);
  //   // timerText = new TimerText();
  //   scene.add(timerText);
  //   renderer.render(scene, camera);
  // };

  scene.add(light);
  for (let i = 0; i < 200; i++) {
    const bgBlock = new BGBlock();
    bgBlocksList.push(bgBlock);
    scene.add(bgBlock);
  }

  const timer = new Timer(scene, 59, 0);

  // timerText = new TimerText(50, 30);
  // scene.add(timerText);

  tick();
});

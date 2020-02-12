import "./scss/index.scss";
import createCamera from "./3d/createCamera";
import createRenderer from "./3d/createRenderer";
import createScene from "./3d/createScene";
import createLight from "./3d/createLight";
import Timer from "./3d/controller/Timer";
import Canvas from "./Canvas";
import MultiRing from "./3d/controller/MultiRing";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = new Canvas();
  const camera = createCamera();
  const renderer = createRenderer();
  const scene = createScene();
  const light = createLight();

  scene.add(light);

  const multiRing = new MultiRing(400, 13, 30, 10);
  scene.add(multiRing.multiRing);

  const timer = new Timer(canvas, scene, 30, 0);

  const tick = () => {
    multiRing.tick();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
    timer.tick();
  };

  tick();
});

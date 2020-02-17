import "./scss/index.scss";
import createCamera from "./3d/createCamera";
import createRenderer from "./3d/createRenderer";
import createScene from "./3d/createScene";
import createLight from "./3d/createLight";
import Canvas from "./Canvas";
import createManyRings from "./3d/createManyRings";
import TimerButtonsController from "./3d/controller/TimerButtonsController";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = new Canvas();
  const camera = createCamera();
  const renderer = createRenderer();
  const scene = createScene();
  const light = createLight();
  const multiRings = createManyRings(scene);

  scene.add(light);

  // const timer = new Timer(canvas, scene, 30, 0);

  // const buttons = new Buttons(scene, camera);
  const timerButtonsController = new TimerButtonsController(
    canvas,
    scene,
    camera
  );

  const tick = () => {
    for (let i of multiRings) {
      i.tick();
    }
    // timer.tick();
    // buttons.tick();
    timerButtonsController.tick();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
});

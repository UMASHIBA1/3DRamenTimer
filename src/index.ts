import "./scss/index.scss";
import createRenderer from "./3d/createRenderer";
import createScene from "./3d/createScene";
import createLight from "./3d/createLight";
import Canvas from "./Canvas";
import createManyRings from "./3d/createManyRings";
import TimerButtonsFinishAnimationController from "./3d/controller/TimerButtonsFinishAnimationController";
import MyCamera from "./3d/MyCamera";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = new Canvas();
  const myCamera = new MyCamera();
  const renderer = createRenderer();
  const scene = createScene();
  const light = createLight();
  const multiRings = createManyRings(scene);

  scene.add(light);

  const timerButtonsController = new TimerButtonsFinishAnimationController(
    canvas,
    scene,
    myCamera
  );

  const tick = () => {
    for (let i of multiRings) {
      i.tick();
    }
    myCamera.tick();
    timerButtonsController.tick();
    renderer.render(scene, myCamera.camera);
    requestAnimationFrame(tick);
  };

  tick();
});

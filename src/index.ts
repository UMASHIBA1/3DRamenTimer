import "./scss/index.scss";
import controllGeneral from "./controllGeneral";
import createCamera from "./3d/createCamera";
import createRenderer from "./3d/createRenderer";
import createScene from "./3d/createScene";

document.addEventListener("DOMContentLoaded", () => {
  const camera = createCamera();
  const renderer = createRenderer();
  const scene = createScene();
  controllGeneral();
});

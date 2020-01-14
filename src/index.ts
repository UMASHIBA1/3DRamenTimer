import "./scss/index.scss";
import controllGeneral from "./controllGeneral";
import controllWorld from "./3d/controllWorld";

document.addEventListener("DOMContentLoaded", () => {
  controllGeneral();
  controllWorld();
});

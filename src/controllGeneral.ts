export default () => {
  const canvas = document.getElementById("canvas");

  const adjustCanvasSize = () => {
    if (canvas === null) {
      alert("canvas要素が取得できませんでした。");
    } else {
      canvas.setAttribute("width", window.innerWidth.toString());
      canvas.setAttribute("height", window.innerHeight.toString());
    }
  };

  adjustCanvasSize();
  window.addEventListener("resize", adjustCanvasSize);
};

import {
  calcPositionXFromCenter,
  calcPositionYFromCenter
} from "./3d/system/calcPositionFromCenter";

export default class Canvas {
  private _canvas: HTMLElement | null;
  private _nowPositionX: number;
  private _nowPositionY: number;
  constructor() {
    this._canvas = document.getElementById("canvas");
    // _nowCursorXと_nowCursorYは画面の中心からの位置を表す
    this._nowPositionX = 0;
    this._nowPositionY = 0;

    const adjustCanvasSize = () => {
      if (this._canvas === null) {
        alert("canvas要素が取得できませんでした。");
      } else {
        this._canvas.setAttribute("width", window.innerWidth.toString());
        this._canvas.setAttribute("height", window.innerHeight.toString());
      }
    };

    adjustCanvasSize();
    window.addEventListener("resize", adjustCanvasSize);
    this._controllNowCursorPosition();
  }

  private _controllNowCursorPosition() {
    window.addEventListener("mousemove", e => {
      this._nowPositionX = calcPositionXFromCenter(e.clientX);
      this._nowPositionY = calcPositionYFromCenter(e.clientY);
    });
  }

  public get positionX(): number {
    return this._nowPositionX;
  }

  public get positionY(): number {
    return this._nowPositionY;
  }
}

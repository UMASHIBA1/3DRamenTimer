export default class Canvas {
  private _canvas: HTMLElement | null;
  private _nowCursorX: number;
  private _nowCursorY: number;
  constructor() {
    this._canvas = document.getElementById("canvas");
    // _nowCursorXと_nowCursorYは画面の中心からの位置を表す
    this._nowCursorX = 0;
    this._nowCursorY = 0;

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
      this._nowCursorX = e.clientX;
      this._nowCursorY = e.clientY;
    });
  }

  public get cursorX(): number {
    return this._nowCursorX;
  }

  public get cursorY(): number {
    return this._nowCursorY;
  }
}

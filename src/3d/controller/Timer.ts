import * as THREE from "three";
import MinuteSecondType from "../../types/MinuteSecondType";
import ColonText from "../component/ColonText";
import MinuteColumn from "./MinuteColumn";
import SecondColumn from "./SecondColumn";
import Canvas from "../../Canvas";

class Timer {
  private canvas: Canvas;
  private scene: THREE.Scene;
  private nowMinute: MinuteSecondType;
  private nowSecond: MinuteSecondType;
  private minuteColumn: MinuteColumn;
  private secondColumn: SecondColumn;
  constructor(
    canvas: Canvas,
    scene: THREE.Scene,
    minute: MinuteSecondType,
    second: MinuteSecondType
  ) {
    this.canvas = canvas;
    this.scene = scene;
    this.nowMinute = minute;
    this.nowSecond = second;
    const colonText = new ColonText();
    const minuteColumn = new MinuteColumn();
    const secondColumn = new SecondColumn();
    this.scene.add(colonText);
    minuteColumn.init(this.canvas, this.scene, this.nowMinute);
    secondColumn.init(this.scene, this.nowSecond);
    this.minuteColumn = minuteColumn;
    this.secondColumn = secondColumn;
  }

  public startCount() {
    this.minuteColumn.startCount();
    this.secondColumn.startCount();
  }

  public tick() {
    this.minuteColumn.tick();
    this.secondColumn.tick();
  }
}

export default Timer;

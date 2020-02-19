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
  private isWaitingStopCountAfterFinish: boolean;
  public isStartedCount: boolean;
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
    secondColumn.init(this.canvas, this.scene, this.nowSecond);
    this.minuteColumn = minuteColumn;
    this.secondColumn = secondColumn;
    this.isWaitingStopCountAfterFinish = true;
    this.isStartedCount = false;
  }

  public startCount() {
    const firstSecond = this.secondColumn.nowSecond;
    this.minuteColumn.startCount(firstSecond);
    this.secondColumn.startCount();
    this.isStartedCount = true;
  }

  public stopCount() {
    this.secondColumn.stopCount();
    this.minuteColumn.stopCount();
    this.isStartedCount = false;
  }

  public get isFinished() {
    if (
      this.isStartedCount &&
      this.secondColumn.nowSecond === 0 &&
      this.minuteColumn.nowMinute === 0
    ) {
      return true;
    }
    return false;
  }

  public tick() {
    if (this.isFinished && this.isWaitingStopCountAfterFinish) {
      this.isWaitingStopCountAfterFinish = false;
      this.stopCount();
    }
    this.minuteColumn.tick();
    this.secondColumn.tick();
  }
}

export default Timer;

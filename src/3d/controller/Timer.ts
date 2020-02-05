import * as THREE from "three";
import MinuteSecondType from "../../types/MinuteSecondType";
import ColonText from "../component/ColonText";
import MinuteColumn from "./MinuteColumn";
import SecondColumn from "./SecondColumn";

class Timer {
  private scene: THREE.Scene;
  private nowMinute: MinuteSecondType;
  private nowSecond: MinuteSecondType;
  private minuteColumn: MinuteColumn;
  private secondColumn: SecondColumn;
  constructor(
    scene: THREE.Scene,
    minute: MinuteSecondType,
    second: MinuteSecondType
  ) {
    this.scene = scene;
    this.nowMinute = minute;
    this.nowSecond = second;
    const colonText = new ColonText();
    const minuteColumn = new MinuteColumn();
    const secondColumn = new SecondColumn();
    this.scene.add(colonText);
    minuteColumn.init(this.scene, this.nowMinute);
    secondColumn.init(this.scene, this.nowSecond);
    this.minuteColumn = minuteColumn;
    this.secondColumn = secondColumn;
  }

  private _startCount() {
    this.minuteColumn._startCount();
    this.secondColumn._startCount();
  }

  public tick() {
    this.minuteColumn.tick();
    this.secondColumn.tick();
  }
}

export default Timer;

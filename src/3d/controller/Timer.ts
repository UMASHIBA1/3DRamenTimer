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
    this.scene.add(colonText);
    const minuteColumn = new MinuteColumn();
    minuteColumn.init(this.scene, this.nowMinute);
    this.minuteColumn = minuteColumn;
    const secondColumn = new SecondColumn();
    secondColumn.init(this.scene, this.nowSecond);
    this.secondColumn = secondColumn;
    setInterval(() => {
      this.minuteColumn.upOneMinute();
    }, 60000);
    setInterval(() => {
      this.secondColumn.upOneSecond();
    }, 1000);
  }

  public tick() {
    this.minuteColumn.tick();
    this.secondColumn.tick();
  }
}

export default Timer;

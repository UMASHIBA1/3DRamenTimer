import * as THREE from "three";
import MinuteColumn from "../component/MinuteText";
import MinuteSecondType from "../../types/MinuteSecondType";
import SecondColumn from "../component/SecondText";
import ColonText from "../component/ColonText";

class Timer {
  private scene: THREE.Scene;
  private nowMinute: MinuteSecondType;
  private nowSecond: MinuteSecondType;
  private minuteObjs: MinuteColumn[];
  private secondObjs: SecondColumn[];
  constructor(
    scene: THREE.Scene,
    minute: MinuteSecondType,
    second: MinuteSecondType
  ) {
    this.scene = scene;
    this.nowMinute = minute;
    this.nowSecond = second;
    this.minuteObjs = [];
    this.secondObjs = [];
    const performanceNowSecond = performance.now();
    for (let i = 0; i < 60; i++) {
      const minuteText = new MinuteColumn(
        i as MinuteSecondType,
        this.nowMinute
      );
      const colonText = new ColonText();
      const secondText = new SecondColumn(
        i as MinuteSecondType,
        this.nowSecond,
        performanceNowSecond
      );
      this.minuteObjs.push(minuteText);
      this.secondObjs.push(secondText);
      this.scene.add(minuteText);
      this.scene.add(colonText);
      this.scene.add(secondText);
    }
  }

  upOneSecond() {}

  upOneMinute() {}

  public tick() {
    const nowSecond = performance.now();
    for (let secondObj of this.secondObjs) {
      secondObj.tick(nowSecond);
    }
  }
}

export default Timer;

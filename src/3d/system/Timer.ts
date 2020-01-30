import * as THREE from "three";
import MinuteColumn from "../component/MinuteColumn";
import MinuteSecondType from "../../types/MinuteSecondType";
import SecondColumn from "../component/SecondColumn";
import ColonText from "../component/ColonText";

class Timer {
  private scene: THREE.Scene;
  private nowMinute: MinuteSecondType;
  private nowSecond: MinuteSecondType;
  constructor(
    scene: THREE.Scene,
    minute: MinuteSecondType,
    second: MinuteSecondType
  ) {
    this.scene = scene;
    this.nowMinute = minute;
    this.nowSecond = second;
    for (let i = 0; i < 60; i++) {
      const minuteText = new MinuteColumn(
        i as MinuteSecondType,
        this.nowMinute
      );
      const colonText = new ColonText();
      const secondText = new SecondColumn(
        i as MinuteSecondType,
        this.nowSecond
      );
      this.scene.add(minuteText);
      this.scene.add(colonText);
      this.scene.add(secondText);
    }
  }

  upOneSecond() {}

  upOneMinute() {}
}

export default Timer;

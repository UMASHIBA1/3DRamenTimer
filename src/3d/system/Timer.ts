import * as THREE from "three";
import MinuteColumn from "../component/MinuteColumn";
import MinuteSecondType from "../../types/MinuteSecondType";

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
      const timerText = new MinuteColumn(i as MinuteSecondType, this.nowMinute);
      this.scene.add(timerText);
    }
  }

  upOneSecond() {}

  upOneMinute() {}
}

export default Timer;

import * as THREE from "three";
import MinuteText from "../component/MinuteText";
import MinuteSecondType from "../../types/MinuteSecondType";
import easing from "../system/easing";

class MinuteColumn {
  private group: THREE.Group;
  private scene: THREE.Scene | null;
  private nowMinute: MinuteSecondType | null;
  private startMinute: MinuteSecondType | null;
  private minuteObjs: MinuteText[];
  private rotationFlag: boolean;
  constructor() {
    this.group = new THREE.Group();
    this.scene = null;
    this.nowMinute = null;
    this.startMinute = null;
    this.minuteObjs = [];
    this.rotationFlag = false;
  }

  private upOneMinute() {
    if (this.nowMinute != null) {
      this.rotationFlag = true;
      this.nowMinute++;
    } else {
      console.log("MinuteColumnのnowMinuteが設定されていません。");
    }
  }

  public init(scene: THREE.Scene, nowMinute: MinuteSecondType) {
    this.scene = scene;
    this.nowMinute = nowMinute;
    this.startMinute = nowMinute;
    for (let i = 0; i < 60; i++) {
      const minuteText = new MinuteText(i as MinuteSecondType, this.nowMinute);
      this.minuteObjs.push(minuteText);
      this.group.add(minuteText);
    }
    this.scene.add(this.group);
    this.startSetTime();
  }

  public startCount() {
    setInterval(() => {
      this.upOneMinute();
    }, 60000);
    this.upOneMinute();
  }

  public startSetTime() {
    window.addEventListener("wheel", e => {
      if (e.deltaY < 0) {
        this.upOneMinute();
      } else {
        // this.downOneMinute();
      }
    });
  }

  public tick() {
    if (
      this.rotationFlag &&
      this.nowMinute != null &&
      this.startMinute != null
    ) {
      this.group.rotation.x += easing(
        this.group.rotation.x,
        (this.nowMinute - this.startMinute) * ((2 * Math.PI) / 60)
      );
      if (
        (this.nowMinute - this.startMinute) * 6 - this.group.rotation.x <
        0.01
      ) {
        this.rotationFlag = false;
      }
    }
  }
}

export default MinuteColumn;

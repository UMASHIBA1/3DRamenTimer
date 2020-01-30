import * as THREE from "three";
import MinuteText from "../component/MinuteText";
import MinuteSecondType from "../../types/MinuteSecondType";

class MinuteColumn {
  private group: THREE.Group;
  private scene: THREE.Scene | null;
  private nowMinute: MinuteSecondType | null;
  private minuteObjs: MinuteText[];
  constructor() {
    this.group = new THREE.Group();
    this.scene = null;
    this.nowMinute = null;
    this.minuteObjs = [];
  }

  init(scene: THREE.Scene, nowMinute: MinuteSecondType) {
    this.scene = scene;
    this.nowMinute = nowMinute;
    for (let i = 0; i < 60; i++) {
      const minuteText = new MinuteText(i as MinuteSecondType, this.nowMinute);
      this.minuteObjs.push(minuteText);
      this.group.add(minuteText);
    }
    this.scene.add(this.group);
  }

  tick() {
    this.group.rotation.x += 0.001;
  }
}

export default MinuteColumn;

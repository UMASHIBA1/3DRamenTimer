import * as THREE from "three";
import MinuteSecondType from "../../types/MinuteSecondType";
import SecondText from "../component/SecondText";

class SecondColumn {
  private group: THREE.Group;
  private scene: THREE.Scene | null;
  private nowMinute: MinuteSecondType | null;
  private secondObjs: SecondText[];
  constructor() {
    this.group = new THREE.Group();
    this.scene = null;
    this.nowMinute = null;
    this.secondObjs = [];
  }

  init(scene: THREE.Scene, nowSecond: MinuteSecondType) {
    this.scene = scene;
    this.nowMinute = nowSecond;
    for (let i = 0; i < 60; i++) {
      const secondText = new SecondText(i as MinuteSecondType, this.nowMinute);
      this.secondObjs.push(secondText);
      this.group.add(secondText);
    }
    this.scene.add(this.group);
  }

  tick() {
    this.group.rotation.x += 0.001;
  }
}

export default SecondColumn;

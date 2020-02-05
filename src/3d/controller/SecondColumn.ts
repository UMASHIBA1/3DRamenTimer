import * as THREE from "three";
import MinuteSecondType from "../../types/MinuteSecondType";
import SecondText from "../component/SecondText";
import easing from "../system/easing";

class SecondColumn {
  private group: THREE.Group;
  private scene: THREE.Scene | null;
  private nowSecond: MinuteSecondType | null;
  private startSecond: MinuteSecondType | null;
  private secondObjs: SecondText[];
  private rotationFlag: boolean;
  constructor() {
    this.group = new THREE.Group();
    this.scene = null;
    this.nowSecond = null;
    this.startSecond = null;
    this.secondObjs = [];
    this.rotationFlag = false;
  }

  public init(scene: THREE.Scene, nowSecond: MinuteSecondType) {
    this.scene = scene;
    this.nowSecond = nowSecond;
    this.startSecond = nowSecond;
    for (let i = 0; i < 60; i++) {
      const secondText = new SecondText(i as MinuteSecondType, this.nowSecond);
      this.secondObjs.push(secondText);
      this.group.add(secondText);
    }
    this.scene.add(this.group);
  }

  public _startCount() {
    setInterval(() => {
      this.upOneSecond();
    }, 1000);
    this.upOneSecond();
  }

  private upOneSecond() {
    if (this.nowSecond != null) {
      this.rotationFlag = true;
      this.nowSecond++;
    } else {
      console.log("SecondColumnのnowSecondが設定されていません。");
    }
  }

  public tick() {
    if (
      this.rotationFlag &&
      this.nowSecond != null &&
      this.startSecond != null
    ) {
      this.group.rotation.x += easing(
        this.group.rotation.x,
        (this.nowSecond - this.startSecond) * ((2 * Math.PI) / 60)
      );
      if (
        (this.nowSecond - this.startSecond) * 6 - this.group.rotation.x <
        0.01
      ) {
        this.rotationFlag = false;
      }
    }
  }
}

export default SecondColumn;

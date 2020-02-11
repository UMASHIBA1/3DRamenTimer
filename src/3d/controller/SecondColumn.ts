import * as THREE from "three";
import MinuteSecondType from "../../types/MinuteSecondType";
import SecondText from "../component/SecondText";
import easing from "../system/easing";
import Canvas from "../../Canvas";
import RotationSetting from "../../types/RotationSetting";

class SecondColumn {
  private group: THREE.Group;
  private canvas: Canvas | null;
  private scene: THREE.Scene | null;
  private nowSecond: MinuteSecondType | null;
  private startSecond: MinuteSecondType | null;
  private secondObjs: SecondText[];
  private rotationSetting: RotationSetting;
  constructor() {
    this.group = new THREE.Group();
    this.canvas = null;
    this.scene = null;
    this.nowSecond = null;
    this.startSecond = null;
    this.secondObjs = [];
    this.rotationSetting = {
      rotationFlag: false,
      direction: ""
    };
  }

  private _increaseOneSecond() {
    if (this.nowSecond != null) {
      this.rotationSetting = {
        rotationFlag: true,
        direction: "down"
      };
      this.nowSecond++;
    } else {
      console.log("SecondColumnのnowSecondが設定されていません。");
    }
  }

  private _decreaseOneSecond() {
    if (this.nowSecond != null) {
      this.rotationSetting = {
        rotationFlag: true,
        direction: "up"
      };
      this.nowSecond--;
    } else {
      console.log("MinuteColumnのnowSecondが設定されていません。");
    }
  }

  public init(canvas: Canvas, scene: THREE.Scene, nowSecond: MinuteSecondType) {
    this.scene = scene;
    this.canvas = canvas;
    this.nowSecond = nowSecond;
    this.startSecond = nowSecond;
    for (let i = 0; i < 60; i++) {
      const secondText = new SecondText(i as MinuteSecondType, this.nowSecond);
      this.secondObjs.push(secondText);
      this.group.add(secondText);
    }
    this.scene.add(this.group);
    this.startSetTime();
  }

  public startCount() {
    setInterval(() => {
      this._decreaseOneSecond();
    }, 1000);
    this._decreaseOneSecond();
  }

  public startSetTime() {
    window.addEventListener("wheel", e => {
      console.log("canvasPositionX", (this.canvas as Canvas).positionX);
      if (
        this.canvas !== null &&
        this.canvas.positionX < 200 &&
        this.canvas.positionX > 32
      )
        if (e.deltaY < 0) {
          this._decreaseOneSecond();
        } else {
          this._increaseOneSecond();
        }
    });
  }

  public tick() {
    console.log("nowSecond: ", this.nowSecond);
    if (
      this.rotationSetting.rotationFlag &&
      this.nowSecond != null &&
      this.startSecond != null
    ) {
      const targetLocation =
        (this.startSecond - this.nowSecond) * ((2 * Math.PI) / 60);

      if (this.rotationSetting.direction === "up") {
        this.group.rotation.x += easing(this.group.rotation.x, targetLocation);
        if (targetLocation - this.group.rotation.x < 0.0001) {
          this.rotationSetting = {
            rotationFlag: false,
            direction: ""
          };
        }
      } else if (this.rotationSetting.direction === "down") {
        this.group.rotation.x += easing(this.group.rotation.x, targetLocation);
        if (this.group.rotation.x - targetLocation < 0.0001) {
          this.rotationSetting = {
            rotationFlag: false,
            direction: ""
          };
        }
      } else {
        this.rotationSetting.rotationFlag = false;
      }
    }
  }
}

export default SecondColumn;

import * as THREE from "three";
import MinuteText from "../component/MinuteText";
import MinuteSecondType from "../../types/MinuteSecondType";
import easing from "../system/easing";
import Canvas from "../../Canvas";
import RotationSetting from "../../types/RotationSetting";
import {
  calcPositionXFromCenter,
  calcPositionYFromCenter
} from "../system/calcPositionFromCenter";

class MinuteColumn {
  private _group: THREE.Group;
  private _canvas: Canvas | null;
  private _scene: THREE.Scene | null;
  private _nowMinute: MinuteSecondType | null;
  private _startMinute: MinuteSecondType | null;
  private _minuteObjs: MinuteText[];
  private _rotationSetting: RotationSetting;
  private _startCountIntervalID: NodeJS.Timeout | null;
  private _startCountTimeoutID: NodeJS.Timeout | null;
  private _setTimeFunc: (e: WheelEvent) => void;
  private _setTimeFuncMobile: (e: TouchEvent) => void;
  constructor() {
    this._group = new THREE.Group();
    this._canvas = null;
    this._scene = null;
    this._nowMinute = null;
    this._startMinute = null;
    this._minuteObjs = [];
    this._rotationSetting = { rotationFlag: false, direction: "" };
    this._startCountIntervalID = null;
    this._startCountTimeoutID = null;

    this._setTimeFunc = (e: WheelEvent) => {
      if (
        this._canvas !== null &&
        this._canvas.positionX < -12 &&
        this._canvas.positionX > -160
      )
        if (e.deltaY < 0) {
          this._decreaseOneMinute();
        } else {
          this._increaseOneMinute();
        }
    };

    this._setTimeFuncMobile = (e: TouchEvent) => {
      const x = calcPositionXFromCenter(e.touches[0].clientX);
      let previousY = calcPositionYFromCenter(e.touches[0].clientY);

      const _judgeRotate = (e: TouchEvent) => {
        const nowY = calcPositionYFromCenter(e.touches[0].clientY);
        if (nowY - previousY > 30) {
          this._decreaseOneMinute();
          previousY = nowY;
        } else if (previousY - nowY > 30) {
          this._increaseOneMinute();
          previousY = nowY;
        }
      };

      const _disableJudgeRotate = () => {
        window.removeEventListener("touchmove", _judgeRotate);
        window.removeEventListener("touchend", _disableJudgeRotate);
      };

      if (x < -12 && x > -160) {
        window.addEventListener("touchmove", _judgeRotate);
        window.addEventListener("touchend", _disableJudgeRotate);
      }
    };
  }

  private _increaseOneMinute() {
    if (this._nowMinute != null) {
      this._rotationSetting = {
        rotationFlag: true,
        direction: "down"
      };
      this._nowMinute++;
    } else {
      console.log("MinuteColumnのnowMinuteが設定されていません。");
    }
  }

  private _decreaseOneMinute() {
    if (this._nowMinute != null) {
      this._rotationSetting = {
        rotationFlag: true,
        direction: "up"
      };
      this._nowMinute--;
    } else {
      console.log("MinuteColumnのnowMinuteが設定されていません。");
    }
  }

  public init(canvas: Canvas, scene: THREE.Scene, nowMinute: MinuteSecondType) {
    this._scene = scene;
    this._canvas = canvas;
    this._nowMinute = nowMinute;
    this._startMinute = nowMinute;
    for (let i = 0; i < 60; i++) {
      const minuteText = new MinuteText(i as MinuteSecondType, this._nowMinute);
      this._minuteObjs.push(minuteText);
      this._group.add(minuteText);
    }
    this._scene.add(this._group);
    this._startSetTime();
  }

  public startCount(firstSecond: MinuteSecondType) {
    this._stopSetTime();
    this._startCountTimeoutID = setTimeout(() => {
      if (this.nowMinute !== 0) {
        this._decreaseOneMinute();
        this._startCountIntervalID = setInterval(() => {
          this._decreaseOneMinute();
        }, 60000);
      }
    }, (firstSecond + 1) * 1000);
  }

  public stopCount() {
    if (this._startCountTimeoutID !== null) {
      clearTimeout(this._startCountTimeoutID);
    } else {
      console.log("Minuteを一分減らすTimeoutIDが見つかりません");
    }
    if (this._startCountIntervalID !== null) {
      clearInterval(this._startCountIntervalID);
    } else {
      console.log("Minuteを刻んでいるIntervalIDが見つかりません");
    }
    this._startSetTime();
  }

  private _startSetTime() {
    window.addEventListener("wheel", this._setTimeFunc);
    window.addEventListener("touchstart", this._setTimeFuncMobile);
  }

  private _stopSetTime() {
    window.removeEventListener("wheel", this._setTimeFunc);
    window.removeEventListener("touchstart", this._setTimeFuncMobile);
  }

  public get nowMinute(): MinuteSecondType {
    if (this._nowMinute !== null) {
      const tmpMinute = this._nowMinute % 60;
      if (tmpMinute < 0) {
        return (60 + tmpMinute) as MinuteSecondType;
      }
      return tmpMinute as MinuteSecondType;
    } else {
      console.log("MinuteColumnで_nowMinuteが設定されていません");
      return 0;
    }
  }

  public tick() {
    if (
      this._rotationSetting.rotationFlag &&
      this._nowMinute != null &&
      this._startMinute != null
    ) {
      const targetLocation =
        (this._startMinute - this._nowMinute) * ((2 * Math.PI) / 60);

      if (this._rotationSetting.direction === "up") {
        this._group.rotation.x += easing(
          this._group.rotation.x,
          targetLocation
        );
        if (targetLocation - this._group.rotation.x < 0.0001) {
          this._rotationSetting = {
            rotationFlag: false,
            direction: ""
          };
        }
      } else if (this._rotationSetting.direction === "down") {
        this._group.rotation.x += easing(
          this._group.rotation.x,
          targetLocation
        );
        if (this._group.rotation.x - targetLocation < 0.0001) {
          this._rotationSetting = {
            rotationFlag: false,
            direction: ""
          };
        }
      } else {
        this._rotationSetting.rotationFlag = false;
      }
    }
  }
}

export default MinuteColumn;

import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import MinuteSecondType from "../../types/MinuteSecondType";
import calcTextLocation from "../system/calcTextLocation";

class SecondColumn extends THREE.Mesh {
  private nowSecond: number;
  private thisSecond: MinuteSecondType;
  private previousSecond: number;
  constructor(
    thisSecond: MinuteSecondType,
    nowSecond: MinuteSecondType,
    performanceNowSecond: number
  ) {
    const font = new THREE.Font(regularFont);
    const strSecond =
      thisSecond.toString().length === 1 ? `0${thisSecond}` : `${thisSecond}`;
    const geometry = new THREE.TextGeometry(strSecond, {
      font: font,
      size: 20,
      height: 5
    });
    const material = new THREE.MeshLambertMaterial();
    super(geometry, material);
    const { positionY, positionZ, rotationX } = calcTextLocation(
      thisSecond,
      nowSecond
    );
    this.position.x = 10;
    this.position.y = positionY;
    this.position.z = positionZ;
    this.rotation.x = rotationX;

    this.nowSecond = nowSecond;
    this.thisSecond = thisSecond;
    this.previousSecond = performanceNowSecond;
  }

  private _rotateSecondColumn(performanceNowSecond: number) {
    // 前回のrenderからの経過時間を計算
    const secDif = (performanceNowSecond - this.previousSecond) / 1000;
    if (this.nowSecond <= 0) {
      this.nowSecond = 59.999 - secDif;
    } else {
      this.nowSecond -= secDif;
    }
    const { positionY, positionZ, rotationX } = calcTextLocation(
      this.thisSecond,
      this.nowSecond
    );
    this.previousSecond = performanceNowSecond;
    this.position.y = positionY;
    this.position.z = positionZ;
    this.rotation.x = rotationX;
  }

  public tick(performanceNowSecond: number) {
    this._rotateSecondColumn(performanceNowSecond);
  }
}

export default SecondColumn;

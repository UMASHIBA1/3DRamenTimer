import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import MinuteSecondType from "../../types/MinuteSecondType";
import calcTextLocation from "../system/calcTextLocation";

class SecondColumn extends THREE.Mesh {
  constructor(second: MinuteSecondType, nowSecond: MinuteSecondType) {
    const font = new THREE.Font(regularFont);
    const strSecond =
      second.toString().length === 1 ? `0${second}` : `${second}`;
    const geometry = new THREE.TextGeometry(strSecond, {
      font: font,
      size: 20,
      height: 5
    });
    const material = new THREE.MeshLambertMaterial();
    super(geometry, material);
    const { positionY, positionZ, rotationX } = calcTextLocation(
      second,
      nowSecond
    );
    this.position.x = 10;
    this.position.y = positionY;
    this.position.z = positionZ;
    this.rotation.x = rotationX;
  }
}

export default SecondColumn;

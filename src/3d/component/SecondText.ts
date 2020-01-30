import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import MinuteSecondType from "../../types/MinuteSecondType";
import calcTextLocation from "../system/calcTextLocation";

class SecondText extends THREE.Mesh {
  constructor(thisSecond: MinuteSecondType, nowSecond: MinuteSecondType) {
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
  }
}

export default SecondText;

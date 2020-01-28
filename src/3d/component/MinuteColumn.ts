import * as THREE from "three";
import regularFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import MinuteSecondType from "../../types/MinuteSecondType";
import calcTextLocation from "../system/calcTextLocation";

class MinuteColumn extends THREE.Mesh {
  constructor(minute: MinuteSecondType, nowMinute: MinuteSecondType) {
    const font = new THREE.Font(regularFont);
    const strMinute =
      minute.toString().length === 1 ? `0${minute}` : `${minute}`;
    const geometry = new THREE.TextGeometry(strMinute, {
      font: font,
      size: 20,
      height: 5
    });
    const material = new THREE.MeshLambertMaterial();
    super(geometry, material);
    const { positionY, positionZ, rotationX } = calcTextLocation(
      minute,
      nowMinute
    );
    this.position.x = -34;
    this.position.y = positionY;
    this.position.z = positionZ;
    this.rotation.x = rotationX;
  }
}

export default MinuteColumn;

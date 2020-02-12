import * as THREE from "three";
import RingFragment from "./RingFragment";

type RotateDirectionType = "right" | "left";

class OneRing {
  private _group: THREE.Group;
  private _rotateDirection: RotateDirectionType;
  constructor(
    rotateDirection: RotateDirectionType,
    radius: number,
    tube?: number
  ) {
    this._group = new THREE.Group();
    this._rotateDirection = rotateDirection;
    for (let i = 0; i < 9; i++) {
      const ringFrag = new RingFragment(i, radius, tube);
      this._group.add(ringFrag);
    }
    this._group.rotation.z = Math.random();
  }

  public get ring() {
    return this._group;
  }

  public tick() {
    const rotateSpeed = 0.005;
    if (this._rotateDirection === "left") {
      this._group.rotation.z += rotateSpeed;
    } else {
      this._group.rotation.z -= rotateSpeed;
    }
  }
}

export default OneRing;

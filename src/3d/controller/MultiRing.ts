import * as THREE from "three";
import OneRing from "./OneRing";

class MultiRing {
  private _group: THREE.Group;
  private _oneRings: OneRing[];
  constructor(
    outlineRadius: number = 50,
    ringNum: number = 3,
    ringSizeDiff: number = 10,
    tube?: number
  ) {
    this._group = new THREE.Group();
    this._oneRings = [];

    for (
      let [count, nowRadius] = [0, outlineRadius];
      count < ringNum;
      count++, nowRadius -= ringSizeDiff
    ) {
      const rotateDirection = count % 2 ? "left" : "right";
      const ring = new OneRing(rotateDirection, nowRadius, tube);
      this._oneRings.push(ring);
    }

    for (let i of this._oneRings) {
      this._group.add(i.ring);
    }
  }

  public get multiRing() {
    return this._group;
  }

  public tick() {
    for (let i of this._oneRings) {
      i.tick();
    }
  }
}

export default MultiRing;

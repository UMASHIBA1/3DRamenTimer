import * as THREE from "three";
import OneRing from "./OneRing";

class MultiRing {
  private _group: THREE.Group;
  private _oneRings: OneRing[];
  constructor(
    outlineRadius: number = 50,
    ringNum: number = 3,
    ringSizeDiff: number = 10,
    tube?: number,
    arc?: number
  ) {
    this._group = new THREE.Group();
    this._oneRings = [];

    for (
      let [count, nowRadius] = [0, outlineRadius];
      count < ringNum;
      count++, nowRadius -= ringSizeDiff
    ) {
      const rotateDirection = count % 2 ? "left" : "right";
      const ring = new OneRing(rotateDirection, nowRadius, tube, arc);
      this._oneRings.push(ring);
    }

    for (let i of this._oneRings) {
      this._group.add(i.ring);
    }
  }

  public setPositionXY(x: number = 0, y: number = 0) {
    this._group.position.x = x;
    this._group.position.y = y;
  }

  public addToScene(scene: THREE.Scene) {
    scene.add(this._group);
  }

  public setScaleXY(x: number, y: number) {
    this._group.scale.x = x;
    this._group.scale.y = y;
  }

  public get scaleXY() {
    return { x: this._group.scale.x, y: this._group.scale.y };
  }

  public tick() {
    for (let i of this._oneRings) {
      i.tick();
    }
  }
}

export default MultiRing;

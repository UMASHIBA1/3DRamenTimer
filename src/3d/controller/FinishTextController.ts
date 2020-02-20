import * as THREE from "three";
import FinishText from "../component/FinishText";
import { risedLocation } from "../../settings/finishAnimation";
import easing from "../system/easing";

class FinishTextController {
  private _finishTexts: FinishText[];
  private _group: THREE.Group;
  private _isStartAnimation: boolean;
  constructor(scene: THREE.Scene) {
    this._finishTexts = [];
    this._group = new THREE.Group();

    const FText = new FinishText("F", -65);
    this._finishTexts.push(FText);
    const IText1 = new FinishText("I", -40);
    this._finishTexts.push(IText1);
    const NText = new FinishText("N", -20);
    this._finishTexts.push(NText);
    const IText2 = new FinishText("I", 12);
    this._finishTexts.push(IText2);
    const SText = new FinishText("S", 26);
    this._finishTexts.push(SText);
    const HText = new FinishText("H", 53);
    this._finishTexts.push(HText);

    for (let i of this._finishTexts) {
      this._group.add(i);
    }

    scene.add(this._group);
    this._group.position.x = 0;
    this._group.position.y = risedLocation - 8;
    this._group.position.z = 100;
    this._group.scale.x = 0;
    this._group.scale.y = 0;
    this._isStartAnimation = false;
  }

  public startAnimation() {
    this._isStartAnimation = true;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 600);
    });
  }

  public tick() {
    if (this._isStartAnimation) {
      this._group.scale.x += easing(this._group.scale.x, 1, 0.07);
      this._group.scale.y += easing(this._group.scale.y, 1, 0.07);
      if (1 - this._group.scale.x < 0.001 || 1 - this._group.scale.y < 0.001) {
        this._isStartAnimation = false;
      }
    }
  }
}

export default FinishTextController;

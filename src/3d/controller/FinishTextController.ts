import * as THREE from "three";
import FinishText from "../component/FinishText";
import { risedLocation } from "../../settings/finishAnimation";

class FinishTextController {
  private _finishTexts: FinishText[];
  private _group: THREE.Group;
  constructor(scene: THREE.Scene) {
    this._finishTexts = [];
    this._group = new THREE.Group();

    const FText = new FinishText("F", -50);
    this._finishTexts.push(FText);
    const IText1 = new FinishText("I", -25);
    this._finishTexts.push(IText1);
    const NText = new FinishText("N", -10);
    this._finishTexts.push(NText);
    const IText2 = new FinishText("I", 16);
    this._finishTexts.push(IText2);
    const SText = new FinishText("S", 30);
    this._finishTexts.push(SText);
    const HText = new FinishText("H", 52);
    this._finishTexts.push(HText);

    for (let i of this._finishTexts) {
      this._group.add(i);
    }

    scene.add(this._group);
    this._group.position.x = -10;
    this._group.position.y = risedLocation - 8;
    this._group.position.z = 360;
  }
}

export default FinishTextController;

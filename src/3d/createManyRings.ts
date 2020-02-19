import * as THREE from "three";
import MultiRing from "./controller/MultiRing";

export default (scene: THREE.Scene) => {
  const multiRings: MultiRing[] = [];
  const multiRing1 = new MultiRing(20, 3, 10, 4, 0.95);
  multiRing1.setPositionXY(160, 160);
  multiRings.push(multiRing1);

  const multiRing2 = new MultiRing(300, 10, 30, 10, 0.7);
  multiRing2.setPositionXY(340, -220);
  multiRings.push(multiRing2);

  const multiRing3 = new MultiRing(10, 2, 10, 4, 1.0);
  multiRing3.setPositionXY(-200, -160);
  multiRings.push(multiRing3);

  const multiRing4 = new MultiRing(100, 5, 19, 8, 0.7);
  multiRing4.setPositionXY(-300, 100);
  multiRings.push(multiRing4);

  const multiRing5 = new MultiRing(50, 4, 14, 6);
  multiRing5.setPositionXY(-60, -100);
  multiRings.push(multiRing5);

  const multiRing6 = new MultiRing(10, 2, 8, 3, 1.1);
  multiRing6.setPositionXY(-70, 100);
  multiRings.push(multiRing6);

  const multiRing7 = new MultiRing(0.5, 1, 0, 1, 20);
  multiRing7.setPositionXY(80, 120);
  multiRings.push(multiRing7);

  const multiRing8 = new MultiRing(26, 3, 13, 5, 0.8);
  multiRing8.setPositionXY(30, 60);
  multiRings.push(multiRing8);

  const multiRing9 = new MultiRing(1, 1, 0, 1, 20);
  multiRing9.setPositionXY(-170, -80);
  multiRings.push(multiRing9);

  for (let i of multiRings) {
    i.addToScene(scene);
  }

  return multiRings;
};

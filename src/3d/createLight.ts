import * as THREE from "three";

export default () => {
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  return light;
};

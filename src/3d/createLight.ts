import * as THREE from "three";

export default () => {
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 1, 1);
  return light;
};

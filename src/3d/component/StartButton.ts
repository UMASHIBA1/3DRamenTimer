import * as THREE from "three";
import startImg from "../../statics/start-button.png";

class StartButton extends THREE.Mesh {
  private _camera: THREE.Camera;
  private _mouse: THREE.Vector2;
  private _isClicked: boolean;
  private _raycaster: THREE.Raycaster;
  constructor(camera: THREE.Camera, scene: THREE.Scene) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(startImg);
    const geometry = new THREE.CylinderGeometry(3.4, 3.4, 0.6, 50, 50);
    // const material = new THREE.MeshToonMaterial();
    const material = new THREE.MeshToonMaterial({
      map: texture
    });
    super(geometry, material);
    this.position.z = 450;
    // this.position.x = 12;
    this.position.y = -16;
    this.rotation.x = 0.5 * Math.PI;
    this.rotation.y = 0.5 * Math.PI;
    this._camera = camera;
    this._mouse = new THREE.Vector2();
    this._isClicked = false;
    this._raycaster = new THREE.Raycaster(
      this._camera.position,
      new THREE.Vector3(0, 0, 1)
    );
    this._judgeIntersect();
  }

  private _judgeIntersect() {
    window.addEventListener("click", e => {
      const x = e.clientX;
      const y = e.clientY;
      const width = window.innerWidth;
      const height = window.innerHeight;
      this._mouse.x = (x / width) * 2 - 1;
      this._mouse.y = -(y / height) * 2 + 1;
      this._isClicked = true;
    });
  }

  public tick() {
    this._raycaster.setFromCamera(this._mouse, this._camera);
    if (this._isClicked) {
      const intersect = this._raycaster.intersectObject(this);
      if (intersect.length > 0) {
        // 処理
        console.log("clickStart");
      }
    }
    this._isClicked = false;
  }
}

export default StartButton;

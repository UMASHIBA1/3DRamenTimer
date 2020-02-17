import * as THREE from "three";
import startImg from "../../statics/start-button.png";

class StartButton extends THREE.Mesh {
  private _camera: THREE.Camera;
  private _mouse: THREE.Vector2;
  private _isPushStart: boolean;
  private _isWaitPushEnd: boolean;
  private _isPushEnd: boolean;
  private _raycaster: THREE.Raycaster;
  constructor(camera: THREE.Camera) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(startImg);
    const geometry = new THREE.CylinderGeometry(3.4, 3.4, 0.6, 50, 50);
    // const material = new THREE.MeshToonMaterial();
    const material = new THREE.MeshToonMaterial({
      map: texture
    });
    super(geometry, material);
    this.position.z = 450;
    this.position.y = -16;
    this.rotation.x = 0.5 * Math.PI;
    this.rotation.y = 0.5 * Math.PI;
    this._camera = camera;
    this._mouse = new THREE.Vector2();
    this._isPushStart = false;
    this._isWaitPushEnd = false;
    this._isPushEnd = false;
    this._raycaster = new THREE.Raycaster();
    this._pushStart();
    this._pushEnd();
  }

  private _pushStart() {
    const _changePushState = (x: number, y: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this._mouse.x = (x / width) * 2 - 1;
      this._mouse.y = -(y / height) * 2 + 1;
      this._isPushStart = true;
    };

    window.addEventListener("mousedown", e => {
      const x = e.clientX;
      const y = e.clientY;
      _changePushState(x, y);
    });
    window.addEventListener("touchstart", e => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      _changePushState(x, y);
    });
  }

  private _pushEnd() {
    const _pushEndFunc = () => {
      if (this._isWaitPushEnd) {
        this._isPushEnd = true;
      }
    };

    window.addEventListener("mouseup", _pushEndFunc);
    window.addEventListener("touchend", _pushEndFunc);
  }

  public tick() {
    this._raycaster.setFromCamera(this._mouse, this._camera);
    if (this._isPushStart) {
      const intersect = this._raycaster.intersectObject(this);
      if (intersect.length > 0) {
        this.geometry.dispose();
        this.geometry = new THREE.CylinderGeometry(3.4, 3.4, 0.2, 50, 50);
        this._isPushStart = false;
        this._isWaitPushEnd = true;
      }
    }
    if (this._isPushEnd) {
      this.geometry.dispose();
      this.geometry = new THREE.CylinderGeometry(3.4, 3.4, 0.6, 50, 50);
      this._isPushEnd = false;
    }
  }
}

export default StartButton;

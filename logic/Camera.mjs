import Vector3f from "../math/Vector3f.mjs";
import Matrix3f from "../math/Matrix3f.mjs";

export default class Camera {
	constructor(){
		this.position = new Vector3f();
		this.viewDirection = new Matrix3f();
		this.speed = 0.5;
		this.rotationSpeed = 75;
		this._isPointerLocked = false;

		this._deltaX = 0;
		this._deltaY = 0;
	}

	/*requestPointerLock(element){
		this._pointerLockTarget = element;
		element.requestpointerLock();
		console.log(document.pointerLockElement);
		element.addEventListener("pointerlockchange",()=>{

		});
	}*/

	update(deltaTime,rx=0,ry=0){
		this.position.add(new Vector3f(0,0,this.speed*deltaTime).apply(this.viewDirection));
		this._deltaX += rx*this.rotationSpeed*deltaTime;
		this._deltaY += ry*this.rotationSpeed*deltaTime;
		let a = Math.pow(0.5,deltaTime);
		this.viewDirection.rotate(this._deltaY*(1-a),this._deltaX*(1-a),0);
		this._deltaX *= a;
		this._deltaY *= a;
	}
}
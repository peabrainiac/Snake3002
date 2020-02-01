import Snake from "./Snake.mjs";
import Vector3f from "../math/Vector3f.mjs";

export default class World {
	constructor(){
		this._lastFrame = Date.now();
		this._cameraPosition = new Vector3f();
	}

	start(){
		this._snake = new Snake(this._cameraPosition);
	}

	update(){
		let deltaTime = (Date.now()-this._lastFrame)/1000;
		this._lastFrame = Date.now();
		if (this._snake){
			this._snake.update(deltaTime);
		}else{
			this._cameraPosition.z += deltaTime*0.5;
		}
	}

	get snake(){
		return this._snake;
	}

	get cameraPosition(){
		return this._cameraPosition;
	}
}
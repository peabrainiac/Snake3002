import Snake from "./Snake.mjs";
import Food from "./Food.mjs";
import Vector3f from "../math/Vector3f.mjs";

export default class World {
	constructor(){
		this._lastFrame = Date.now();
		this._cameraPosition = new Vector3f();
	}

	start(){
		this._snake = new Snake(this._cameraPosition);
		this.placeFood();
		this.food.radius = -1;
	}

	update(){
		let deltaTime = (Date.now()-this._lastFrame)/1000;
		this._lastFrame = Date.now();
		if (this._snake){
			this._snake.update(deltaTime);
		}else{
			this._cameraPosition.z += deltaTime*0.5;
		}
		if (this._food){
			this._food.update(deltaTime);
		}
	}

	placeFood(){
		let position = new Vector3f(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5);
		this._food = new Food(position);
	}

	get snake(){
		return this._snake;
	}

	get cameraPosition(){
		return this._cameraPosition;
	}

	get food(){
		return this._food;
	}
}
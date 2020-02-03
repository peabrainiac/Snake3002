import Snake from "./Snake.mjs";
import Food from "./Food.mjs";
import Camera from "./Camera.mjs";
import Vector3f from "../math/Vector3f.mjs";

export default class World {
	constructor(){
		this._lastFrame = Date.now();
		this._camera = new Camera();
	}

	start(){
		this._snake = new Snake(this._camera);
		this.placeFood();
		this.food.radius = -1;
	}

	update(inputHandler){
		let deltaTime = (Date.now()-this._lastFrame)/1000;
		this._lastFrame = Date.now();
		if (this._snake){
			this._snake.update(deltaTime,inputHandler.keys.w,inputHandler.keys.a,inputHandler.keys.s,inputHandler.keys.d);
		}else{
			this._camera.update(deltaTime);
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

	get camera(){
		return this._camera;
	}

	get food(){
		return this._food;
	}
}
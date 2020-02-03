import Snake from "./Snake.mjs";
import Food from "./Food.mjs";
import Camera from "./Camera.mjs";
import Vector3f from "../math/Vector3f.mjs";

export default class World {
	constructor(){
		this._lastFrame = Date.now();
		this._camera = new Camera();
		this._gridWidth = 0.04;
	}

	start(){
		this._snake = new Snake(this._camera);
		this.placeFood();
		this.food.radius = -1;
	}

	update(inputHandler){
		let deltaTime = (Date.now()-this._lastFrame)/1000;
		this._lastFrame = Date.now();
		if (this._food){
			this._food.update(deltaTime);
		}
		if (this._snake){
			this._snake.update(deltaTime,inputHandler.keys.w,inputHandler.keys.a,inputHandler.keys.s,inputHandler.keys.d);
			if (this.distance(this._food.position,this._snake.headPosition)<this._snake.sphereRadius){
				this.placeFood();
				this._snake.addSphere();
			}
			if (this.gridDistance(this._snake.headPosition)<this._snake.sphereRadius*0.8||this.collidesSnakeWithSnake(this._snake,this._snake)){
				this._snake.isAlive = false;
			}
		}else{
			this._camera.update(deltaTime);
		}
	}

	placeFood(){
		let position = new Vector3f(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5);
		this._food = new Food(position);
	}

	distance(v1,v2){
		return v1.copy().subtract(v2).add(0.5).mod(1).subtract(0.5).length;
	}

	gridDistance(v){
		let x = Math.max(0,Math.abs(Math.abs(v.x)%1-0.5)-this._gridWidth/2);
		let y = Math.max(0,Math.abs(Math.abs(v.y)%1-0.5)-this._gridWidth/2);
		let z = Math.max(0,Math.abs(Math.abs(v.z)%1-0.5)-this._gridWidth/2);
		return Math.min(Math.sqrt(x*x+y*y),Math.min(Math.sqrt(y*y+z*z),Math.sqrt(z*z+x*x)));
	}

	collidesSnakeWithSnake(snake1,snake2){
		let collides = false;
		for (let i=(snake1==snake2?2:0);i<snake2.spherePositions.length;i++){
			if (this.distance(snake1.headPosition,snake2.spherePositions[i])<(snake1.sphereRadius+snake2.sphereRadius)*0.8){
				collides = true;
			}
		}
		return collides;
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
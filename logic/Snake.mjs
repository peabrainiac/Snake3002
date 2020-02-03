import Vector3f from "./Camera.mjs";

export default class Snake {
	constructor(camera=new Camera()){
		this.camera = camera;
		this.sphereRadius = -0.1;
		this.spherePositions = [];
		for (let i=0;i<5;i++){
			this.spherePositions.push(camera.position.copy());
		}
		this.isAlive = true;
	}

	update(deltaTime,keyUp,keyLeft,keyDown,keyRight){
		if (this.isAlive){
			let rotationX = (keyLeft?0:1)-(keyRight?0:1);
			let rotationY = (keyUp?0:1)-(keyDown?0:1);
			this.camera.update(deltaTime,rotationX,rotationY);
			this.sphereRadius += (0.05-this.sphereRadius)*(1-Math.pow(0.333,deltaTime));
			let minDistance = 2*Math.max(this.sphereRadius,0.01);
			this.spherePositions[0] = this.camera.position.copy();
			for (let i=1;i<this.spherePositions.length;i++){
				let delta = this.spherePositions[i-1].copy().subtract(this.spherePositions[i]);
				if (delta.length>minDistance){
					delta.length -= minDistance;
					this.spherePositions[i].add(delta);
				}
			}
		}
	}

	addSphere(){
		this.spherePositions.push(this.spherePositions[this.spherePositions.length-1].copy());
	}

	get headPosition(){
		return this.spherePositions[0];
	}
}
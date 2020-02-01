import Vector3f from "../math/Vector3f.mjs";

export default class Snake {
	constructor(startPosition=new Vector3f()){
		this.cameraPosition = startPosition;
		this.sphereRadius = -0.1;
		this.spherePositions = [];
		for (let i=0;i<5;i++){
			this.spherePositions.push(startPosition.copy());
		}
	}

	update(deltaTime){
		this.cameraPosition.z += deltaTime*0.5;
		this.sphereRadius += (0.05-this.sphereRadius)*(1-Math.pow(0.333,deltaTime));
		let minDistance = 2*Math.max(this.sphereRadius,0.01);
		this.spherePositions[0] = this.cameraPosition.copy();
		for (let i=1;i<this.spherePositions.length;i++){
			let delta = this.spherePositions[i-1].copy().subtract(this.spherePositions[i]);
			if (delta.length>minDistance){
				delta.length -= minDistance;
				this.spherePositions[i].add(delta);
			}
		}
	}
}
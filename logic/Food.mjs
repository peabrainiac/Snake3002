import Vector3f from "../math/Vector3f.mjs";
import Matrix3f from "../math/Matrix3f.mjs";

export default class Food {
	constructor(position=new Vector3f()){
		this.radius = -0.05;
		this.position = position;
		this.rotation = new Matrix3f();
	}

	update(deltaTime){
		this.radius += (0.025-this.radius)*(1-Math.pow(0.111,deltaTime))
	}
}
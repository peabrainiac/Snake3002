import Vector3f from "../math/Vector3f.mjs";
import Matrix3f from "../math/Matrix3f.mjs";

export default class Food {
	constructor(position=new Vector3f()){
		this.radius = -0.05;
		this.position = position;
		this.rotation = new Matrix3f();
		this.rotation.rotate(0,45,45);
	}

	update(deltaTime){
		this.radius += (0.025-this.radius)*(1-Math.pow(0.111,deltaTime))
		this.rotation.rotate(150*deltaTime,150*deltaTime,0);
	}
}
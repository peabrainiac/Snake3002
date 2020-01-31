import Vector3f from "./math/Vector3f.mjs";

export default class Snake {
	constructor(){
		this.cameraPosition = new Vector3f();
	}

	update(){
		this.cameraPosition.z += 0.01;
	}
}
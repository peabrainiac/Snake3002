export default class Matrix3f {
	constructor(){
		this.reset();
	}

	reset(){
		this.m00 = 1;
		this.m01 = 0;
		this.m02 = 0;
		this.m10 = 0;
		this.m11 = 1;
		this.m12 = 0;
		this.m20 = 0;
		this.m21 = 0;
		this.m22 = 1;
	}

	toArray(){
		return new Float32Array([this.m00,this.m01,this.m02,this.m10,this.m11,this.m12,this.m20,this.m21,this.m22]);
	}
}
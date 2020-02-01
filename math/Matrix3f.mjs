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
		return this;
	}

	setRotationMatrixX(rotation){
		this.m00 = 1;
		this.m01 = 0;
		this.m02 = 0;
		this.m10 = 0;
		this.m11 = Math.cos(rotation*Math.PI/180);
		this.m12 = Math.sin(rotation*Math.PI/180);
		this.m20 = 0;
		this.m21 = -Math.sin(rotation*Math.PI/180);
		this.m22 = Math.cos(rotation*Math.PI/180);
		return this;
	}

	setRotationMatrixY(rotation){
		this.m00 = Math.cos(rotation*Math.PI/180);
		this.m01 = 0;
		this.m02 = -Math.sin(rotation*Math.PI/180);
		this.m10 = 0;
		this.m11 = 1;
		this.m12 = 0;
		this.m20 = Math.sin(rotation*Math.PI/180);
		this.m21 = 0;
		this.m22 = Math.cos(rotation*Math.PI/180);
		return this;
	}

	setRotationMatrixZ(rotation){
		this.m00 = Math.cos(rotation*Math.PI/180);
		this.m01 = Math.sin(rotation*Math.PI/180);
		this.m02 = 0;
		this.m10 = -Math.sin(rotation*Math.PI/180);
		this.m11 = Math.cos(rotation*Math.PI/180);
		this.m12 = 0;
		this.m20 = 0;
		this.m21 = 0;
		this.m22 = 1;
		return this;
	}

	copy(){
		let matrix = new Matrix3f();
		matrix.m00 = this.m00;
		matrix.m01 = this.m01;
		matrix.m02 = this.m02;
		matrix.m10 = this.m10;
		matrix.m11 = this.m11;
		matrix.m12 = this.m12;
		matrix.m20 = this.m20;
		matrix.m21 = this.m21;
		matrix.m22 = this.m22;
		return matrix;
	}

	multiply(matrix){
		let old = this.copy();
		this.m00 = old.m00*matrix.m00+old.m10*matrix.m01+old.m20*matrix.m02;
		this.m10 = old.m00*matrix.m10+old.m10*matrix.m11+old.m20*matrix.m12;
		this.m20 = old.m00*matrix.m20+old.m10*matrix.m21+old.m20*matrix.m22;
		this.m01 = old.m01*matrix.m00+old.m11*matrix.m01+old.m21*matrix.m02;
		this.m11 = old.m01*matrix.m10+old.m11*matrix.m11+old.m21*matrix.m12;
		this.m21 = old.m01*matrix.m20+old.m11*matrix.m21+old.m21*matrix.m22;
		this.m02 = old.m02*matrix.m00+old.m12*matrix.m01+old.m22*matrix.m02;
		this.m12 = old.m02*matrix.m10+old.m12*matrix.m11+old.m22*matrix.m12;
		this.m22 = old.m02*matrix.m20+old.m12*matrix.m21+old.m22*matrix.m22;
		return this;
	}

	rotate(rx,ry,rz){
		this.multiply(new Matrix3f().setRotationMatrixX(rx));
		this.multiply(new Matrix3f().setRotationMatrixY(ry));
		this.multiply(new Matrix3f().setRotationMatrixZ(rz));
		return this;
	}

	toArray(){
		return new Float32Array([this.m00,this.m01,this.m02,this.m10,this.m11,this.m12,this.m20,this.m21,this.m22]);
	}
}
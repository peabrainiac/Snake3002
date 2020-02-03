export default class Vector3f {
	constructor(x=0,y=x,z=x){
		this.x = x;
		this.y = y;
		this.z = z;
	}

	scale(s){
		this.x *= s;
		this.y *= s;
		this.z *= s;
		return this;
	}

	copy(){
		return new Vector3f(this.x,this.y,this.z);
	}

	get length(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	}

	set length(l){
		this.scale(l/this.length);
	}

	add(v){
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	subtract(v){
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	apply(m){
		let v = this.copy();
		this.x = v.x*m.m00+v.y*m.m10+v.z*m.m20;
		this.y = v.x*m.m01+v.y*m.m11+v.z*m.m21;
		this.z = v.x*m.m02+v.y*m.m12+v.z*m.m22;
		return this;
	}
}
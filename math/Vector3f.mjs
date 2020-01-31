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
	}

	copy(){
		return new Vector3f(x,y,z);
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
	}
}
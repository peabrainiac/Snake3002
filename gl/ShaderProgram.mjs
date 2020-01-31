import Shader from "./Shader.mjs";

export default class ShaderProgram {
	constructor(gl,vertexSource,fragmentSource){
		this._gl = gl;
		this._vertexShader = new Shader(gl,gl.VERTEX_SHADER);
		this._fragmentShader = new Shader(gl,gl.FRAGMENT_SHADER);
		this._id = gl.createProgram();
		gl.attachShader(this._id,this._vertexShader.id);
		gl.attachShader(this._id,this._fragmentShader.id);
		this._isReady = false;
		if (vertexSource&&fragmentSource){
			this.compile(vertexSource,fragmentSource);
		}
	}

	compile(vertexSource,fragmentSource){
		this._vertexShader.compile(vertexSource);
		this._fragmentShader.compile(fragmentSource);
		this._gl.linkProgram(this._id);
		if (!this._gl.getProgramParameter(this._id,this._gl.LINK_STATUS)){
			this._isReady = false;
			throw new Error("Could not link shader program!\n"+this._gl.getProgramInfoLog(this._id));
		}else{
			this._isReady = true;
		}
		this._gl.useProgram(this._id);
		this._uniformLocations = {};
		this.loadAllUniforms();
	}

	get isReady(){
		return this._isReady;
	}

	loadAllUniforms(){

	}

	loadFloat(name,value){
		if (!this._uniformLocations[name]){
			this._uniformLocations[name] = this._gl.getUniformLocation(this._id,name);
		}
		this._gl.uniform1f(this._uniformLocations[name],value);
	}

	loadVector3f(name,vector){
		if (!this._uniformLocations[name]){
			this._uniformLocations[name] = this._gl.getUniformLocation(this._id,name);
		}
		this._gl.uniform3f(this._uniformLocations[name],vector.x,vector.y,vector.z);
	}

	loadMatrix3f(name,matrix){
		if (!this._uniformLocations[name]){
			this._uniformLocations[name] = this._gl.getUniformLocation(this._id,name);
		}
		this._gl.uniformMatrix3fv(this._uniformLocations[name],false,matrix.toArray());
	}
}
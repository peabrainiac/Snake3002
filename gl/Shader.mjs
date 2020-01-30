export default class Shader {
	constructor(gl,type,source){
		this._gl = gl;
		this._id = gl.createShader(type);
		gl.shaderSource(this._id,source);
		gl.compileShader(this._id);
		if (!gl.getShaderParameter(this._id,gl.COMPILE_STATUS)){
			throw new Error("Could not compile shader!\n"+gl.getShaderInfoLog(this._id));
		}
	}

	get id(){
		return this._id;
	}
}
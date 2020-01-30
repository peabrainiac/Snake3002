import Shader from "./Shader.mjs";

export default class ShaderProgram {
	constructor(gl,vertexSource,fragmentSource){
		this._gl = gl;
		this._vertexShader = new Shader(gl,gl.VERTEX_SHADER,vertexSource);
		this._fragmentShader = new Shader(gl,gl.FRAGMENT_SHADER,fragmentSource);
		this._id = gl.createProgram();
		gl.attachShader(this._id,this._vertexShader.id);
		gl.attachShader(this._id,this._fragmentShader.id);
		gl.linkProgram(this._id);
		if (!gl.getProgramParameter(this._id,gl.LINK_STATUS)){
			throw new Error("Could not link shader program!\n"+gl.getProgramInfoLog(this._id));
		}
		gl.useProgram(this._id);
	}
}
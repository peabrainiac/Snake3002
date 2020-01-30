import Vao from "./gl/Vao.mjs";
import ShaderProgram from "./gl/ShaderProgram.mjs";

export default class Snake3002Renderer {
	constructor(canvas){
		return (async ()=>{
			this.canvas = canvas;
			this.gl = canvas.getContext("webgl2");
			this._vao = new Vao(this.gl);
			this._vao.addVbo(0,2,[-0.5,-0.5,-0.5,0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,0.5,0.5]);//[-1,-1,-1,1,1,-1,1,-1,-1,1,1,1]
			this._shader = new ShaderProgram(this.gl,await (await fetch("./shader.vert")).text(),await (await fetch("./shader.frag")).text());
			return this;
		})();
	}

	render(){
		this._vao.bind();
		this.gl.drawArrays(this.gl.TRIANGLES,0,6);
	}

	destroy(){
		this._vao.destroy();
	}
}
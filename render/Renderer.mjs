import Vao from "../gl/Vao.mjs";
import RayMarcherShader from "./RayMarcherShader.mjs";

export default class Snake3002Renderer extends HTMLElement {
	constructor(){
		super();
		this._pixelSize = 3;
		(async ()=>{
			this.attachShadow({mode:"open"});
			this.shadowRoot.innerHTML = `
				<style>
					:host {
						display: block;
						overflow: hidden;
					}
					canvas {
						display: block;
						image-rendering: -moz-crisp-edges;
						image-rendering: crisp-edges;
						image-rendering: pixelated;
					}
				</style>
				<canvas></canvas>
			`;
			this.canvas = this.shadowRoot.querySelector("canvas");
			this.gl = this.canvas.getContext("webgl2");
			this._vao = new Vao(this.gl);
			this._vao.addVbo(0,2,[-1,-1,-1,1,1,-1,1,-1,-1,1,1,1]);
			this._shader = new RayMarcherShader(this.gl);
		})();
	}

	render(world){
		let width = this.offsetWidth/this._pixelSize;
		let height = this.offsetHeight/this._pixelSize;
		if (this.canvas.width!=width||this.canvas.height!=height){
			this.canvas.width = width;
			this.canvas.height = height;
			this.canvas.style.width = width*this._pixelSize+"px";
			this.canvas.style.height = height*this._pixelSize+"px";
		}
		this.gl.viewport(0,0,width,height);
		if (this._shader.isReady){
			this._shader.screenRatio = width/height;
			this._shader.loadCamera(world.camera);
			this._shader.loadSnake(world.snake);
			this._shader.loadFood(world.food);
			this._vao.bind();
			this.gl.drawArrays(this.gl.TRIANGLES,0,6);
		}
	}

	get pixelSize(){
		return this._pixelSize;
	}

	set pixelSize(pixelSize){
		this._pixelSize = pixelSize;
	}

	destroy(){
		this._vao.destroy();
	}
}
window.customElements.define("snake-3002-renderer",Snake3002Renderer);
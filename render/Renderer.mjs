import Vao from "../gl/Vao.mjs";
import RayMarcherShader from "./RayMarcherShader.mjs";

export default class Snake3002Renderer extends HTMLElement {
	constructor(){
		super();
		this._pixelSize = 4;
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

	render(world,w=this.offsetWidth/this._pixelSize,h=this.offsetHeight/this._pixelSize){
		let width = Math.round(w);
		let height = Math.round(h);
		if (this.canvas.width!=width||this.canvas.height!=height){
			console.log("changing canvas size!");
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
			if (width*height<1000*1000){
				this.gl.drawArrays(this.gl.TRIANGLES,0,6);
			}else{
				let n = Math.ceil(Math.sqrt(width*height)/250);
				console.log("Splitting rendering in chunks: "+n+"x"+n);
				for (let x=0;x<n;x++){
					for (let y=0;y<n;y++){
						let vao = new Vao(this.gl);
						let x1 = 2*x/n-1;
						let y1 = 2*y/n-1;
						let x2 = 2*(x+1)/n-1;
						let y2 = 2*(y+1)/n-1;
						vao.addVbo(0,2,[x1,y1,x1,y2,x2,y1,x2,y1,x1,y2,x2,y2]);
						vao.bind();
						this.gl.drawArrays(this.gl.TRIANGLES,0,6);
						vao.destroy();
					}
				}
			}
		}
	}

	async screenshot(world,w=this.offsetWidth,h=this.offsetHeight){
		this.render(world,w,h);
		return new Promise((resolve,reject)=>{
			this.canvas.toBlob(resolve);
		});
	}

	get pixelSize(){
		return this._pixelSize;
	}

	set pixelSize(pixelSize){
		this._pixelSize = pixelSize;
	}

	get caveEffect(){
		return this._shader.caveEffect;
	}

	set caveEffect(caveEffect){
		this._shader.caveEffect = caveEffect;
	}

	get acidEffect(){
		return this._shader.acidEffect;
	}

	set acidEffect(acidEffect){
		this._shader.acidEffect = acidEffect;
	}

	destroy(){
		this._vao.destroy();
	}
}
window.customElements.define("snake-3002-renderer",Snake3002Renderer);
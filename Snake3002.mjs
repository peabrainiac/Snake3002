import Snake3002Renderer from "./Renderer.mjs";

export default class Snake3002 extends HTMLElement {
	constructor(){
		super();
		(async ()=>{
			this.attachShadow({mode:"open"});
			this.shadowRoot.innerHTML = `
				<style>
					:host {
						display: block;
					}
					#canvas {
						display: block;
						width: 100%;
						height: 100%;
						image-rendering: -moz-crisp-edges;
						image-rendering: crisp-edges;
						image-rendering: pixelated;
					}
				</style>
				<canvas id="canvas"></canvas>
			`;
			this.renderer = await new Snake3002Renderer(this.shadowRoot.getElementById("canvas"));
			this.update();
		})();
	}

	update(){
		this.renderer.render();
		requestAnimationFrame(()=>{
			this.update();
		});
	}
}
window.customElements.define("snake-3002",Snake3002);
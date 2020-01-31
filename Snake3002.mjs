import "./Renderer.mjs";

export default class Snake3002 extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
				}
				snake-3002-renderer {
					width: 100%;
					height: 100%;
				}
			</style>
			<snake-3002-renderer></snake-3002-renderer>
		`;
		this.renderer = this.shadowRoot.querySelector("snake-3002-renderer");
		this.update();
	}

	update(){
		this.renderer.update();
		requestAnimationFrame(()=>{
			this.update();
		});
	}
}
window.customElements.define("snake-3002",Snake3002);
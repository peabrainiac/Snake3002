import "./render/Renderer.mjs";
import World from "./logic/World.mjs";
import InputHandler from "./gui/InputHandler.mjs";

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
		this.inputHandler = new InputHandler(this.renderer.canvas);
		this.world = new World();
		setTimeout(()=>{
			this.world.start();
		},3000);
		this.renderer.addEventListener("click",()=>{
			this.inputHandler.requestPointerLock();
		});
		this.update();
	}

	update(){
		this.world.update(this.inputHandler);
		this.renderer.render(this.world);
		requestAnimationFrame(()=>{
			this.update();
		});
	}
}
window.customElements.define("snake-3002",Snake3002);
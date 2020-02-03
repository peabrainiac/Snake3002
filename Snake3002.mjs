import "./render/Renderer.mjs";
import World from "./logic/World.mjs";
import InputHandler from "./gui/InputHandler.mjs";
import MainMenu from "./gui/MainMenu.mjs";

export default class Snake3002 extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
				}
				snake-3002-renderer, snake-3002-main-menu {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
			</style>
			<snake-3002-renderer></snake-3002-renderer>
			<snake-3002-main-menu></snake-3002-main-menu>
		`;
		this.renderer = this.shadowRoot.querySelector("snake-3002-renderer");
		this.inputHandler = new InputHandler(this.renderer.canvas);
		this.world = new World();
		this.mainMenu = this.shadowRoot.querySelector("snake-3002-main-menu");
		this.mainMenu.onGameStart(()=>{
			this.world.start();
			this.mainMenu.hide();
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
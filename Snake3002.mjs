import "./render/Renderer.mjs";
import World from "./logic/World.mjs";
import InputHandler from "./gui/InputHandler.mjs";
import "./gui/Gui.mjs";

export default class Snake3002 extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
				}
				snake-3002-renderer, snake-3002-gui {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
			</style>
			<snake-3002-renderer></snake-3002-renderer>
			<snake-3002-gui></snake-3002-gui>
		`;
		this.renderer = this.shadowRoot.querySelector("snake-3002-renderer");
		this.inputHandler = new InputHandler(this.renderer.canvas);
		this.world = new World();
		this.gui = this.shadowRoot.querySelector("snake-3002-gui");
		this.gui.onGameStart(()=>{
			this.inputHandler.requestPointerLock();
			this.world.start();
		},3000);
		this.inputHandler.onExitPointerLock(()=>{
			this.world.pause();
			if (!this.gui.isAnyMenuOpen()){
				this.gui.openPauseMenu();
			}
		});
		this.gui.onGameContinue(()=>{
			this.inputHandler.requestPointerLock();
			this.world.unpause();
		});
		this.gui.onGameReset(()=>{
			this.world.reset();
		});
		this.world.onGameEnd(()=>{
			this.inputHandler.exitPointerLock();
			this.gui.openDeathMenu();
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
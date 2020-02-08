import "./MainMenu.mjs";
import PauseMenu from "./PauseMenu.mjs";
import DeathMenu from "./DeathMenu.mjs";

export default class Snake3002Gui extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				.menu {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background: #00000040;
				}
				.button {
					display: block;
					position: relative;
					box-sizing: border-box;
					width: 200px;
					height: 70px;
					background: #00000040;
					border: 4px solid #ffffff60;
					color: #ffffff;
					font-size: 30px;
					margin: 10px;
				}
				.button::after {
					content: "";
					position: absolute;
					left: -4px;
					top: -4px;
					right: -4px;
					bottom: -4px;
					pointer-events: none;
					background: transparent;
				}
				.button:hover::after {
					background: #ffaf0040;
				}
			</style>
			<snake-3002-main-menu class="menu"></snake-3002-main-menu>
		`;
		this.mainMenu = this.shadowRoot.querySelector("snake-3002-main-menu");
		this.mainMenu.onGameStart(()=>{
			this.mainMenu.hide();
			this._onGameStart();
		});
		this.pauseMenu = new PauseMenu();
		this.pauseMenu.className = "menu";
		this.pauseMenu.onContinue(()=>{
			this.pauseMenu.hide();
			this._onGameContinue();
		});
		this.pauseMenu.onExit(()=>{
			this.pauseMenu.hide();
			this._onGameReset();
			this.mainMenu.show(this.shadowRoot);
		});
		this.deathMenu = new DeathMenu();
		this.deathMenu.className = "menu";
		this.deathMenu.onRetry(()=>{
			this.deathMenu.hide();
			this._onGameReset();
			this._onGameStart();
		});
		this.deathMenu.onExit(()=>{
			this.deathMenu.hide();
			this._onGameReset();
			this.mainMenu.show(this.shadowRoot);
		});
	}

	onGameStart(callback){
		this._onGameStart = callback;
	}

	onGameContinue(callback){
		this._onGameContinue = callback;
	}

	onGameReset(callback){
		this._onGameReset = callback;
	}

	openPauseMenu(){
		this.pauseMenu.show(this.shadowRoot);
	}

	openDeathMenu(){
		if (this.pauseMenu.parentNode){
			this.pauseMenu.hide();
		}
		this.deathMenu.show(this.shadowRoot);
	}

	isAnyMenuOpen(){
		return !!this.shadowRoot.querySelector(".menu");
	}

}
window.customElements.define("snake-3002-gui",Snake3002Gui);
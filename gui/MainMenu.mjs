export default class MainMenu extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
				}
				#buttons-container {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
				}
			</style>
			<div id="buttons-container">
				<slot></slot>
			</div>
		`;
		this.innerHTML = `
			<button id="start-button" class="button">Start</button>
			<button id="settings-button" class="button">Settings</button>
		`;
		this._startButton = this.querySelector("#start-button");
	}

	hide(){
		this.style.display = "none";
	}

	show(){
		this.style.removeProperty("display");
	}

	onGameStart(callback){
		this._startButton.addEventListener("click",callback);
	}
}
window.customElements.define("snake-3002-main-menu",MainMenu)
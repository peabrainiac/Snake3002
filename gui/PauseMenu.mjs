export default class PauseMenu extends HTMLElement {
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
			<button id="continue-button" class="button">Continue</button>
			<button id="settings-button" class="button">Settings</button>
			<button id="exit-button" class="button">Exit</button>
		`;
		this._continueButton = this.querySelector("#continue-button");
		this._exitButton = this.querySelector("#exit-button");
	}

	hide(){
		this.remove();
	}

	show(parent){
		parent.appendChild(this);
	}

	onContinue(callback){
		this._continueButton.addEventListener("click",callback);
	}

	onExit(callback){
		this._exitButton.addEventListener("click",callback);
	}
}
window.customElements.define("snake-3002-pause-menu",PauseMenu)
export default class DeathMenu extends HTMLElement {
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
			<button id="retry-button" class="button">Retry</button>
			<button id="settings-button" class="button">Settings</button>
			<button id="exit-button" class="button">Exit</button>
		`;
		this._retryButton = this.querySelector("#retry-button");
		this._exitButton = this.querySelector("#exit-button");
	}

	hide(){
		this.remove();
	}

	show(parent){
		parent.appendChild(this);
	}

	onRetry(callback){
		this._retryButton.addEventListener("click",callback);
	}

	onExit(callback){
		this._exitButton.addEventListener("click",callback);
	}

}
window.customElements.define("snake-3002-death-menu",DeathMenu);
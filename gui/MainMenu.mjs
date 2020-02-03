export default class MainMenu extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					background: #00000040;
				}
				:host.hidden {

				}
				#buttons-container {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
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
			<div id="buttons-container">
				<button id="start-button" class="button">Start</button>
				<button id="settings-button" class="button">Settings</button>
			</div>
		`;
		this._startButton = this.shadowRoot.querySelector("#start-button");
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
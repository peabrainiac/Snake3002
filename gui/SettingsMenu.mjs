export default class SettingsMenu extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
				}
				::slotted(#container){
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					padding: 20px;
				}
				
			</style>
			<slot></slot>
		`;
		this.innerHTML = `
			<div id="container" class="container">
				<button id="test-button" class="button">Button 1</button>
				<button id="test-button-2" class="button">Button 2</button>
				<button id="close-button" class="button">Close</button>
			</div>
		`;
		this._closeButton = this.querySelector("#close-button");
	}

	hide(){
		this.remove();
	}

	show(parent){
		parent.appendChild(this);
	}

	onClose(callback){
		this._closeButton.addEventListener("click",callback);
	}
}
window.customElements.define("snake-3002-settings-menu",SettingsMenu);
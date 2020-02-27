import "./ToggleButton.mjs";

export default class SettingsMenu extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
				}
				::slotted(#container) {
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
				<snake-3002-toggle-button id="cave-effect-button" class="button" style="width:250px">Cave Effect</snake-3002-toggle-button>
				<snake-3002-toggle-button id="acid-effect-button" class="button" style="width:250px">Acid Effect</snake-3002-toggle-button>
				<button id="close-button" class="button" style="width:250px">Close</button>
			</div>
		`;
		this._closeButton = this.querySelector("#close-button");
		this._caveEffectButton = this.querySelector("#cave-effect-button");
		this._caveEffectButton.addEventListener("click",()=>{
			this._onChange(this.settings);
		});
		this._acidEffectButton = this.querySelector("#acid-effect-button");
		this._acidEffectButton.addEventListener("click",()=>{
			this._onChange(this.settings);
		});
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

	onChange(callback){
		this._onChange = callback;
	}

	get settings(){
		let settings = {};
		settings.caveEffect = this._caveEffectButton.value;
		settings.acidEffect = this._acidEffectButton.value;
		return settings;
	}
}
window.customElements.define("snake-3002-settings-menu",SettingsMenu);
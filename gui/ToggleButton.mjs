export default class ToggleButton extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				:host(:not(.enabled)) #label-on, :host(.enabled) #label-off {
					display: none;
				}
			</style>
			<slot></slot>
			<span id="label-off">: Off</span>
			<span id="label-on">: On</span>
		`;
		this.className = "button";
		this.addEventListener("click",()=>{
			this.classList.toggle("enabled");
		});
	}

	get value(){
		return this.classList.contains("enabled");
	}
	
	set value(value){
		this.classList.toggle("enabled",value);
	}
}
window.customElements.define("snake-3002-toggle-button",ToggleButton);
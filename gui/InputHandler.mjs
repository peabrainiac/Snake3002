export default class InputHandler {
	constructor(targetElement){
		this.target = targetElement;
		this.target.tabIndex = -1;
		this.target.style.pointerEvents = "none";
		this.keys = {};
		this._hasPointerLock = false;
		document.addEventListener("keydown",(e)=>{
			if (this._hasPointerLock){
				this.keys.w = this.keys.w||e.key=="w"||e.key=="W";
				this.keys.a = this.keys.a||e.key=="a"||e.key=="A";
				this.keys.s = this.keys.s||e.key=="s"||e.key=="S";
				this.keys.d = this.keys.d||e.key=="d"||e.key=="D";
			}
		});
		document.addEventListener("keyup",(e)=>{
			this.keys.w = this.keys.w&&!(e.key=="w"||e.key=="W");
			this.keys.a = this.keys.a&&!(e.key=="a"||e.key=="A");
			this.keys.s = this.keys.s&&!(e.key=="s"||e.key=="S");
			this.keys.d = this.keys.d&&!(e.key=="d"||e.key=="D");
		});
		document.addEventListener("pointerlockchange",()=>{
			let element = document.pointerLockElement;
			while(element&&element.shadowRoot&&element.shadowRoot.pointerLockElement){
				element = element.shadowRoot.pointerLockElement;
			}
			if (element==this.target){
				this._hasPointerLock = true;
			}else{
				this._hasPointerLock = false;
				this.keys = {};
			}
		});
		this.target.addEventListener("mousedown",(e)=>{
			if (this._hasPointerLock&&e.button==2){
				this.exitPointerLock();
				document.addEventListener("contextmenu",(e)=>{
					e.preventDefault();
				},{once:true});
			}
		});
	}

	requestPointerLock(){
		this.target.requestPointerLock();
	}

	exitPointerLock(){
		document.exitPointerLock();
	}
}
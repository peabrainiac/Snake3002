import ShaderProgram from "./gl/ShaderProgram.mjs"
export default class RayMarcherShader extends ShaderProgram {
	constructor(gl){
		super(gl);
		this._screenRatio = 2;
		(async()=>{
			this.compile(await (await fetch("./shader.vert")).text(),await (await fetch("./shader.frag")).text());
		})();
	}
	
	loadAllUniforms(){
		this.loadFloat("screenRatio",this._screenRatio);
	}

	get screenRatio(){
		return this._screenRatio;
	}

	set screenRatio(screenRatio){
		this._screenRatio = screenRatio;
		this.loadFloat("screenRatio",this._screenRatio);
	}
}
import ShaderProgram from "./gl/ShaderProgram.mjs";
import Vector3f from "./math/Vector3f.mjs";
import Matrix3f from "./math/Matrix3f.mjs";

export default class RayMarcherShader extends ShaderProgram {
	constructor(gl){
		super(gl);
		this._screenRatio = 2;
		this._cameraPosition = new Vector3f();
		this._foodRotation = new Matrix3f();
		this._gridWidth = 0.04;
		(async()=>{
			this.compile(await (await fetch("./shader.vert")).text(),await (await fetch("./shader.frag")).text());
		})();
	}
	
	loadAllUniforms(){
		this.loadFloat("screenRatio",this._screenRatio);
		this.loadVector3f("cameraPosition",this._cameraPosition);
		this.loadMatrix3f("foodRotation",this._foodRotation);
		this.loadFloat("gridWidth",this._gridWidth);

		this.loadFloat("foodRadius",-0.05);
		this.loadFloat("snakeSphereRadius",-0.05);
		this.loadFloat("secondSnakeSphereRadius",-0.05);
		this.loadFloat("reflectivity",0.5);
	}

	get screenRatio(){
		return this._screenRatio;
	}

	set screenRatio(screenRatio){
		this._screenRatio = screenRatio;
		this.loadFloat("screenRatio",this._screenRatio);
	}

	get cameraPosition(){
		return this._cameraPosition;
	}

	set cameraPosition(cameraPosition){
		this._cameraPosition = cameraPosition;
		this.loadVector3f("cameraPosition",this._cameraPosition);
	}

	get gridWidth(){
		return this._gridWidth;
	}

	set gridWidth(gridWidth){
		this._gridWidth = gridWidth;
		this.loadFloat("gridWidth",this._gridWidth);
	}
}
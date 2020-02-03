import ShaderProgram from "../gl/ShaderProgram.mjs";
import Vector3f from "../math/Vector3f.mjs";
import Matrix3f from "../math/Matrix3f.mjs";

export default class RayMarcherShader extends ShaderProgram {
	constructor(gl){
		super(gl);
		(async()=>{
			this.compile(await (await fetch("./render/shader.vert")).text(),await (await fetch("./render/shader.frag")).text());
		})();
		this.uniforms.screenRatio = 2;
		this.uniforms.cameraPosition = new Vector3f();
		this.uniforms.viewDirection = new Matrix3f();
		this.uniforms.foodRotation = new Matrix3f();
		this.uniforms.gridWidth = 0.04;

		this.uniforms.foodRadius = -0.05;
		this.uniforms.snakeSphereRadius = -0.1;
		this.uniforms.snakeColor = new Vector3f(0.25,1,0);
		this.uniforms.secondSnakeSphereRadius = -0.1;
		this.uniforms.reflectivity = 0.5;
	}

	get screenRatio(){
		return this.uniforms.screenRatio;
	}

	set screenRatio(screenRatio){
		this.uniforms.screenRatio = screenRatio;
	}

	get cameraPosition(){
		return this.uniforms.cameraPosition;
	}

	set cameraPosition(cameraPosition){
		this.uniforms.cameraPosition = cameraPosition;
	}

	loadCamera(camera){
		this.uniforms.cameraPosition = camera.position;
		this.uniforms.viewDirection = camera.viewDirection;
	}

	loadSnake(snake){
		if (snake){
			this.uniforms.snakeSphereRadius = snake.sphereRadius;
			this.uniforms.snakeLength = snake.spherePositions.length;
			this.uniforms.snakePositions = snake.spherePositions;
		}else{
			this.uniforms.snakeSphereRadius = -0.1;
			this.uniforms.snakeLength = 0;
		}
	}

	loadFood(food){
		if(food){
			this.uniforms.foodPosition = food.position;
			this.uniforms.foodRadius = food.radius;
			this.uniforms.foodRotation = food.rotation;
		}else{
			this.uniforms.foodRadius = -1;
		}
	}
}
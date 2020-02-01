#version 300 es
precision highp float;

in vec2 position;

out vec3 pass_direction;

uniform float screenRatio;

void main(void){
	gl_Position = vec4(position,0,1);
	pass_direction = vec3(position.xy*sqrt(vec2(screenRatio,1.0/screenRatio)),1);
}
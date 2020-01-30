#version 300 es
precision highp float;

in vec2 position;

out vec2 pass_position;

void main(void){
	gl_Position = vec4(position,0,1);
	pass_position = position;
}
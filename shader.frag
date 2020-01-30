#version 300 es
precision highp float;

in vec2 pass_position;

out vec4 color;

void main(void){
	color = vec4(pass_position*0.5+vec2(0.5),1,1);
}
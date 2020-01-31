#version 300 es
precision highp float;

in vec3 pass_direction;

out vec4 color;

void main(void){
	vec2 p = (pass_direction.xy*0.5+vec2(0.5))*5.0;
	if (mod(floor(p.x)+floor(p.y),2.0)==1.0){
		color = vec4(vec3(0.5),1);
	}else{
		color = vec4(vec3(0.6),1);
	}
}
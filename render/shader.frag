#version 300 es
precision highp float;

in vec3 pass_direction;

out vec4 out_color;

vec4 trace(inout vec3 position, inout vec3 direction);
float distanceEstimation(vec3 p, out vec3 glowColor);
float gridDE(vec3 p);
float snakeDE(vec3 p);
float snake1DE(vec3 p);
float snake2DE(vec3 p);
float foodDE(vec3 p);
vec4 sceneNormal(vec3 p);
vec4 gridNormal(vec3 p);
vec4 snakeNormal(vec3 p);
vec4 foodNormal(vec3 p);
vec4 normalMin(vec4 n1, vec4 n2);
vec3 colorAt(vec3 p);
vec3 glowColorAt(vec3 p);

uniform vec3 cameraPosition;

uniform vec3[64] snakePositions;
uniform int snakeLength;
uniform float snakeSphereRadius;
uniform vec3 snakeColor;

uniform vec3[64] secondSnakePositions;
uniform int secondSnakeLength;
uniform float secondSnakeSphereRadius;
uniform vec3 secondSnakeColor;

uniform vec3 foodPosition;
uniform float foodRadius;
uniform mat3 foodRotation;

uniform float gridWidth;

#ifndef EFFECT_ACID
	const int maxSteps = 32;
	const vec3 gridColor = vec3(0.25);
#else
	const int maxSteps = 16;
	const vec3 gridColor = vec3(0);
#endif

const int maxReflections = 100;
uniform float reflectivity;

int isReflected = 0;

void main(void){
	
	vec3 position = cameraPosition;
	vec3 direction = normalize(pass_direction);
	
	vec4 color = vec4(0,0,0,1);
	for (int i=-1;i<maxReflections&&color.a>0.02;i++){
		vec4 shadeColor = trace(position,direction);
		vec4 solidColor = vec4(colorAt(position),1);
		solidColor.rgb *= max(0.0,dot(direction,normalize(sceneNormal(position).xyz)));
		if (i+1<maxReflections){
			solidColor *= 1.0-reflectivity;
		}
		solidColor.rgb += 2.0*glowColorAt(position);
		shadeColor += solidColor*(1.0-shadeColor.a);
		color = vec4(color.rgb+shadeColor.rgb*shadeColor.a*color.a,(1.0-shadeColor.a)*color.a);
		//isReflected = 1;
	}
	color.a = 1.0;
	out_color = color;
	
}

vec4 trace(inout vec3 position, inout vec3 direction){
	float totalDistance = 0.0;
	int steps;
	vec3 p;
	float distance;
	float prevDistance;
	vec3 shadeColor = vec3(0);
	vec3 currentGlowColor;
	for (steps=0;steps<maxSteps;steps++){
		p = position+totalDistance*direction;
		prevDistance = distance;
		distance = distanceEstimation(p,currentGlowColor);
		shadeColor += currentGlowColor;
		totalDistance += distance-0.00001;
		if (distance<0.001){
			break;
		}
	}
	position += (totalDistance-0.005)*direction;
	direction = reflect(direction,normalize(sceneNormal(position).xyz));
	#ifndef EFFECT_ACID
		float shade;
		float smoothSteps = float(steps);
		if (steps==maxSteps){
			shade = 1.0;
		}else{
			shade = smoothSteps/float(maxSteps);
			smoothSteps = float(steps)-(0.001-distance)/(prevDistance-distance);
		}
	#else
		float shade = 0.0;
		float smoothSteps = float(steps);
	#endif
	shadeColor -= currentGlowColor*(float(steps)-smoothSteps);
	shadeColor /= smoothSteps;
	return vec4(shadeColor,shade);
}

float distanceEstimation(vec3 p, out vec3 glowColor){
	vec3 distances = vec3(gridDE(p),snakeDE(p),foodDE(p));
	vec3 inverseDistances = 1.0/distances;
	glowColor = inverseDistances.z/(inverseDistances.x+inverseDistances.y+inverseDistances.z)*vec3(1,0.5,0);
	#ifdef EFFECT_CAVE
		float d = length(p-cameraPosition);
		return min(distances.x,min(distances.y,distances.z))-0.05*d*d*d*d;
	#else
		return min(distances.x,min(distances.y,distances.z));
	#endif
}

vec3 colorAt(vec3 p){
	vec4 distances = vec4(gridDE(p),snake1DE(p),snake2DE(p),foodDE(p));
	vec4 temp = 1.0/(distances+vec4(0.0001));
	temp = temp/(temp.r+temp.g+temp.b+temp.a);
	vec3 color = temp.r*gridColor+temp.g*snakeColor+temp.b*secondSnakeColor+temp.a*vec3(1,0.5,0);
	return sqrt(color);
}

vec3 glowColorAt(vec3 p){
	vec3 glowColor = vec3(0);
	float d = distanceEstimation(p,glowColor);
	return glowColor;
}

float gridDE(vec3 p){
	p = mod(p,1.0)-vec3(0.5);
	p = max(abs(p)-vec3(gridWidth*0.5),vec3(0));
	p = vec3(length(p.xy),length(p.yz),length(p.zx));
	return min(p.x,min(p.y,p.z));
}

float snakeDE(vec3 p){
	return min(snake1DE(p),snake2DE(p));
}

float snake1DE(vec3 p){
	float d = 100.0;
	d = max(min(d,length(mod(p-snakePositions[0]+vec3(0.5),1.0)-vec3(0.5))),snakeSphereRadius);
	if (isReflected==0){
		d = max(d-snakeSphereRadius,2.0*snakeSphereRadius+0.01-length(p-cameraPosition))+snakeSphereRadius;
	}
	for (int i=1;i<snakeLength;i++){
		d = min(d,length(mod(p-snakePositions[i]+vec3(0.5),1.0)-vec3(0.5)));
	}
	return d-snakeSphereRadius;
}

float snake2DE(vec3 p){
	float d = 100.0;
	for (int i=0;i<secondSnakeLength;i++){
		d = min(d,length(mod(p-secondSnakePositions[i]+vec3(0.5),1.0)-vec3(0.5)));
	}
	return d-snakeSphereRadius;
}

float foodDE(vec3 p){
	p = mod(p-foodPosition+vec3(0.5),1.0)-vec3(0.5);
	p *= foodRotation;
	return length(max(vec3(0),abs(p)-vec3(foodRadius)));
}

vec4 sceneNormal(vec3 p){
	return normalMin(gridNormal(p),normalMin(snakeNormal(p),foodNormal(p)));
}

vec4 gridNormal(vec3 p){
	p = mod(p,1.0)-vec3(0.5);
	p = sign(p)*max(abs(p)-vec3(gridWidth*0.5),vec3(0));
	return normalMin(vec4(p.xy,0,length(p.xy)),normalMin(vec4(0,p.yz,length(p.yz)),vec4(p.x,0,p.z,length(p.xz))));
}

vec4 snakeNormal(vec3 p){
	vec4 n = vec4(0,0,0,100);
	vec3 d = mod(p-snakePositions[0]+vec3(0.5),1.0)-vec3(0.5);
	n = normalMin(n,vec4(d,max(length(d),snakeSphereRadius)));
	if (isReflected==0){
		n.a = max(n.a-snakeSphereRadius,2.0*snakeSphereRadius+0.01-length(p-cameraPosition))+snakeSphereRadius;
	}
	for (int i=1;i<snakeLength;i++){
		d = mod(p-snakePositions[i]+vec3(0.5),1.0)-vec3(0.5);
		n = normalMin(n,vec4(d,length(d)));
	}
	for (int i=0;i<secondSnakeLength;i++){
		d = mod(p-secondSnakePositions[i]+vec3(0.5),1.0)-vec3(0.5);
		n = normalMin(n,vec4(d,length(d)));
	}
	n.a -= snakeSphereRadius;
	return n;
}

vec4 foodNormal(vec3 p){
	p = mod(p-foodPosition+vec3(0.5),1.0)-vec3(0.5);
	p *= foodRotation;
	p = sign(p)*max(vec3(0),abs(p)-vec3(foodRadius));
	p = p*inverse(foodRotation);
	return vec4(p,length(p));
}

vec4 normalMin(vec4 n1, vec4 n2){
	float temp = step(n1.a,n2.a);
	return n1*temp+n2*(1.0-temp);
}
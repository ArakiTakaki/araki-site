export interface GLSLFunctions {
    funcName: string;
    value: string;
    output: string;
    input: string[];
    dependencies?: GLSLFunctions[];
}
export const random = (): GLSLFunctions => ({
    funcName: 'random',
    output: 'float',
    input: ['vec2'],
    value: `
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}
`,
});

export const sigmoid = (): GLSLFunctions => ({
    funcName: 'sigmoid',
    output: 'float',
    input: ['float', 'float', 'float'],
    value: `
// sigmoid関数 0-1
float sigmoid(float a, float b, float x) {
    return 1.0 / (1.0 + exp(-(a * x + b)));
}
`
});

export const hsv2rgb = (): GLSLFunctions => ({
    funcName: 'hsv2rgb',
    output: 'vec3',
    input: ['vec3'],
    value: `
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`
});

export const celluarNoise = (pointNum: number): GLSLFunctions => ({
    funcName: 'cellular_noise',
    output: 'float',
    input: ['vec2', `vec2[${pointNum}]`],
    value: `
// ref https://thebookofshaders.com/12/?lan=jp
// preview https://glslfan.com/
// Author: @patriciogv
// Title: 4 cells DF

const int celluar_point_num = ${pointNum};
float cellular_noise(vec2 position, vec2[celluar_point_num] point) {
    float m_dist = 1.0;
    for (int i = 0; i < celluar_point_num; i++) {
        float dist = distance(position, point[i]);
        m_dist = min(m_dist, dist);
    }
    return m_dist;
}
`
});


export const fci2d = (): GLSLFunctions => ({
    funcName: 'fci2d',
    output: 'float',
    input: ['vec2'],
    value: `
float fci2d (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
`,
});

interface FbmOptions {
    noiseFunc?: GLSLFunctions,
}
export const fbm = (octaves: number, {
    noiseFunc = fci2d(),
}: FbmOptions = {}): GLSLFunctions => ({
    funcName: 'fbm',
    output: 'float',
    input: ['vec2'],
    dependencies: [noiseFunc],
    value: `
// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd

#define FBM_OCTAVES ${octaves}
#define FBM_NOISE ${noiseFunc.funcName}
float fbm (in vec2 st) {
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    for (int i = 0; i < FBM_OCTAVES; i++) {
        value += amplitude * FBM_NOISE(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}
`
});

export const simplex3d = (): GLSLFunctions => ({
    funcName: 'simplex3d',
    output: 'float',
    input: ['vec3'],
    dependencies: [random()],
    value: `
vec3 random3(vec3 c) {
	float j = 4096.0 * sin(dot(c,vec3(17.0, 59.4, 15.0)));
	vec3 r;
	r.z = fract(512.0 * j);
	j *= .125;
	r.x = fract(512.0 * j);
	j *= .125;
	r.y = fract(512.0 * j);
	return r - 0.5;
}

/* 3d simplex noise */
float simplex3d(vec3 p) {
    const float F3 =  0.3333333;
    const float G3 =  0.1666667;
    const mat3 rot1 = mat3(-0.37, 0.36, 0.85,-0.14,-0.93, 0.34,0.92, 0.01,0.4);
    const mat3 rot2 = mat3(-0.55,-0.39, 0.74, 0.33,-0.91,-0.24,0.77, 0.12,0.63);
    const mat3 rot3 = mat3(-0.71, 0.52,-0.47,-0.08,-0.72,-0.68,-0.7,-0.45,0.56);
	/* 1. find current tetrahedron T and it's four vertices */
	/* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
	/* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/
	
	/* calculate s and x */
	vec3 s = floor(p + dot(p, vec3(F3)));
	vec3 x = p - s + dot(s, vec3(G3));
	
	/* calculate i1 and i2 */
	vec3 e = step(vec3(0.0), x - x.yzx);
	vec3 i1 = e*(1.0 - e.zxy);
	vec3 i2 = 1.0 - e.zxy*(1.0 - e);
		
	/* x1, x2, x3 */
	vec3 x1 = x - i1 + G3;
	vec3 x2 = x - i2 + 2.0 * G3;
	vec3 x3 = x - 1.0 + 3.0 * G3;
	
	/* 2. find four surflets and store them in d */
	vec4 w, d;
	
	/* calculate surflet weights */
	w.x = dot(x, x);
	w.y = dot(x1, x1);
	w.z = dot(x2, x2);
	w.w = dot(x3, x3);
	
	/* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
	w = max(0.6 - w, 0.0);
	
	/* calculate surflet components */
	d.x = dot(random3(s), x);
	d.y = dot(random3(s + i1), x1);
	d.z = dot(random3(s + i2), x2);
	d.w = dot(random3(s + 1.0), x3);
	
	/* multiply d by w^4 */
	w *= w;
	w *= w;
	d *= w;
	
	/* 3. return the sum of the four surflets */
	return dot(d, vec4(52.0));
}
`
});

export const simplex3dFractal = (): GLSLFunctions => {
    const simplex = simplex3d();
    return ({
        funcName: 'simplex3d_fractal',
        output: 'float',
        input: ['vec3'],
        dependencies: [simplex],
        value: `
float simplex3d_fractal(vec3 m) {
    const mat3 rot1 = mat3(-0.37, 0.36, 0.85,-0.14,-0.93, 0.34,0.92, 0.01,0.4);
    const mat3 rot2 = mat3(-0.55,-0.39, 0.74, 0.33,-0.91,-0.24,0.77, 0.12,0.63);
    const mat3 rot3 = mat3(-0.71, 0.52,-0.47,-0.08,-0.72,-0.68,-0.7,-0.45,0.56);

    return  0.5333333 * ${simplex.funcName}(m * rot1)
        + 0.2666667 * ${simplex.funcName}(2.0 * m * rot2)
        + 0.1333333 * ${simplex.funcName}(4.0 * m * rot3)
        + 0.0666667 * ${simplex.funcName}(8.0 * m);
}
`
    });
};
export const simplex2dFractal = (): GLSLFunctions => {
    const simplex = simplex3d();
    return ({
        funcName: 'simplex2d_fractal',
        output: 'float',
        input: ['vec3'],
        dependencies: [simplex],
        value: `
float simplex2d_fractal(vec2 m) {
    const mat3 rot1 = mat3(-0.37, 0.36, 0.85,-0.14,-0.93, 0.34,0.92, 0.01,0.4);
    const mat3 rot2 = mat3(-0.55,-0.39, 0.74, 0.33,-0.91,-0.24,0.77, 0.12,0.63);
    const mat3 rot3 = mat3(-0.71, 0.52,-0.47,-0.08,-0.72,-0.68,-0.7,-0.45,0.56);

    return  0.5333333 * ${simplex.funcName}(vec3(m, 1.0) * rot1)
        + 0.2666667 * ${simplex.funcName}(2.0 * vec3(m, 1.0) * rot2)
        + 0.1333333 * ${simplex.funcName}(4.0 *vec3(m, 1.0)*rot3)
        + 0.0666667 * ${simplex.funcName}(8.0*vec3(m, 1.0));
}
`
    });
};

export const simplex2d = (): GLSLFunctions => {
    const simplex = simplex3d();
    return ({
        funcName: 'simplex2d',
        output: 'float',
        input: ['vec2'],
        dependencies: [simplex],
        value: `
float simplex2d(vec2 m) {
    return simplex3d(vec3(m, 1.0));
}
`
    });
};

export const rotate2d = (): GLSLFunctions => ({
    funcName: 'rotate2d',
    output: 'mat2',
    input: ['float'],
    value: `
mat2 rotate2d(float _angle){
    return mat2(
        cos(_angle),-sin(_angle),
        sin(_angle),cos(_angle)
    );
}
`,
})

export const deserialize = (functions : GLSLFunctions[]): string => {
    const map = new Map<string, string>();

    const v = (functions : GLSLFunctions[]) => {
        functions.forEach((value) => {
            if (value.dependencies != null) {
                v(value.dependencies);
            }
            map.set(value.funcName, value.value);
        }, []);
    };
    v(functions);
    return Array.from(map.entries()).map(val => (val[1])).join('\n');
};

uniform float u_time;
varying vec2 vUv;
uniform vec2 u_resolution;
#include <fog_pars_fragment>

const float PI = 3.141592653;
const float DEG = PI / 180.0;

bool between(float target, float min, float max) {
    return target >= min && target <= max;
}

float norm(float t, float min, float max) {
    return (t - min) / (max - min);
}

float createCircle(vec2 p) {
    float c = 0.0;

    float len_p = length(p);

    if (between(len_p, 0.0, 0.8)) {
        float t = mix(0.0, 1.0, pow(norm(len_p, 0.0, 0.8), 8.0));
        c = t;
    }
    if (between(len_p, 0.8, 1.0)) {
        float t = mix(1.0, 0.0, pow(norm(len_p, 0.8, 1.0), 0.2));
        c = t;
    }
    return c;
}

float zeroichi(float num) {
    return (num + 1.0) * 2.0;
}

void main()	{
    vec3 color = vec3(0.0);
    vec2 p = (vUv - vec2(0.5)) * 2.0;

    for (float i = 0.0; i < 1.0; i += 0.1) {
        float scale = 0.8 * sin(u_time / 800.0) + 1.0;
        {
            vec2 position = vec2(
                (sin(u_time / 400.0 + (i * PI * 2.0))) * 0.4,
                (cos(u_time / 700.0 + (i * PI * 2.0))) * 0.5
            );
            float t = createCircle(vec2((p.xy + position) / scale)) * 1.0;
            color.g = max(t, color.g);
        }
        {
            vec2 position = vec2(
                (sin(u_time / 400.0 + (i * PI * 2.0))) * 0.6,
                (cos(u_time / 700.0 + (i * PI * 2.0))) * 0.4
            );
            float t = createCircle(vec2((p.xy + position) / scale)) * 1.0;
            color.r = max(t, color.r);
        }
        {
            vec2 position = vec2(
                (sin(u_time / 400.0 + (i * PI * 2.0))) * 0.5,
                (cos(u_time / 700.0 + (i * PI * 2.0))) * 0.6
            );
            float t = createCircle(vec2((p.xy + position) / scale)) * 1.0;
            color.b = max(t, color.b);
        }

    }

    gl_FragColor = vec4(color, 1.0);
    #include <fog_fragment>
}


float createSquare(vec2 position, float width, float height) {
    if (posiiton.x > width && position.x < -width) {
        return 1.0;
    }
    // if (posiiton.y > height && position.y < -height) {
    //     return 1.0;
    // }

    return 0.0;
}

float zeroichi(float num) {
    return (num + 1.0) * 2.0;
}
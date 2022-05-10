"use strict";(self.webpackChunkmysite=self.webpackChunkmysite||[]).push([[992,797],{5797:function(n,e,t){t.r(e),t.d(e,{ThreeProvider:function(){return s},useThreeContext:function(){return a}});var i=t(885),r=t(2791),o=t(924),u=t(184),c={renderer:null,scene:null},f=(0,r.createContext)(c),a=function(){return(0,r.useContext)(f)},s=function(n){var e=n.children,t=function(){var n=(0,r.useState)(),e=(0,i.Z)(n,2),t=e[0],o=e[1],u=(0,r.useCallback)((function(){o({width:window.innerWidth,height:window.innerHeight})}),[]);return(0,r.useEffect)((function(){return u(),window.addEventListener("resize",u),function(){window.removeEventListener("resize",u)}}),[u]),t}(),c=(0,r.useRef)(null),a=(0,r.useState)(null),s=(0,i.Z)(a,2),l=s[0],v=s[1],d=(0,r.useMemo)((function(){return new o.xsS}),[]);return(0,r.useEffect)((function(){null!=l&&null!=t&&(l.setPixelRatio(window.devicePixelRatio),l.setSize(t.width,t.height))}),[l,t]),(0,r.useEffect)((function(){if(null==c.current)throw new Error("");var n=new o.CP7({canvas:c.current,antialias:!0});return v(n),function(){v(null)}}),[]),(0,u.jsxs)(f.Provider,{value:{renderer:l,scene:d},children:[(0,u.jsx)("canvas",{ref:c}),e]})}},4992:function(n,e,t){t.r(e),t.d(e,{Buble2:function(){return h}});var i=t(885),r=t(2791),o=t(924),u=t(9528),c=t(4588),f=t(8137),a=t(5576),s=t(2469),l=t(5797),v=t(9988),d=t(184),m="uniform float u_time;\nuniform vec2 u_resolution;\nvarying vec2 vUv;\n\nvoid main()\t{\n    vec3 p = position;\n    vUv = uv - .5;\n    vUv += .5;\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.0);\n}\n",w="\nuniform float u_time;\nvarying vec2 vUv;\nuniform vec2 u_resolution;\n#include <fog_pars_fragment>\n\nconst float PI = 3.141592653;\nconst float DEG = PI / 180.0;\n\nbool between(float target, float min, float max) {\n    return target >= min && target <= max;\n}\n\nfloat norm(float t, float min, float max) {\n    return (t - min) / (max - min);\n}\n\nfloat createCircle(vec2 p) {\n    float c = 0.0;\n\n    float len_p = length(p);\n\n    if (between(len_p, 0.0, 0.8)) {\n        float t = mix(0.0, 1.0, pow(norm(len_p, 0.0, 0.8), 8.0));\n        c = t;\n    }\n    if (between(len_p, 0.8, 1.0)) {\n        float t = mix(1.0, 0.0, pow(norm(len_p, 0.8, 1.0), 0.2));\n        c = t;\n    }\n    return c;\n}\n\nfloat createSquare(vec2 position, float width, float height) {\n    if (position.x > width || position.x < -width) {\n        return 0.0;\n    }\n    if (position.y > height || position.y < -height) {\n        return 0.0;\n    }\n\n    return 1.0;\n}\n\nfloat zeroichi(float num) {\n    return (num + 1.0) * 2.0;\n}\n\nmat2 rotate2d(float _angle){\n    return mat2(\n        cos(_angle),-sin(_angle),\n        sin(_angle),cos(_angle));\n}\n\nvoid main()\t{\n    vec3 color;\n    color = vec3(0.0);\n    vec2 p = (vUv - vec2(0.5)) * 2.0;\n    float t = sin(u_time / 1000.0) * 1.0 + 300.0;\n\n    for (float i = 0.1; i < 4.0; i += 0.1) {\n        float red_line = createSquare(\n            (p * rotate2d(45.0 * DEG * sin(t * i))) - vec2(-1., -2.0 + i),\n            3.0,\n            0.05\n        );\n        color.r += red_line * 0.5;\n\n        float blue_line = createSquare(\n            (p * rotate2d(45.0 * DEG * sin(t * i))) - vec2(-1., -2.0 + i + 0.1),\n            3.0,\n            0.05\n        );\n        color.b += (blue_line * 0.5);\n        // color.b = 1.0;\n\n        float green_line = createSquare(\n            (p * rotate2d(45.0 * DEG * sin(t * i))) - vec2(-1., -2.0 + i - 0.1),\n            3.0,\n            0.05\n        );\n        color.g += green_line * 0.5;\n    }\n\n    gl_FragColor = vec4(color, 1.0);\n    #include <fog_fragment>\n}\n",h=function(){var n=(0,l.useThreeContext)().scene,e=(0,u.A)({z:-400}),t=(0,f.L)(e);(0,r.useEffect)((function(){if(null!=n){var e=new o.Mig(2236928,1);return n.add(e),function(){n.remove(e)}}}),[n]);var h=(0,c.D)({x:-200,y:-100,z:100,intensity:1,color:26214});(0,a.x)(n,h);var x=(0,c.D)({x:150,y:100,z:-50,intensity:1,color:16777147});(0,a.x)(n,x);var p=(0,v.n)({fragmentShader:w,vertexShader:m}),g=(0,i.Z)(p,2),_=g[0],E=g[1];(0,r.useEffect)((function(){_.position.z=-150,_.position.y=50,_.position.x=50}),[_]),(0,a.x)(n,_);var y=(0,v.n)({fragmentShader:w,vertexShader:m}),S=(0,i.Z)(y,2),z=S[0],b=S[1];(0,r.useEffect)((function(){z.position.z=-150,z.position.y=-50,z.position.x=50,z.scale.y=-1}),[z]),(0,a.x)(n,z);var C=(0,v.n)({fragmentShader:w,vertexShader:m}),P=(0,i.Z)(C,2),A=P[0],k=P[1];(0,r.useEffect)((function(){A.position.z=-150,A.position.y=50,A.position.x=-50,A.scale.x=-1}),[A]),(0,a.x)(n,A);var q=(0,v.n)({fragmentShader:w,vertexShader:m}),F=(0,i.Z)(q,2),M=F[0],D=F[1];(0,r.useEffect)((function(){M.position.z=-150,M.position.y=-50,M.position.x=-50,M.scale.x=-1,M.scale.y=-1}),[M]),(0,a.x)(n,M);var R=E("u_time",0);E("u_resolution",[window.innerWidth,window.innerHeight]);var j=b("u_time",0);b("u_resolution",[window.innerWidth,window.innerHeight]);var H=b("u_time",0);k("u_resolution",[window.innerWidth,window.innerHeight]);var W=b("u_time",0);D("u_resolution",[window.innerWidth,window.innerHeight]);var Z=(0,r.useMemo)((function(){return new o.Pa4(0,0,0)}),[]);return(0,s.g)((function(n){e.lookAt(Z),R(n),j(n),H(n),W(n),t()})),(0,d.jsx)(d.Fragment,{})}},9528:function(n,e,t){t.d(e,{A:function(){return o}});var i=t(2791),r=t(924),o=function(n){var e=n.x,t=void 0===e?0:e,o=n.y,u=void 0===o?0:o,c=n.z,f=void 0===c?0:c,a=(0,i.useRef)(new r.cPb(45,window.innerWidth/window.innerHeight));return(0,i.useEffect)((function(){a.current.position.x=t}),[t]),(0,i.useEffect)((function(){a.current.position.y=u}),[u]),(0,i.useEffect)((function(){a.current.position.z=f}),[f]),a.current}},4588:function(n,e,t){t.d(e,{D:function(){return o}});var i=t(2791),r=t(924),o=function(n){var e=n.x,t=void 0===e?0:e,o=n.y,u=void 0===o?0:o,c=n.z,f=void 0===c?0:c,a=n.color,s=void 0===a?16777215:a,l=n.intensity,v=void 0===l?1:l,d=(0,i.useRef)(new r.Ox3);return(0,i.useEffect)((function(){d.current.intensity=v}),[v]),(0,i.useEffect)((function(){d.current.color.set(s)}),[s]),(0,i.useEffect)((function(){d.current.position.x=t}),[t]),(0,i.useEffect)((function(){d.current.position.y=u}),[u]),(0,i.useEffect)((function(){d.current.position.z=f}),[f]),d.current}},8137:function(n,e,t){t.d(e,{L:function(){return o}});var i=t(5797),r=t(2791),o=function(n){var e=(0,i.useThreeContext)(),t=e.scene,o=e.renderer;return(0,r.useCallback)((function(){null!=o&&null!=t&&o.render(t,n)}),[n,o,t])}},9988:function(n,e,t){t.d(e,{n:function(){return o}});var i=t(2791),r=t(924),o=function(n){var e=n.fragmentShader,t=void 0===e?"":e,o=n.vertexShader,u=void 0===o?"":o,c=n.fog,f=void 0!==c&&c,a=n.geometry,s=void 0===a?new r.BKK(100,100,10,10):a,l=(0,i.useMemo)((function(){return new r.jyz({transparent:!0,depthTest:!0})}),[]);return(0,i.useEffect)((function(){l.vertexShader=u}),[l,u]),(0,i.useEffect)((function(){l.fragmentShader=t}),[l,t]),(0,i.useEffect)((function(){l.fog=f}),[l,f]),[(0,i.useMemo)((function(){return new r.Kj0(s,l)}),[l,s]),(0,i.useCallback)((function(n,e){l.uniforms[n]={value:e};return function(e){l.uniforms[n].value=e}}),[l])]}},5576:function(n,e,t){t.d(e,{x:function(){return r}});var i=t(2791),r=function(n,e){(0,i.useEffect)((function(){if(null!=n&&null!=e)return n.add(e),function(){n.remove(e)}}),[n,e])}},2469:function(n,e,t){t.d(e,{N:function(){return r},g:function(){return o}});var i=t(2791);function r(n){var e=!1,t=0,i=function i(r){e||(t=window.requestAnimationFrame((function(n){i(n)})),n(r,0))};return t=window.requestAnimationFrame((function(n){i(n)})),function(){e=!0,window.cancelAnimationFrame(t)}}function o(n){var e=(0,i.useRef)(n),t=(0,i.useRef)(0);(0,i.useEffect)((function(){e.current=n}),[n]),(0,i.useEffect)((function(){var n=0,i=function i(r){n=window.requestAnimationFrame(i),e.current(r,r-t.current),t.current=r};return n=requestAnimationFrame((function(n){t.current=n,i(n)})),function(){window.cancelAnimationFrame(n)}}),[])}}}]);
//# sourceMappingURL=992.73218d4d.chunk.js.map
/**
 * Aurora shader component with Sandpack code editor.
 */
import ThemedSandpack from '@/components/ThemedSandpack'

function AuroraSandpack() {
  return (
    <ThemedSandpack
      template="react"
      customSetup={{
        dependencies: {
          '@react-three/fiber': '^8.15.11',
          '@react-three/drei': '^9.88.13',
          'three': '^0.160.0',
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
        },
      }}
      files={{
        '/styles.css': `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
}

#root {
  width: 100vw;
  height: 100vh;
}`,
        '/index.jsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,
        '/App.js': `import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const vertexShader = \`#define PI 3.14159265359

uniform float uTime;
uniform float uHue;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vPosition = position;
    vNormal = normal;
    vUv = uv;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}\`;

const fragmentShader = \`#define PI 3.14159265359

uniform float uTime;
uniform float uHue;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

// Simplex 3D Noise by Ian McEwan, Stefan Gustavson
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 =   v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  i = mod(i, 289.0); 
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0)) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float smoothMod(float axis, float amp, float rad){
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float wave(float st, float m, float M, float tm, float tM){
    return map(smoothMod(st * 1.2, 0.91, 1.5), m, M, tm, tM);
}

vec3 hueShift(vec3 color, float hueAdjust){
    const vec3  kRGBToYPrime = vec3(0.299, 0.587, 0.114);
    const vec3  kRGBToI      = vec3(0.596, -0.275, -0.321);
    const vec3  kRGBToQ      = vec3(0.212, -0.523, 0.311);
    const vec3  kYIQToR     = vec3(1.0, 0.956, 0.621);
    const vec3  kYIQToG     = vec3(1.0, -0.272, -0.647);
    const vec3  kYIQToB     = vec3(1.0, -1.107, 1.704);

    float YPrime = dot(color, kRGBToYPrime);
    float I      = dot(color, kRGBToI);
    float Q      = dot(color, kRGBToQ);
    float hue    = atan(Q, I);
    float chroma = sqrt(I * I + Q * Q);

    hue += hueAdjust;

    Q = chroma * sin(hue);
    I = chroma * cos(hue);

    vec3 yIQ = vec3(YPrime, I, Q);
    return vec3(dot(yIQ, kYIQToR), dot(yIQ, kYIQToG), dot(yIQ, kYIQToB));
}

void main() {
  vec3 color = vec3(0.980, 0.964, 0.937);
  float alpha = 1.0;
  float time = uTime * 0.75;
  float hue = uHue;

  // Create three separate noise channels for RGB
  float red = snoise(vec3(vUv.x * 2.0, vUv.y * 0.5, time));
  red = wave(red, 0.43, 0.62, 0.0, 2.0);

  float green = snoise(vec3(vUv.x * 2.0 + 100.0, vUv.y * 0.5 + 100.0, time)) * 0.8;
  float blue = snoise(vec3(vUv.x * 2.0 + 200.0, vUv.y * 0.5 + 300.0, time)) * 0.6;

  red = clamp(red, 0.0, 0.980);
  green = clamp(green, 0.0, 0.964);
  blue = clamp(blue, 0.0, 0.937);

  // Subtract noise from color channels to create aurora effect
  color.yz -= red;
  color.xz -= green;
  color.xy -= blue;

  // Apply hue shift
  color = hueShift(color, hue);

  gl_FragColor = vec4(color, alpha);
}\`;

function PlaneAurora({ hue = 0 }) {
  const materialRef = useRef();

  const shaderParams = {
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uTime: { value: Math.random() * 10000 },
      uHue: { value: hue },
    },
  };

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta / 10;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[20, 10]} />
      <shaderMaterial ref={materialRef} args={[shaderParams]} transparent={true} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas dpr={[0.5, 1]} gl={{ powerPreference: "low-power" }} camera={{ position: [0, 0, 5] }}>
      <PlaneAurora hue={0} />
      <OrbitControls />
    </Canvas>
  );
}`,
      }}
      options={{
        editorHeight: 600,
        showTabs: true,
        showLineNumbers: true,
      }}
    />
  )
}

export default AuroraSandpack
export { AuroraSandpack }

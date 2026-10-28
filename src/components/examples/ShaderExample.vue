<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { toRgb } from '@/utils/hex';

// A minimal WebGL fragment shader with three color uniforms. Shader libraries (e.g. Paper Shaders) take
// colors the same way: as values passed from JavaScript, which `var(--color-*)` can't provide.
const props = defineProps<{ colors: [string, string, string] }>();

const canvas = ref<HTMLCanvasElement>();
let frame = 0;
let cleanup = () => {};

const vertex = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;
const fragment = `
precision mediump float;
uniform vec2 res;
uniform float t;
uniform vec3 c0, c1, c2;
void main() {
  vec2 uv = gl_FragCoord.xy / res;
  float a = 0.5 + 0.5 * sin(uv.x * 3.0 + t * 0.6 + sin(uv.y * 4.0 - t * 0.4));
  float b = 0.5 + 0.5 * sin(uv.y * 3.0 - t * 0.5 + uv.x * 2.0);
  gl_FragColor = vec4(mix(mix(c0, c1, a), c2, b * 0.6), 1.0);
}`;

onMounted(() => {
  const el = canvas.value!;
  const gl = el.getContext('webgl');
  if (!gl) return;
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const p = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(p);
  gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const start = performance.now();
  const draw = () => {
    const dpr = window.devicePixelRatio || 1;
    el.width = el.clientWidth * dpr;
    el.height = el.clientHeight * dpr;
    gl.viewport(0, 0, el.width, el.height);
    gl.uniform2f(u('res'), el.width, el.height);
    gl.uniform1f(u('t'), (performance.now() - start) / 1000);
    // Read the props every frame, so a theme change shows up on the next frame.
    props.colors.forEach((c, i) => gl.uniform3fv(u(`c${i}`), toRgb(c)));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    frame = requestAnimationFrame(draw);
  };
  draw();
  cleanup = () => gl.getExtension('WEBGL_lose_context')?.loseContext();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  cleanup();
});
</script>

<template>
  <canvas ref="canvas" class="block h-56 w-full rounded-2xl" />
</template>

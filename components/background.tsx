"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export default function ShaderBackground({
  className = "",
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationId = useRef<number | null>(null);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }

    // ---- Shader sources ----
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        vec3 m0 = 1.0 - 0.0514285714285714 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          
          // Background color: Deep Dark Slate
          vec3 bgColor = vec3(0.08, 0.02, 0.05);
          
          // Emerald green (#10B981) and subtle Cyan
          vec3 color1 = vec3(0.06, 0.72, 0.50); // Emerald
          vec3 color2 = vec3(0.4, 0.6, 0.65);   // Cyan
          
          float noise = snoise(uv * 2.0 + u_time * 0.1);
          float noise2 = snoise(uv * 4.0 - u_time * 0.05);
          
          // Create soft, flowing blobs
          float blob1 = smoothstep(0.3, 0.8, snoise(uv * 1.5 + u_time * 0.08 + mouse * 0.2));
          float blob2 = smoothstep(0.4, 0.9, snoise(uv * 2.5 - u_time * 0.05 - mouse * 0.1));
          
          vec3 finalColor = bgColor;
          finalColor = mix(finalColor, color1, blob1 * 0.5);
          finalColor = mix(finalColor, color2, blob2 * 0.6);
          
          // Add subtle grid glow
          vec2 grid = fract(uv * 40.0);
          float gridLine = smoothstep(0.02, 0.0, grid.x) + smoothstep(0.02, 0.0, grid.y);
          finalColor += gridLine * color1 * 0.03 * (0.5 + 0.5 * sin(u_time));
          
          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // ---- Compile shaders ----
    const createShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    // ---- Link program ----
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // ---- Buffer ----
    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // ---- Uniform locations ----
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    // ---- Resize handling ----
    const syncSize = (): void => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", syncSize);
    }
    syncSize(); // initial sizing

    // ---- Mouse tracking ----
    const handleMouseMove = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.current.x = nx * canvas.width;
        mouse.current.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ---- Animation loop ----
    const render = (timestamp: number): void => {
      if (!resizeObserver) syncSize(); // fallback

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, timestamp * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId.current = requestAnimationFrame(render);
    };

    render(0);

    // ---- Cleanup ----
    return (): void => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", syncSize);
      window.removeEventListener("mousemove", handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ display: "block", ...style }}
    />
  );
}

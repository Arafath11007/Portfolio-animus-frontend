import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundManager } from './SoundManager';

export default function AnimusLoadingCorridor({ onComplete }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ANIMUS 4.0 CORRIDOR...");
  const [fastForward, setFastForward] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Safety fallback timer: auto-complete if animation stalls or WebGL fails
    const safetyTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    let renderer, scene, camera, geometry, material;
    let animationFrameId;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x06090e, 0.0035);

      camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
      camera.position.set(0, 0, 180);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization bypassed in corridor:", e);
      // Fallback: fast-forward and complete
      const fallbackTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
      return () => {
        clearTimeout(safetyTimeout);
        clearTimeout(fallbackTimer);
      };
    }

    // 1. Shards Geometry (flying pieces from void to target mesh points)
    const SHARD_COUNT = 1400;
    geometry = new THREE.BufferGeometry();

    const startPositions = new Float32Array(SHARD_COUNT * 3);
    const targetPositions = new Float32Array(SHARD_COUNT * 3);
    const currentPositions = new Float32Array(SHARD_COUNT * 3);
    const colors = new Float32Array(SHARD_COUNT * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const whiteColor = new THREE.Color(0xffffff);
    const goldColor = new THREE.Color(0xd4af37);

    // Target shape: An iconic Assassin's Creed Insignia / Animus Crest structure
    for (let i = 0; i < SHARD_COUNT; i++) {
      // Start dispersed far away in chaotic 3D vortex
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 250 + Math.random() * 350;

      startPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      startPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      startPositions[i * 3 + 2] = (Math.random() - 0.5) * 600 - 100;

      currentPositions[i * 3] = startPositions[i * 3];
      currentPositions[i * 3 + 1] = startPositions[i * 3 + 1];
      currentPositions[i * 3 + 2] = startPositions[i * 3 + 2];

      // Target positions arranged in an iconic crested pyramid & DNA ring
      if (i < 900) {
        // Assassin Crest outline and inner chevron
        const t = (i / 900) * Math.PI * 2;
        const u = (i % 300) / 300;
        const side = Math.floor(i / 300);

        if (side === 0) {
          // Left wing ascending to peak
          targetPositions[i * 3] = -60 * (1 - u);
          targetPositions[i * 3 + 1] = -50 + 100 * u;
          targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        } else if (side === 1) {
          // Right wing descending from peak
          targetPositions[i * 3] = 60 * u;
          targetPositions[i * 3 + 1] = 50 - 100 * u;
          targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        } else {
          // Inner inverted arrowhead & base curve
          targetPositions[i * 3] = Math.sin(t) * 35 * (1 - Math.cos(t));
          targetPositions[i * 3 + 1] = -35 + Math.cos(t) * 35;
          targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
      } else {
        // Orbiting Genetic Memory Rings
        const angle = ((i - 900) / 500) * Math.PI * 6;
        const r = 75 + Math.sin(angle * 2) * 15;
        targetPositions[i * 3] = Math.cos(angle) * r;
        targetPositions[i * 3 + 1] = Math.sin(angle) * r;
        targetPositions[i * 3 + 2] = Math.cos(angle * 3) * 30;
      }

      // Colors: Cyan dominance with flashes of white and gold
      const rand = Math.random();
      const col = rand > 0.85 ? goldColor : rand > 0.6 ? whiteColor : cyanColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,240,255,0.85)');
    grad.addColorStop(0.7, 'rgba(0,180,255,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    material = new THREE.PointsMaterial({
      size: 5.5,
      vertexColors: true,
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Wireframe Animus Digital Grid Tunnel
    const gridHelper = new THREE.GridHelper(300, 30, 0x00f0ff, 0x1e2f47);
    gridHelper.position.y = -80;
    scene.add(gridHelper);

    const ceilingGrid = new THREE.GridHelper(300, 30, 0x00f0ff, 0x0e1b2d);
    ceilingGrid.position.y = 80;
    scene.add(ceilingGrid);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    let localProgress = 0;
    const startTime = Date.now();
    const duration = 2800; // 2.8s smooth dramatic synchronization

    const statuses = [
      "ACQUIRING GENETIC DATA: YASAR_ARAFATH...",
      "DECONSTRUCTING PRE-HISTORICAL TIME MATRIX...",
      "RECONSTRUCTING MEMORY BLOCK: 8+_YEARS_BACKEND_EXCELLENCE...",
      "SYNCHRONIZING CUBET TECHNO LABS TELEMETRY...",
      "ALIGNING MASTER PHP 8+ & LARAVEL (10+) NODES...",
      "FULL SYNCHRONIZATION ACHIEVED."
    ];

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = Date.now() - startTime;
      localProgress = Math.min(1, elapsed / duration);
      const easedProgress = Math.pow(localProgress, 2.2); // Exponential smooth acceleration & settling

      const pos = geometry.attributes.position.array;

      for (let i = 0; i < SHARD_COUNT; i++) {
        const i3 = i * 3;
        // Convergence in a logarithmic Animus vortex spiral
        const spiralTurns = (1 - easedProgress) * 4.0;
        const swirlAngle = spiralTurns * Math.PI * 2 + (i * 0.05);
        const cosS = Math.cos(swirlAngle);
        const sinS = Math.sin(swirlAngle);

        const currentX = THREE.MathUtils.lerp(startPositions[i3], targetPositions[i3], easedProgress);
        const currentY = THREE.MathUtils.lerp(startPositions[i3 + 1], targetPositions[i3 + 1], easedProgress);
        const currentZ = THREE.MathUtils.lerp(startPositions[i3 + 2], targetPositions[i3 + 2], easedProgress);

        // Blend spiral radius into final position
        pos[i3] = currentX * cosS - currentZ * sinS * (1 - easedProgress);
        pos[i3 + 1] = currentY;
        pos[i3 + 2] = currentX * sinS * (1 - easedProgress) + currentZ * cosS;
      }
      geometry.attributes.position.needsUpdate = true;

      // Subtle rotation of assembled crest
      particles.rotation.y += 0.005;
      gridHelper.position.z = (gridHelper.position.z + 1.2) % 20;
      ceilingGrid.position.z = (ceilingGrid.position.z + 1.2) % 20;

      renderer.render(scene, camera);

      const pct = Math.floor(localProgress * 100);
      setProgress(pct);

      const statusIdx = Math.min(statuses.length - 1, Math.floor(localProgress * statuses.length));
      setStatusText(statuses[statusIdx]);

      if (localProgress >= 1) {
        soundManager.playSyncComplete();
        cancelAnimationFrame(animationFrameId);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
        return;
      }
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(safetyTimeout);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer) {
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-animus-void select-none overflow-hidden">
      {/* 3D Canvas Background */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Screen glitch scanlines */}
      <div className="absolute inset-0 animus-scanlines pointer-events-none" />

      {/* Animus Central Synchronization Telemetry HUD */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center">
        {/* Assassin Animus Crest Watermark */}
        <div className="w-16 h-16 mb-4 relative animate-pulse-glow">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-animus-cyan" strokeWidth="2.5">
            <polygon points="50,10 90,85 50,70 10,85" strokeDasharray="300" strokeDashoffset="0" />
            <line x1="50" y1="10" x2="50" y2="70" stroke="#00F0FF" strokeWidth="2" />
            <polygon points="50,35 68,72 50,62 32,72" fill="rgba(0,240,255,0.15)" stroke="#00F0FF" />
          </svg>
        </div>

        <h1 className="font-mono text-sm tracking-widest text-animus-cyan uppercase flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-animus-cyan animate-ping inline-block"></span>
          ANIMUS 4.0 // SYNCHRONIZING MEMORY MATRIX
        </h1>

        <p className="font-mono text-xs text-animus-silver mb-6 h-5 transition-all duration-300 tracking-wide">
          {statusText}
        </p>

        {/* Synchronization Bar */}
        <div className="w-full h-2 bg-animus-dark border border-animus-border rounded-none p-[1px] relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-animus-cyan via-white to-animus-cyan transition-all duration-75 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white animate-pulse" />
          </div>
        </div>

        {/* Telemetry metadata numbers */}
        <div className="w-full flex justify-between font-mono text-[10px] text-animus-silver/70">
          <span>DNA_LOCUS: 8_YR_EXP</span>
          <span className="text-animus-cyan font-bold tracking-wider">{progress}% SYNCHRONIZED</span>
          <span>SYSTEM: CUBET_NODE</span>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            soundManager.playSyncComplete();
            if (onComplete) onComplete();
          }}
          className="mt-8 font-mono text-xs text-animus-cyan/60 hover:text-animus-cyan border border-animus-border hover:border-animus-cyan px-4 py-1.5 transition-colors tracking-widest uppercase"
        >
          [ Skip Synchronization ]
        </button>
      </div>

      {/* Decorative corner brackets */}
      <div className="absolute top-8 left-8 font-mono text-xs text-animus-cyan/40">
        // PROTOCOL: ANIMUS_V4<br />
        // SUBJECT: YASAR_ARAFATH
      </div>
      <div className="absolute top-8 right-8 font-mono text-xs text-right text-animus-cyan/40">
        TIME_FRAME: 2016-2026<br />
        ORIGIN: CUBET TECHNO LABS
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-xs text-animus-silver/40">
        MEM_SEQ: 01 // GENETIC_PROFILE
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-right text-animus-silver/40">
        STATUS: REASSEMBLING SHARDS
      </div>
    </div>
  );
}

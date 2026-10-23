import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimusHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    let scene, camera, renderer, geometry, pMaterial, icoGeo, icoMat;
    let animationId;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x06090e, 0.002);

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(0, 0, 140);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization skipped in AnimusHeroCanvas:", e);
      return;
    }

    // Mouse coordinates tracking with smooth damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e) => {
      // Normalize mouse coordinates (-1 to 1)
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // 1. Floating Interactive Animus Genetic Spiral & Shard Field
    const TOTAL_PARTICLES = 2200;
    const HELIX_PARTICLES = 1200; // Animus Genetic Memory Double-Helix Spiral
    const AMBIENT_PARTICLES = 1000; // Floating Animus digital telemetry shards

    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(TOTAL_PARTICLES * 3);
    const originalPositions = new Float32Array(TOTAL_PARTICLES * 3);
    const colors = new Float32Array(TOTAL_PARTICLES * 3);
    const velocities = new Float32Array(TOTAL_PARTICLES * 3);
    // Custom attribute to store particle spiral parameters: [radius, angleOffset, strandSign]
    const helixData = new Float32Array(TOTAL_PARTICLES * 3);

    const cCyan = new THREE.Color(0x00f0ff);
    const cDeepCyan = new THREE.Color(0x0099cc);
    const cWhite = new THREE.Color(0xffffff);
    const cGold = new THREE.Color(0xd4af37);

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const i3 = i * 3;

      if (i < HELIX_PARTICLES) {
        // Double-Helix Genetic Memory Spiral
        const strand = i % 2 === 0 ? 1 : -1; // 2 intertwined spiral strands
        const t = (i / HELIX_PARTICLES) * Math.PI * 10; // Multiple spiral turns
        const radius = 32 + Math.sin(t * 0.4) * 10; // Tapering natural helix envelope
        const y = (i / HELIX_PARTICLES) * 220 - 110; // Vertical span

        const x = Math.cos(t + (strand === 1 ? 0 : Math.PI)) * radius;
        const z = Math.sin(t + (strand === 1 ? 0 : Math.PI)) * radius;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        originalPositions[i3] = x;
        originalPositions[i3 + 1] = y;
        originalPositions[i3 + 2] = z;

        helixData[i3] = radius;
        helixData[i3 + 1] = t + (strand === 1 ? 0 : Math.PI);
        helixData[i3 + 2] = strand; // 1 or -1

        velocities[i3] = 0;
        velocities[i3 + 1] = 0.25; // Gentle upward drift along helix
        velocities[i3 + 2] = 0;

        // Color coding: strand 1 cyan/white, strand 2 gold/cyan
        const col = strand === 1 
          ? (i % 6 === 0 ? cWhite : cCyan)
          : (i % 5 === 0 ? cGold : cDeepCyan);

        colors[i3] = col.r;
        colors[i3 + 1] = col.g;
        colors[i3 + 2] = col.b;
      } else {
        // Ambient background telemetry shards floating around the vortex
        const theta = Math.random() * Math.PI * 2;
        const r = 70 + Math.random() * 160;
        const x = Math.cos(theta) * r;
        const y = (Math.random() - 0.5) * 260;
        const z = (Math.random() - 0.5) * 200;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        originalPositions[i3] = x;
        originalPositions[i3 + 1] = y;
        originalPositions[i3 + 2] = z;

        helixData[i3] = r;
        helixData[i3 + 1] = theta;
        helixData[i3 + 2] = 0; // ambient flag

        velocities[i3] = (Math.random() - 0.5) * 0.08;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.08;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.08;

        const pType = Math.random();
        const col = pType > 0.85 ? cGold : pType > 0.55 ? cWhite : cCyan;
        colors[i3] = col.r * 0.75;
        colors[i3 + 1] = col.g * 0.75;
        colors[i3 + 2] = col.b * 0.75;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // High quality glowing circular particle sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.25, 'rgba(0,240,255,0.9)');
    pGrad.addColorStop(0.65, 'rgba(0,180,255,0.3)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTex = new THREE.CanvasTexture(pCanvas);

    pMaterial = new THREE.PointsMaterial({
      size: 4.8,
      vertexColors: true,
      map: pTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    // 2. Central Animus Polyhedral Core (Interactive 3D geometry floating in hero)
    const coreGroup = new THREE.Group();
    
    // Icosahedron wireframe
    icoGeo = new THREE.IcosahedronGeometry(26, 1);
    icoMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Inner glowing core
    const innerGeo = new THREE.OctahedronGeometry(15, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Orbiting Animus DNA / Data Rings
    const ringGeo1 = new THREE.TorusGeometry(36, 0.35, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(44, 0.3, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    coreGroup.position.set(42, 5, 0);
    scene.add(coreGroup);

    // 3. Grid planes
    const bottomGrid = new THREE.GridHelper(300, 30, 0x00f0ff, 0x0e1b2d);
    bottomGrid.position.y = -60;
    scene.add(bottomGrid);

    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damped mouse tracking for camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 25;
      camera.position.y = mouse.y * 18;
      camera.lookAt(0, 0, 0);

      // Rotate central polyhedral Animus core
      coreGroup.rotation.x = time * 0.2 + mouse.y * 0.4;
      coreGroup.rotation.y = time * 0.3 + mouse.x * 0.4;
      innerMesh.rotation.z = -time * 0.5;
      ring1.rotation.z = time * 0.4;
      ring2.rotation.x = -time * 0.3;

      // Rotate entire spiral particle system continuously
      particleSystem.rotation.y = time * 0.15 + mouse.x * 0.25;

      // Animate Genetic Double-Helix Spiral wave propagation
      const pos = geometry.attributes.position.array;
      const mouseRayX = mouse.x * 120;
      const mouseRayY = mouse.y * 80;

      for (let i = 0; i < TOTAL_PARTICLES; i++) {
        const i3 = i * 3;

        if (i < HELIX_PARTICLES) {
          // Double helix wave motion: each point travels upward along the spiral
          let curY = pos[i3 + 1] + 0.35;
          if (curY > 110) curY = -110;
          pos[i3 + 1] = curY;

          // Recompute helix X and Z for the current height with smooth time wave
          const normY = (curY + 110) / 220; // 0 to 1
          const strand = helixData[i3 + 2];
          const spiralAngle = normY * Math.PI * 10 + (strand === 1 ? 0 : Math.PI) + time * 0.6;
          const r = 32 + Math.sin(spiralAngle * 0.3 + time) * 8;

          const targetX = Math.cos(spiralAngle) * r;
          const targetZ = Math.sin(spiralAngle) * r;

          // Mouse repulsion near the cursor
          const dx = pos[i3] - mouseRayX;
          const dy = pos[i3 + 1] - mouseRayY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 40) {
            const force = (40 - dist) / 40;
            pos[i3] += (dx / dist) * force * 1.5;
            pos[i3 + 2] += (dy / dist) * force * 1.5;
          } else {
            pos[i3] += (targetX - pos[i3]) * 0.08;
            pos[i3 + 2] += (targetZ - pos[i3 + 2]) * 0.08;
          }
        } else {
          // Ambient background telemetry shards
          pos[i3] += velocities[i3];
          pos[i3 + 1] += velocities[i3 + 1];
          pos[i3 + 2] += velocities[i3 + 2];

          // Bounds wrap
          if (pos[i3] > 200) pos[i3] = -200;
          if (pos[i3] < -200) pos[i3] = 200;
          if (pos[i3 + 1] > 130) pos[i3 + 1] = -130;
          if (pos[i3 + 1] < -130) pos[i3 + 1] = 130;

          // Gentle attraction to orbit
          const r = helixData[i3];
          const theta = helixData[i3 + 1] + time * 0.05;
          const origX = Math.cos(theta) * r;
          pos[i3] += (origX - pos[i3]) * 0.003;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Subtle grid scroll
      bottomGrid.position.z = (bottomGrid.position.z + 0.3) % 10;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      if (geometry) geometry.dispose();
      if (pMaterial) pMaterial.dispose();
      if (icoGeo) icoGeo.dispose();
      if (icoMat) icoMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}

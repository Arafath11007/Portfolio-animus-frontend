import React, { useEffect, useRef } from 'react';

/**
 * AnimusConstellationBackground:
 * Full-screen, persistent, faded Animus Memory Constellation & Circuit Mesh.
 * Inspired by Assassin's Creed Animus synaptic nodes & reference image Style B:
 * - Floating telemetry nodes with slow organic cosmic drift
 * - Proximity-based dynamic glowing interconnect lines (synapses / circuits)
 * - Concentric data-radar pulses expanding across the full page background
 * - Mouse-interactive gravitic pull & circuit illumination
 * - Tastefully faded (subtle opacity 0.25 - 0.5) so portfolio content remains perfectly readable
 */
export default function AnimusConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse coordinates tracking
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180, // Influence radius
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 1. Particle Nodes Configuration
    // Density scaled by viewport width
    const particleCount = Math.floor(Math.min(110, Math.max(55, window.innerWidth / 18)));
    const particles = [];

    const colors = [
      'rgba(0, 240, 255, ',    // Animus Cyan
      'rgba(212, 175, 55, ',   // Abstergo Gold
      'rgba(255, 255, 255, ',   // Sync White
      'rgba(0, 180, 216, ',    // Deep Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      const colorBase = i % 7 === 0 ? colors[1] : (i % 4 === 0 ? colors[2] : colors[0]);
      const isAnchor = i % 8 === 0; // Occasional larger anchor node with concentric ring

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isAnchor ? 2.8 + Math.random() * 1.5 : 1.2 + Math.random() * 1.6,
        isAnchor,
        colorBase,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    // 2. Slow expanding Animus radar synchronization pulses
    const pulses = [
      { x: width * 0.3, y: height * 0.4, r: 0, maxR: 450, speed: 0.8 },
      { x: width * 0.75, y: height * 0.65, r: 150, maxR: 550, speed: 0.6 },
    ];

    let time = 0;

    const render = () => {
      time += 0.02;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background radar wave rings
      pulses.forEach((p) => {
        p.r += p.speed;
        if (p.r > p.maxR) {
          p.r = 0;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }

        const pulseAlpha = Math.max(0, 0.12 * (1 - p.r / p.maxR));
        ctx.strokeStyle = `rgba(0, 240, 255, ${pulseAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();

        // Target crosshair at center
        if (p.r < 100) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${pulseAlpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(p.x - 8, p.y);
          ctx.lineTo(p.x + 8, p.y);
          ctx.moveTo(p.x, p.y - 8);
          ctx.lineTo(p.x, p.y + 8);
          ctx.stroke();
        }
      });

      // 2. Update and draw nodes
      const maxDistance = 145; // Connection line max distance
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently at screen edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction: gentle gravitic repel / attraction
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          const angle = Math.atan2(dyMouse, dxMouse);
          p.x -= Math.cos(angle) * force * 1.8;
          p.y -= Math.sin(angle) * force * 1.8;
        }

        // Draw node
        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.25 + 0.75;
        const nodeAlpha = Math.min(1, 0.45 * pulse);

        ctx.fillStyle = `${p.colorBase}${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // If Anchor node, draw subtle holographic telemetry ring & diamond
        if (p.isAnchor) {
          ctx.strokeStyle = `${p.colorBase}${nodeAlpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 5 + Math.sin(time * 3 + p.pulseOffset) * 2, 0, Math.PI * 2);
          ctx.stroke();

          // Tiny circuit diamond marker
          const dSize = 3;
          ctx.strokeRect(p.x - dSize, p.y - dSize, dSize * 2, dSize * 2);
        }

        // Connect with neighbouring nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            // Alpha falls off with distance
            let lineAlpha = (1 - dist / maxDistance) * 0.28;

            // Highlight lines near the mouse cursor
            if (distMouse < mouse.radius) {
              lineAlpha = Math.min(0.65, lineAlpha * 2.2);
            }

            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Interactive HTML5 Canvas Constellation */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle Animus Cybernetic vignette gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, transparent 40%, rgba(6, 9, 14, 0.65) 100%)',
        }}
      />
    </div>
  );
}

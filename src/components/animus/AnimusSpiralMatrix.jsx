import React, { useEffect, useRef } from 'react';

/**
 * AnimusSpiralMatrix:
 * A pure HTML5 Canvas Animus Genetic Memory Spiral that works reliably across
 * all browsers, with or without WebGL / GPU hardware acceleration.
 * Features:
 * - Dual intertwined Animus DNA Helixes
 * - Golden & Cyan floating synchronization nodes
 * - Radial Fibonacci logarithmic particle spiral
 * - Mouse reactive wave and pulse
 */
export default function AnimusSpiralMatrix({ className = '' }) {
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

    // Mouse coordinates
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create 180 persistent genetic spiral nodes
    const NODE_COUNT = 180;
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        id: i,
        strand: i % 2 === 0 ? 1 : -1,
        step: i,
        speed: 0.008 + (i % 5) * 0.002,
        size: 1.8 + Math.random() * 2.2,
        alpha: 0.4 + Math.random() * 0.5,
      });
    }

    // 40 ambient floating background glyphs
    const glyphs = [];
    for (let i = 0; i < 40; i++) {
      glyphs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.8 ? '#eab308' : '#00F0FF',
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.018;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear with subtle trail fade
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.68 + (mouse.x - width / 2) * 0.04;
      const centerY = height * 0.45 + (mouse.y - height / 2) * 0.04;

      // 1. Draw connecting base pairs (rungs of DNA double helix)
      ctx.lineWidth = 1;
      for (let i = 0; i < NODE_COUNT - 1; i += 2) {
        const t1 = (i / NODE_COUNT) * Math.PI * 6 + time;
        const progress1 = i / NODE_COUNT;
        const r1 = 30 + progress1 * 260;

        const x1 = centerX + Math.cos(t1) * r1;
        const y1 = centerY + Math.sin(t1) * (r1 * 0.45);

        const t2 = (i / NODE_COUNT) * Math.PI * 6 + time + Math.PI;
        const x2 = centerX + Math.cos(t2) * r1;
        const y2 = centerY + Math.sin(t2) * (r1 * 0.45);

        if (i % 6 === 0) {
          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
          grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
          grad.addColorStop(1, 'rgba(212, 175, 55, 0.25)');
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // 2. Draw Spiral Strand 1 (Cyan / Memory Strand)
      ctx.beginPath();
      for (let i = 0; i < NODE_COUNT; i++) {
        const t = (i / NODE_COUNT) * Math.PI * 6 + time;
        const progress = i / NODE_COUNT;
        const r = 30 + progress * 260;
        const x = centerX + Math.cos(t) * r;
        const y = centerY + Math.sin(t) * (r * 0.45);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00F0FF';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Draw Spiral Strand 2 (Gold / Genetic Ancestry Strand)
      ctx.beginPath();
      for (let i = 0; i < NODE_COUNT; i++) {
        const t = (i / NODE_COUNT) * Math.PI * 6 + time + Math.PI;
        const progress = i / NODE_COUNT;
        const r = 30 + progress * 260;
        const x = centerX + Math.cos(t) * r;
        const y = centerY + Math.sin(t) * (r * 0.45);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#eab308';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Draw glowing nodes on both strands
      nodes.forEach((node) => {
        const strandOffset = node.strand === 1 ? 0 : Math.PI;
        const t = (node.step / NODE_COUNT) * Math.PI * 6 + time + strandOffset;
        const progress = node.step / NODE_COUNT;
        const r = 30 + progress * 260;

        const x = centerX + Math.cos(t) * r;
        const y = centerY + Math.sin(t) * (r * 0.45);

        // Mouse pulse interaction
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseFactor = dist < 120 ? (120 - dist) / 120 : 0;

        const nodeRadius = node.size + mouseFactor * 3.5;
        const isCyan = node.strand === 1;

        ctx.fillStyle = isCyan
          ? (node.step % 4 === 0 ? '#ffffff' : '#00F0FF')
          : (node.step % 5 === 0 ? '#ffffff' : '#eab308');

        ctx.shadowBlur = 12 + mouseFactor * 15;
        ctx.shadowColor = isCyan ? '#00F0FF' : '#eab308';

        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Draw Central Core Pulsing Animus Crest
      const corePulse = Math.sin(time * 3) * 4;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00F0FF';

      // Inner Assassin Chevron
      ctx.beginPath();
      ctx.moveTo(0, -18 - corePulse);
      ctx.lineTo(14 + corePulse * 0.5, 12);
      ctx.lineTo(0, 5);
      ctx.lineTo(-14 - corePulse * 0.5, 12);
      ctx.closePath();
      ctx.stroke();

      // Outer revolving data circle
      ctx.beginPath();
      ctx.arc(0, 0, 24 + corePulse * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 6. Draw floating background telemetry glyphs
      glyphs.forEach((g) => {
        g.x += g.vx;
        g.y += g.vy;
        if (g.y < -20) {
          g.y = height + 20;
          g.x = Math.random() * width;
        }
        if (g.x < -20) g.x = width + 20;
        if (g.x > width + 20) g.x = -20;

        ctx.fillStyle = g.color;
        ctx.globalAlpha = g.alpha;
        ctx.fillRect(g.x, g.y, g.size, g.size);
      });
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ display: 'block' }}
    />
  );
}

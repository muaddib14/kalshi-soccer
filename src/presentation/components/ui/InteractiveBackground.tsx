'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  color?: string;           // Custom color (hex or rgb)
  particleCount?: number;   // How many dots?
  connectionDist?: number;  // How far to connect lines?
  speed?: number;          // How fast they float?
}

const InteractiveBackground: React.FC<Props> = ({ 
  className,
  color = '16, 185, 129', // Default: Emerald-500 (RGB format)
  particleCount = 100,
  connectionDist = 150,
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = { x: -9999, y: -9999 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (distance < maxDist) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDist - distance) / maxDist;
          // Gentle push away or pull towards (current: pull)
          const attractionStrength = 0.05;
          this.vx += forceDirectionX * force * attractionStrength;
          this.vy += forceDirectionY * force * attractionStrength;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Calculate responsive count if default isn't overridden
      const finalCount = particleCount || Math.floor(w / 10);
      for (let i = 0; i < finalCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDist) {
            ctx.beginPath();
            const opacity = 1 - distance / connectionDist;
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.2})`; // Use custom color
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    // Attach listener to the canvas parent for better containment
    canvas.parentElement?.addEventListener('mousemove', (e: any) => handleMouseMove(e));

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, particleCount, connectionDist, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};

export default InteractiveBackground;
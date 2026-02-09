import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 100; // Number of particles
    const connectionDistance = 100; // Distance to connect particles
    const mouseDistance = 150; // Distance for mouse interaction
    const baseSpeed = 0.5; // Slow movement

    // Mouse state
    const mouse = { x: null, y: null };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * baseSpeed;
        this.vy = (Math.random() - 0.5) * baseSpeed;
        this.size = Math.random() * 2 + 1; // Size 1-3
        this.baseColor = 'rgba(200, 200, 200, 0.3)'; // Spectral generic color (faint white/grey)
        this.activeColor = 'rgba(0, 255, 150, 0.8)'; // Green/Blue mix for interaction
        this.color = this.baseColor;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          // Morph color towards Blue/Green (Cyan/SpringGreen mix)
          // We can just switch to active color for simplicity and "spectral" feeling
          this.color = `rgba(0, ${200 + Math.random() * 55}, ${200 + Math.random() * 55}, 0.8)`; // Dynamic Blue/Green
          
          // Gentle push away or attract? Let's attract slightly for "spectral" feel or just color change.
          // Let's just keep movement constant but change appearance.
        } else {
          this.color = this.baseColor;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // specialized spectral background clear (optional, maybe too heavy, stick to clearRect)
      // ctx.fillStyle = 'rgba(10, 10, 20, 0.1)'; // Trail effect? Maybe too messy.
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      particles.forEach((a, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 150, 150, ${1 - distance / connectionDistance})`;
            // If mouse is near one of them, colorize line too
            const activeDistA = Math.sqrt((mouse.x - a.x) ** 2 + (mouse.y - a.y) ** 2);
             if (activeDistA < mouseDistance) {
                 ctx.strokeStyle = `rgba(0, 255, 200, ${1 - distance / connectionDistance})`;
             }

            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', resize); // Typo protection, removing actual listener
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'linear-gradient(to bottom, #001a2c, #000c14, #000000)', // Deep Blue to Black gradient
        pointerEvents: 'none' // Let clicks pass through
      }}
    />
  );
};

export default AnimatedBackground;

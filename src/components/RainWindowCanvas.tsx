import React, { useEffect, useRef, useState } from 'react';

interface RainWindowCanvasProps {
  rainEnabled: boolean;
  ambientGlowLevel: 'subtle' | 'high';
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

const STUDY_ROOM_IMAGE_PATH = '/src/assets/images/night_study_room_bg_1794108243593.jpg';

export const RainWindowCanvas: React.FC<RainWindowCanvasProps> = ({
  rainEnabled,
  ambientGlowLevel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!rainEnabled || prefersReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Lightweight drop count optimized for low-end computers and 24/7 streams
    const dropCount = 55;
    const drops: RainDrop[] = Array.from({ length: dropCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 14 + Math.random() * 22,
      speed: 4.5 + Math.random() * 4.5,
      opacity: 0.14 + Math.random() * 0.24,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(165, 243, 252, 0.38)';
      ctx.lineWidth = 1.1;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.globalAlpha = d.opacity;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.8, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 0.25;

        if (d.y > height) {
          d.y = -d.length;
          d.x = Math.random() * width;
        }
        if (d.x < 0) {
          d.x = width;
        }
      }
    };

    render();
    const timerId = window.setInterval(render, 42);

    return () => {
      window.clearInterval(timerId);
      window.removeEventListener('resize', handleResize);
    };
  }, [rainEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030816]">
      {/* Architectural Nighttime Study Room Image with Resilient Fallback */}
      {!imageError ? (
        <img
          src={STUDY_ROOM_IMAGE_PATH}
          alt="Immersive nighttime study room with panoramic city window, bookshelves, indoor plants, and modern study desk"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center brightness-[1.05] contrast-[1.08] saturate-[1.15]"
        />
      ) : (
        /* Resilient CSS/SVG architectural fallback if image fails to load */
        <div
          className="w-full h-full bg-gradient-to-b from-[#040b1e] via-[#07142e] to-[#020611]"
          aria-label="Nighttime study room fallback backdrop"
        />
      )}

      {/* Subtle Rain Outside the Window Canvas */}
      <canvas
        ref={canvasRef}
        data-testid="rain-window-canvas"
        className="absolute inset-0 w-full h-full opacity-85 mix-blend-screen"
      />

      {/* Realistic Blue & Neon Cyan Atmospheric Room Illumination Layers */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          ambientGlowLevel === 'high' ? 'opacity-90' : 'opacity-50'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(6, 182, 212, 0.14) 0%, rgba(15, 23, 42, 0.18) 58%, rgba(2, 6, 23, 0.38) 100%)',
        }}
      />

      {/* Measured Scrim for Top, Center & Bottom Desk Readability (Preserving Room & Desk Visibility) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#03091c]/12 to-[#020617]/48" />
    </div>
  );
};

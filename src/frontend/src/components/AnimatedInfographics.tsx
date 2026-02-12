import { useEffect, useRef } from 'react';

export default function AnimatedInfographics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw animated data flow lines
      ctx.strokeStyle = 'oklch(0.7 0.25 145)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const y = (canvas.height / 6) * (i + 1);
        for (let x = 0; x < canvas.width; x += 10) {
          const wave = Math.sin((x + offset) * 0.02) * 10;
          if (x === 0) {
            ctx.moveTo(x, y + wave);
          } else {
            ctx.lineTo(x, y + wave);
          }
        }
        ctx.stroke();
      }

      offset += 2;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative">
      <img
        src="/assets/generated/keylogger-types-infographic.dim_1600x900.png"
        alt="Keylogger Types Infographic"
        className="w-full rounded-lg border border-border"
      />
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      />
    </div>
  );
}

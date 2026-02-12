import { useEffect, useRef } from 'react';
import type { RiskLevel } from '../hooks/useSimulationState';

interface ThreatMeter3DProps {
  level: RiskLevel;
  percentage: number;
}

export default function ThreatMeter3D({ level, percentage }: ThreatMeter3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 12;
      ctx.stroke();

      // Progress arc
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (percentage / 100) * 2 * Math.PI;

      const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      if (level === 'Low') {
        gradient.addColorStop(0, 'oklch(0.7 0.25 145)');
        gradient.addColorStop(1, 'oklch(0.6 0.25 145)');
      } else if (level === 'Medium') {
        gradient.addColorStop(0, 'oklch(0.75 0.20 85)');
        gradient.addColorStop(1, 'oklch(0.65 0.20 85)');
      } else {
        gradient.addColorStop(0, 'oklch(0.65 0.25 0)');
        gradient.addColorStop(1, 'oklch(0.55 0.25 0)');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Center text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage}%`, centerX, centerY);

      ctx.font = '12px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillText(level, centerX, centerY + 25);
    };

    animate();
  }, [level, percentage]);

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} width={200} height={200} className="drop-shadow-lg" />
    </div>
  );
}

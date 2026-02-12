import { ReactNode } from 'react';

interface RotatingDashboardCardProps {
  children: ReactNode;
  className?: string;
}

export default function RotatingDashboardCard({ children, className = '' }: RotatingDashboardCardProps) {
  return (
    <div
      className={`rotating-card ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }}
    >
      {children}
    </div>
  );
}

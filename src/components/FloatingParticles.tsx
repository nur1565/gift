import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'heart' | 'sparkle' | 'petal';
}

export const FloatingParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 12) + 10,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.3,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'petal' : 'sparkle',
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: `${p.left}%`,
            bottom: '-20px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUpward ${p.duration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' && (
            <svg
              className="text-[#D88CA0] inline-block drop-shadow-sm"
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.type === 'petal' && (
            <span
              className="inline-block transform rotate-45 text-[#F8C8DC]"
              style={{ fontSize: `${p.size}px` }}
            >
              🌸
            </span>
          )}
          {p.type === 'sparkle' && (
            <svg
              className="text-[#D88CA0] inline-block animate-pulse"
              width={p.size * 0.8}
              height={p.size * 0.8}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}
        </span>
      ))}
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) translateX(${Math.sin(2) * 30}px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

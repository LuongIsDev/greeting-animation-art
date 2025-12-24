import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
}

const balloonColors = [
  'hsl(340 80% 60%)', // primary pink
  'hsl(45 90% 55%)',  // gold
  'hsl(280 60% 70%)', // lavender
  'hsl(15 85% 65%)',  // coral
  'hsl(200 80% 60%)', // sky blue
];

const Balloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const newBalloons: Balloon[] = [];
    for (let i = 0; i < 12; i++) {
      newBalloons.push({
        id: i,
        left: 5 + (i * 8),
        delay: Math.random() * 2,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        size: 60 + Math.random() * 30,
      });
    }
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-float"
          style={{
            left: `${balloon.left}%`,
            bottom: `${-20 - Math.random() * 20}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {/* Balloon body */}
          <div
            className="relative"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
              backgroundColor: balloon.color,
              borderRadius: '50% 50% 45% 45%',
              boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.3)`,
            }}
          >
            {/* Balloon knot */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -8,
                width: 12,
                height: 12,
                backgroundColor: balloon.color,
                clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
              }}
            />
            {/* Balloon string */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -80,
                width: 2,
                height: 70,
                background: `linear-gradient(to bottom, ${balloon.color}, transparent)`,
              }}
            />
            {/* Shine effect */}
            <div
              className="absolute"
              style={{
                top: '15%',
                left: '20%',
                width: '20%',
                height: '25%',
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: '50%',
                transform: 'rotate(-30deg)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Balloons;

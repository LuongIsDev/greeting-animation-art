import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
}

const colors = [
  'hsl(340 80% 60%)', // primary pink
  'hsl(45 90% 55%)',  // gold
  'hsl(280 60% 70%)', // lavender
  'hsl(15 85% 65%)',  // coral
  'hsl(340 70% 75%)', // rose
];

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
      });
    }
    setPieces(newPieces);
  }, []);

  const getShapeStyles = (shape: string, color: string) => {
    switch (shape) {
      case 'circle':
        return { borderRadius: '50%', backgroundColor: color };
      case 'square':
        return { backgroundColor: color };
      case 'triangle':
        return {
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: `14px solid ${color}`,
        };
      default:
        return { backgroundColor: color };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: piece.shape === 'triangle' ? 0 : piece.size,
            height: piece.shape === 'triangle' ? 0 : piece.size,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            ...getShapeStyles(piece.shape, piece.color),
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;

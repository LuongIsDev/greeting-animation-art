import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'date' | 'name' | 'flyUp' | 'galaxy' | 'fallDown' | 'countdown' | 'complete'>('date');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timeline = [
      { phase: 'name' as const, delay: 1500 },
      { phase: 'flyUp' as const, delay: 2000 },
      { phase: 'galaxy' as const, delay: 1200 },
      { phase: 'fallDown' as const, delay: 3000 },
      { phase: 'countdown' as const, delay: 1500 },
    ];

    let timeouts: NodeJS.Timeout[] = [];
    let accumulated = 0;

    timeline.forEach(({ phase: p, delay }) => {
      accumulated += delay;
      const timeout = setTimeout(() => {
        setPhase(p);
      }, accumulated);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Countdown effect
  useEffect(() => {
    if (phase === 'countdown') {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setTimeout(() => {
              setPhase('complete');
              onComplete();
            }, 800);
            return 0;
          }
          return prev - 1;
        });
      }, 800);

      return () => clearInterval(countdownInterval);
    }
  }, [phase, onComplete]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-all duration-1000 ${
      phase === 'galaxy' ? 'bg-galaxy' : 'bg-festive-gradient'
    }`}>
      
      {/* Galaxy/Milky Way Background */}
      {(phase === 'galaxy' || phase === 'fallDown') && (
        <div className="absolute inset-0 bg-black overflow-hidden">
          {/* Stars layer */}
          <div className="absolute inset-0">
            {[...Array(200)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Milky way band */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-[200%] h-40 md:h-60 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent rotate-[-20deg] blur-xl"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.1) 20%, rgba(168, 85, 247, 0.3) 50%, rgba(147, 51, 234, 0.1) 80%, transparent 100%)',
              }}
            />
          </div>
          
          {/* Colorful nebula effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full bg-pink-500/10 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          {/* Shooting stars */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-shooting-star"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_white,-20px_0_20px_rgba(255,255,255,0.5),-40px_0_30px_rgba(255,255,255,0.3)]" />
            </div>
          ))}

          {/* Galaxy text */}
          {phase === 'galaxy' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center animate-galaxy-reveal">
                <p className="font-display text-3xl md:text-5xl text-white/90 mb-4 animate-pulse">
                  ✨ Giữa dải ngân hà ✨
                </p>
                <p className="font-body text-lg md:text-xl text-white/70">
                  Một ngôi sao đặc biệt đang tỏa sáng...
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating particles - initial phase */}
      {(phase === 'date' || phase === 'name' || phase === 'flyUp') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content - Date & Name */}
      <div 
        className={`flex flex-col items-center justify-center transition-all duration-1000 ease-out
          ${phase === 'flyUp' ? 'animate-fly-up' : ''}
          ${phase === 'galaxy' || phase === 'fallDown' || phase === 'countdown' || phase === 'complete' ? 'hidden' : ''}
        `}
      >
        {/* Date - 25/12 */}
        <div 
          className={`transition-all duration-700 ease-out ${
            phase === 'date' || phase === 'name' || phase === 'flyUp'
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-10 scale-50'
          }`}
        >
          <div className="relative">
            <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] text-gradient-festive animate-pulse-glow-text">
              25/12
            </h1>
            <span className="absolute -top-4 -left-4 text-3xl md:text-4xl animate-sparkle">✨</span>
            <span className="absolute -top-4 -right-4 text-3xl md:text-4xl animate-sparkle" style={{ animationDelay: '0.3s' }}>✨</span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl md:text-3xl animate-sparkle" style={{ animationDelay: '0.6s' }}>🎄</span>
          </div>
        </div>

        {/* Name */}
        <div 
          className={`mt-6 md:mt-8 transition-all duration-700 ease-out delay-300 ${
            phase === 'name' || phase === 'flyUp'
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-10 scale-75'
          }`}
        >
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary text-center leading-tight">
              Nguyễn Kế Việt Anh
            </h2>
            <div className="flex justify-center gap-3 mt-4 text-2xl md:text-3xl">
              <span className="animate-float" style={{ animationDelay: '0s' }}>🎂</span>
              <span className="animate-float" style={{ animationDelay: '0.2s' }}>🎁</span>
              <span className="animate-float" style={{ animationDelay: '0.4s' }}>🎈</span>
              <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎉</span>
            </div>
          </div>
        </div>

        <div 
          className={`mt-8 transition-all duration-500 delay-500 ${
            phase === 'name' || phase === 'flyUp' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-body text-lg md:text-xl text-foreground/70 text-center">
            Sinh nhật vui vẻ! 🌟
          </p>
        </div>
      </div>

      {/* Falling card from galaxy */}
      {phase === 'fallDown' && (
        <div className="animate-card-fall-galaxy">
          <div className="relative">
            {/* Card with glow */}
            <div className="w-40 h-52 md:w-56 md:h-72 rounded-2xl bg-gradient-to-br from-card to-cream shadow-[0_0_60px_rgba(236,72,153,0.5)] border-2 border-primary/30 flex items-center justify-center overflow-hidden">
              <div className="text-center p-4">
                <div className="text-5xl md:text-6xl mb-3 animate-bounce">🎂</div>
                <p className="font-display text-xl md:text-2xl text-gradient-festive">Happy Birthday!</p>
              </div>
            </div>
            
            {/* Trailing stars */}
            {[...Array(15)].map((_, i) => (
              <span
                key={i}
                className="absolute text-lg md:text-xl animate-trail-star-long"
                style={{
                  top: `${-30 - i * 20}px`,
                  left: `${50 + (Math.random() - 0.5) * 60}%`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {['⭐', '✨', '🌟'][i % 3]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Countdown 3 2 1 */}
      {phase === 'countdown' && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-body text-xl md:text-2xl text-foreground/70 mb-6">Thiệp sẽ mở trong...</p>
          <div className="relative">
            <div 
              key={countdown}
              className="font-display text-9xl md:text-[12rem] text-gradient-festive animate-countdown-pop"
            >
              {countdown === 0 ? '🎉' : countdown}
            </div>
            {/* Ring effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 md:w-60 md:h-60 rounded-full border-4 border-primary/50 animate-ping" />
            </div>
          </div>
          {countdown > 0 && (
            <div className="flex gap-2 mt-8 text-3xl">
              {['🎈', '🎁', '🎊'].map((emoji, i) => (
                <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
                  {emoji}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom decorative wave */}
      {(phase === 'date' || phase === 'name') && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/10 to-transparent" />
      )}
    </div>
  );
};

export default IntroAnimation;

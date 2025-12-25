import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BirthdayCardProps {
  isVisible: boolean;
  message: string;
  recipientName: string;
}

const BirthdayCard = ({ isVisible, message, recipientName }: BirthdayCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // === ĐƯỜNG DẪN ẢNH CỐ ĐỊNH ===
  // Thay đổi link này thành ảnh bạn muốn hiển thị cố định
  // File ảnh nên được đặt trong thư mục public để hoạt động với GitHub Pages
  const fixedPhotoPath = `${import.meta.env.BASE_URL}ảnh việt.jpg`;

  // Ảnh fallback nếu link chính bị lỗi
  const fallbackPhoto = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80';

  // Birthday music
  useEffect(() => {
    if (isVisible) {
      audioRef.current = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log('Autoplay prevented, click to play');
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isVisible]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (isVisible) {
      const openTimer = setTimeout(() => setIsOpen(true), 500);
      const textTimer = setTimeout(() => setShowText(true), 2000);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(textTimer);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (showText && visibleChars < message.length) {
      const timer = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [showText, visibleChars, message.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 p-2 md:p-4">
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-up text-2xl md:text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {['❤️', '💕', '💖', '💗', '💝', '✨', '🌟', '⭐'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      {/* Music toggle button */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform border border-primary/20"
      >
        {isMuted ? <VolumeX className="w-6 h-6 text-primary" /> : <Volume2 className="w-6 h-6 text-primary" />}
      </button>

      <div className="relative animate-bounce-in" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
        <div className="relative w-[95vw] max-w-2xl md:max-w-3xl lg:max-w-4xl" style={{ transformStyle: 'preserve-3d' }}>
          {/* Card flap (top part) */}
          <div
            className={`absolute inset-x-0 top-0 h-40 md:h-52 lg:h-60 rounded-t-3xl bg-gradient-to-b from-rose to-primary/20 shadow-lg origin-bottom transition-transform duration-1000 ease-out ${isOpen ? 'animate-card-open' : ''}`}
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-0 rounded-t-3xl bg-card flex items-center justify-center overflow-hidden border-2 border-primary/20">
              <div className="text-center p-4 md:p-6">
                <div className="text-5xl md:text-7xl lg:text-8xl mb-2 md:mb-4 animate-pulse">🎂</div>
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-gradient-festive">
                  Happy Birthday!
                </h2>
              </div>
              <div className="absolute top-3 left-3 text-2xl md:text-3xl animate-float">🎈</div>
              <div className="absolute top-3 right-3 text-2xl md:text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎈</div>
              <div className="absolute bottom-3 left-3 text-xl md:text-2xl animate-sparkle">✨</div>
              <div className="absolute bottom-3 right-3 text-xl md:text-2xl animate-sparkle" style={{ animationDelay: '0.3s' }}>✨</div>
              <div className="absolute top-1/2 left-3 text-xl animate-float" style={{ animationDelay: '0.2s' }}>🎁</div>
              <div className="absolute top-1/2 right-3 text-xl animate-float" style={{ animationDelay: '0.7s' }}>🎁</div>
            </div>
          </div>

          {/* Main card content */}
          <div className="w-full min-h-[85vh] md:min-h-[80vh] rounded-3xl bg-card shadow-2xl animate-pulse-glow overflow-hidden border-2 border-primary/10">
            {/* Photo section */}
            <div className="h-40 md:h-52 lg:h-60 bg-gradient-to-b from-cream via-card to-card relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative mt-8 md:mt-12">
                  <div className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full border-4 border-primary/30 shadow-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 animate-glow-pulse">
                    <img
                      src={fixedPhotoPath}
                      alt="Người được chúc mừng sinh nhật"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = fallbackPhoto;
                      }}
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/50 animate-spin-slow" style={{ margin: '-8px' }} />
                  {/* Stars around photo */}
                  <div className="absolute -top-2 -left-2 text-xl md:text-2xl animate-sparkle">⭐</div>
                  <div className="absolute -top-2 -right-2 text-xl md:text-2xl animate-sparkle" style={{ animationDelay: '0.2s' }}>⭐</div>
                  <div className="absolute -bottom-2 -left-2 text-xl md:text-2xl animate-sparkle" style={{ animationDelay: '0.4s' }}>🌟</div>
                  <div className="absolute -bottom-2 -right-2 text-xl md:text-2xl animate-sparkle" style={{ animationDelay: '0.6s' }}>🌟</div>
                </div>
              </div>

              {/* Background decorations */}
              <div className="absolute top-2 left-4 text-2xl md:text-3xl opacity-30">🎀</div>
              <div className="absolute top-2 right-4 text-2xl md:text-3xl opacity-30">🎀</div>
              <div className="absolute bottom-4 left-8 text-xl opacity-20">🎉</div>
              <div className="absolute bottom-4 right-8 text-xl opacity-20">🎊</div>
            </div>

            {/* Message section */}
            <div className="p-4 md:p-8 lg:p-10 text-center">
              <h3
                className={`font-display text-2xl md:text-4xl lg:text-5xl text-gradient-festive mb-4 md:mb-6 transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                Gửi {recipientName} thân yêu 💕
              </h3>

              <div className={`flex items-center justify-center gap-2 mb-4 md:mb-6 transition-all duration-500 delay-300 ${showText ? 'opacity-100' : 'opacity-0'}`}>
                <div className="h-0.5 w-12 md:w-20 bg-gradient-to-r from-transparent to-primary/50" />
                <span className="text-xl md:text-2xl">🌸</span>
                <div className="h-0.5 w-12 md:w-20 bg-gradient-to-l from-transparent to-primary/50" />
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 border border-primary/10">
                <p className="font-body text-base md:text-xl lg:text-2xl text-foreground/90 leading-relaxed min-h-[100px] md:min-h-[120px]">
                  {message.slice(0, visibleChars)}
                  {visibleChars < message.length && showText && (
                    <span className="animate-pulse text-primary">|</span>
                  )}
                </p>
              </div>

              {visibleChars >= message.length && (
                <div className="animate-text-reveal space-y-3 md:space-y-4">
                  <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl">
                    <span className="animate-float" style={{ animationDelay: '0s' }}>🌹</span>
                    <span className="animate-float" style={{ animationDelay: '0.2s' }}>💐</span>
                    <span className="animate-float" style={{ animationDelay: '0.4s' }}>🌹</span>
                  </div>
                  <p className="font-display text-xl md:text-3xl lg:text-4xl text-gradient-festive">
                    Với tất cả yêu thương ❤️
                  </p>
                  <div className="flex items-center justify-center gap-3 text-3xl md:text-4xl mt-4">
                    <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎂</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎁</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎈</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎉</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎊</span>
                  </div>
                </div>
              )}
            </div>

            <div className="h-3 md:h-4 bg-gradient-to-r from-primary/20 via-secondary/30 to-accent/20" />
          </div>
        </div>
      </div>

      {/* Extra sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${8 + Math.random() * 16}px`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCard;
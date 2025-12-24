import { useState, useEffect } from 'react';
import Confetti from '@/components/Confetti';
import Balloons from '@/components/Balloons';
import Sparkles from '@/components/Sparkles';
import BirthdayCard from '@/components/BirthdayCard';
import IntroAnimation from '@/components/IntroAnimation';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showEffects, setShowEffects] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const recipientName = "Nguyễn Kế Việt Anh";
  const birthdayMessage = "Chúc em ngày sinh nhật thật vui vẻ và tràn đầy niềm vui! Mong rằng năm mới tuổi mới sẽ mang đến cho emthật nhiều may mắn, sức khỏe và thành công. Đặc biệt là tuổi mới dậy thì xong hết mụn và càng ngày càng đẹp trai nhá! 🌟🎂🎁";
  const photoUrl = "";

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowEffects(true);
    
    // Show card after effects have been playing for a while
    setTimeout(() => {
      setShowCard(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-festive-gradient overflow-hidden relative">
      {/* SEO */}
      <title>Chúc Mừng Sinh Nhật! 🎂</title>
      <meta name="description" content="Thiệp chúc mừng sinh nhật đặc biệt với hiệu ứng động tuyệt đẹp" />

      {/* Intro countdown */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Background effects */}
      {showEffects && (
        <>
          <Confetti />
          <Balloons />
          <Sparkles />
        </>
      )}

      {/* Main title - visible after intro */}
      {!showIntro && !showCard && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-30 animate-bounce-in">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient-festive mb-4 text-center px-4">
            Happy Birthday!
          </h1>
          <div className="flex gap-2 text-4xl md:text-6xl">
            <span className="animate-float" style={{ animationDelay: '0s' }}>🎈</span>
            <span className="animate-float" style={{ animationDelay: '0.2s' }}>🎂</span>
            <span className="animate-float" style={{ animationDelay: '0.4s' }}>🎁</span>
            <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎉</span>
            <span className="animate-float" style={{ animationDelay: '0.8s' }}>🎈</span>
          </div>
        </div>
      )}

      {/* Birthday card */}
      <BirthdayCard 
        isVisible={showCard} 
        message={birthdayMessage}
        recipientName={recipientName}

      />

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/15 blur-2xl" />
      </div>
    </div>
  );
};

export default Index;

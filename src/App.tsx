import { useState, useEffect, useRef } from "react";
import { Timer } from "./components/Timer";
import { Navigation } from "./components/Navigation";
import { AboutPage } from "./components/AboutPage";
import { DateSelector } from "./components/DateSelector";
import { setCookie, getCookie, deleteCookie } from "./utils/cookies";
import musicURL from '/Lacrimosa500.mp3';

export default function App() {
  const [currentPage, setCurrentPage] = useState('timer');
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Załaduj zapisaną datę z cookies przy starcie
  useEffect(() => {
    const savedDate = getCookie('targetDate');
    if (savedDate) {
      const date = new Date(savedDate);
      // Sprawdź czy data nie jest w przeszłości
      if (date.getTime() > Date.now()) {
        setTargetTime(date);
      } else {
        // Usuń przeterminowaną datę
        deleteCookie('targetDate');
      }
    }
    setIsInitialized(true);
  }, []);

  const handleDateSet = (date: Date) => {
    setTargetTime(date);
    // Zapisz datę w cookies
    setCookie('targetDate', date.toISOString(), 30);
    setCurrentPage('timer');
  };

  const handleNewCountdown = () => {
    setTargetTime(null);
    deleteCookie('targetDate');
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'timer':
        return <Timer targetTime={targetTime!} onNewCountdown={handleNewCountdown} />;
      case 'settings':
        return <DateSelector onDateSet={handleDateSet} isSettingsPage={true} />;
      case 'about':
        return <AboutPage />;
      default:
        return <Timer targetTime={targetTime!} onNewCountdown={handleNewCountdown} />;
    }
  };

  // Pokaż loading lub selektor daty jeśli nie ma zapisanej daty
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-gray-600 text-2xl tracking-[0.2em] font-thin">
          ŁADOWANIE...
        </div>
      </div>
    );
  }

  if (!targetTime) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <DateSelector onDateSet={handleDateSet} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative">
      <audio ref={audioRef} src={musicURL} loop />
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
      />
      {renderCurrentPage()}
    </div>
  );
}
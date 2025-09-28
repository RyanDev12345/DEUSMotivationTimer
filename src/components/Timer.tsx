import { useState, useEffect } from 'react';

interface TimerProps {
  targetTime?: Date;
  onNewCountdown?: () => void;
}

export function Timer({ targetTime: propTargetTime, onNewCountdown }: TimerProps) {
  // Ustawiam czas docelowy na 1 godzinę od teraz jako przykład, lub używam przekazanego czasu
  const [targetTime] = useState(() => propTargetTime || new Date(Date.now() + 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetTime.getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft(difference);
      } else {
        setTimeLeft(0);
      }
    };

    // Aktualizuj co 10ms dla płynności milisekund
    const interval = setInterval(updateTimer, 10);
    updateTimer(); // Pierwsze uruchomienie

    return () => clearInterval(interval);
  }, [targetTime]);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10); // Wyświetlaj dziesiątki milisekund

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: ms.toString().padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  // Czerwony kolor gdy mało czasu (mniej niż 5 minut)
  const isUrgent = timeLeft < 5 * 60 * 1000;
  const isVeryUrgent = timeLeft < 60 * 1000;

  return (
    <div className="flex flex-col items-center space-y-12 w-full">
      {/* Główny nagłówek */}
      <div className="text-center animate-pulse">
        <h1 className="text-gray-400 text-5xl tracking-[0.3em] mb-4 font-thin opacity-80">
          CZAS TYKA.
        </h1>
      </div>

      {/* Podnagłówek */}
      <div className="text-center">
        <h2 className={`text-3xl tracking-[0.2em] font-thin transition-colors duration-500 ${
          isVeryUrgent ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-gray-500'
        }`}>
          POZOSTAŁY CZAS:
        </h2>
      </div>

      {/* Główny licznik - bez boxa, samo na czarnym tle */}
      <div className="w-full flex items-center justify-center">
        <div className={`flex items-center justify-center space-x-2 transition-all duration-200 ${
          isVeryUrgent ? 'animate-pulse' : ''
        }`}>
          {/* Godziny */}
          <div className="text-center">
            <div className={`text-9xl font-mono font-thin tracking-wider transition-colors duration-500 ${
              isVeryUrgent ? 'text-red-500' : isUrgent ? 'text-orange-400' : 'text-white'
            }`}>
              {time.hours}
            </div>
            <div className="text-xs text-gray-600 mt-4 tracking-[0.2em] uppercase font-thin">
              GODZ
            </div>
          </div>

          {/* Separator */}
          <div className={`text-8xl font-mono transition-colors duration-500 ${
            isVeryUrgent ? 'text-red-600' : isUrgent ? 'text-orange-500' : 'text-gray-700'
          }`}>:</div>

          {/* Minuty */}
          <div className="text-center">
            <div className={`text-9xl font-mono font-thin tracking-wider transition-colors duration-500 ${
              isVeryUrgent ? 'text-red-500' : isUrgent ? 'text-orange-400' : 'text-white'
            }`}>
              {time.minutes}
            </div>
            <div className="text-xs text-gray-600 mt-4 tracking-[0.2em] uppercase font-thin">
              MIN
            </div>
          </div>

          {/* Separator */}
          <div className={`text-8xl font-mono transition-colors duration-500 ${
            isVeryUrgent ? 'text-red-600' : isUrgent ? 'text-orange-500' : 'text-gray-700'
          }`}>:</div>

          {/* Sekundy */}
          <div className="text-center">
            <div className={`text-9xl font-mono font-thin tracking-wider transition-colors duration-500 ${
              isVeryUrgent ? 'text-red-500' : isUrgent ? 'text-orange-400' : 'text-white'
            }`}>
              {time.seconds}
            </div>
            <div className="text-xs text-gray-600 mt-4 tracking-[0.2em] uppercase font-thin">
              SEK
            </div>
          </div>

          {/* Separator */}
          <div className={`text-8xl font-mono transition-colors duration-500 ${
            isVeryUrgent ? 'text-red-600' : isUrgent ? 'text-orange-500' : 'text-gray-700'
          }`}>:</div>

          {/* Milisekundy */}
          <div className="text-center">
            <div className={`text-9xl font-mono font-thin tracking-wider transition-colors duration-500 ${
              isVeryUrgent ? 'text-red-500' : isUrgent ? 'text-orange-400' : 'text-white'
            }`}>
              {time.milliseconds}
            </div>
            <div className="text-xs text-gray-600 mt-4 tracking-[0.2em] uppercase font-thin">
              MS
            </div>
          </div>
        </div>
      </div>

      {/* Minimalistyczna linia pod spodem */}
      <div className={`w-64 h-px transition-colors duration-1000 ${
        isVeryUrgent ? 'bg-red-800' : isUrgent ? 'bg-orange-800' : 'bg-gray-800'
      }`}></div>

      {/* Przycisk nowego odliczania gdy czas się skończy */}
      {timeLeft === 0 && onNewCountdown && (
        <div className="text-center mt-12 animate-pulse">
          <button
            onClick={onNewCountdown}
            className="px-12 py-3 border-2 border-red-500 text-red-500 text-lg tracking-[0.2em] font-thin hover:bg-red-500 hover:text-black transition-all duration-300"
          >
            NOWE ODLICZANIE
          </button>
        </div>
      )}
    </div>
  );
}
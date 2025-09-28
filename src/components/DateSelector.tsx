import { useState } from 'react';

interface DateSelectorProps {
  onDateSet: (targetDate: Date) => void;
  isSettingsPage?: boolean;
}

export function DateSelector({ onDateSet, isSettingsPage }: DateSelectorProps) {
  const today = new Date();
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1); // Miesiące 1-12
  const [year, setYear] = useState(today.getFullYear());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleSubmit = () => {
    const targetDate = new Date(year, month - 1, day, hours, minutes, 0);
    
    // Sprawdź czy data nie jest w przeszłości
    if (targetDate.getTime() <= Date.now()) {
      // Jeśli data jest w przeszłości, ustaw na jutro o tej samej godzinie
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(hours, minutes, 0, 0);
      onDateSet(tomorrow);
    } else {
      onDateSet(targetDate);
    }
  };

  const formatDateForDisplay = () => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Sprawdź ile dni ma dany miesiąc
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(month, year);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Główny nagłówek */}
      <div className="text-center">
        {isSettingsPage ? (
          <div className="h-24"></div> // Placeholder for spacing
        ) : (
          <div className="animate-pulse mb-8">
            <h1 className="text-gray-400 text-6xl tracking-[0.3em] mb-4 font-thin opacity-80">
              CZAS TYKA.
            </h1>
          </div>
        )}
        <h2 className="text-gray-500 text-3xl tracking-[0.2em] font-thin">
          {isSettingsPage ? 'USTAW NOWĄ DATĘ' : 'WYBIERZ DATĘ DOCELOWĄ'}
        </h2>
        <div className="w-48 h-px bg-gray-800 mx-auto mt-8"></div>
      </div>

      {/* Główny kafelek selektora */}
      <div className="bg-black/30 backdrop-blur-lg border border-purple-500/20 shadow-lg shadow-purple-500/10 rounded-lg p-12 w-full max-w-4xl mt-8">
        <div>
          {/* Selektor daty i czasu w jednej linii */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {/* Dzień */}
            <div className="text-center">
              <label className="text-gray-400 text-xs tracking-[0.2em] font-thin uppercase block mb-4">
                DZIEŃ
              </label>
              <input
                type="number"
                min="1"
                max={daysInMonth}
                value={day}
                onChange={(e) => {
                  const newDay = parseInt(e.target.value) || 1;
                  if (newDay >= 1 && newDay <= daysInMonth) {
                    setDay(newDay);
                  }
                }}
                className="w-20 h-16 bg-black border border-gray-700 text-white text-3xl font-mono font-thin text-center focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="text-gray-700 text-3xl font-thin mt-8">/</div>

            {/* Miesiąc */}
            <div className="text-center">
              <label className="text-gray-400 text-xs tracking-[0.2em] font-thin uppercase block mb-4">
                MIESIĄC
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => {
                  const newMonth = parseInt(e.target.value) || 1;
                  if (newMonth >= 1 && newMonth <= 12) {
                    setMonth(newMonth);
                    // Sprawdź czy dzień jest prawidłowy dla nowego miesiąca
                    const newDaysInMonth = getDaysInMonth(newMonth, year);
                    if (day > newDaysInMonth) {
                      setDay(newDaysInMonth);
                    }
                  }
                }}
                className="w-20 h-16 bg-black border border-gray-700 text-white text-3xl font-mono font-thin text-center focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="text-gray-700 text-3xl font-thin mt-8">/</div>

            {/* Rok */}
            <div className="text-center">
              <label className="text-gray-400 text-xs tracking-[0.2em] font-thin uppercase block mb-4">
                ROK
              </label>
              <input
                type="number"
                min={today.getFullYear()}
                max={today.getFullYear() + 10}
                value={year}
                onChange={(e) => {
                  const newYear = parseInt(e.target.value) || today.getFullYear();
                  if (newYear >= today.getFullYear()) {
                    setYear(newYear);
                    // Sprawdź czy dzień jest prawidłowy dla nowego roku (przestępny)
                    const newDaysInMonth = getDaysInMonth(month, newYear);
                    if (day > newDaysInMonth) {
                      setDay(newDaysInMonth);
                    }
                  }
                }}
                className="w-24 h-16 bg-black border border-gray-700 text-white text-3xl font-mono font-thin text-center focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Separator między datą a czasem */}
            <div className="mx-8">
              <div className="w-px h-16 bg-gray-700 mt-8"></div>
            </div>

            {/* Godzina */}
            <div className="text-center">
              <label className="text-gray-400 text-xs tracking-[0.2em] font-thin uppercase block mb-4">
                GODZ
              </label>
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                className="w-20 h-16 bg-black border border-gray-700 text-white text-3xl font-mono font-thin text-center focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="text-gray-700 text-3xl font-thin mt-8">:</div>

            {/* Minuta */}
            <div className="text-center">
              <label className="text-gray-400 text-xs tracking-[0.2em] font-thin uppercase block mb-4">
                MIN
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                className="w-20 h-16 bg-black border border-gray-700 text-white text-3xl font-mono font-thin text-center focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Wyświetlanie wybranej daty */}
          <div className="text-center mt-8">
            <div className="text-gray-600 text-lg font-thin">
              {formatDateForDisplay()}
            </div>
          </div>
        </div>
      </div>

      {/* Przycisk rozpocznij */}
      <div className="text-center mt-12">
        <button
          onClick={handleSubmit}
          className="px-16 py-4 border-2 border-white text-white text-xl tracking-[0.3em] font-thin hover:bg-white hover:text-black transition-all duration-500 group"
        >
          <span className="group-hover:tracking-[0.4em] transition-all duration-300">
            ROZPOCZNIJ
          </span>
        </button>
      </div>

      {/* Minimalistyczna linia */}
      <div className="w-96 h-px bg-gray-800 mt-12"></div>
    </div>
  );
}
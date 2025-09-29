interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

export function Navigation({ currentPage, onPageChange, isMusicPlaying, toggleMusic }: NavigationProps) {
  const pages = [
    { id: 'timer', label: 'LICZNIK' },
    { id: 'settings', label: 'NOWY CZAS' },
    // { id: 'about', label: 'O APLIKACJI' }
  ];

  const SoundOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
  );

  const SoundOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  );

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-8">
      <div className="flex space-x-8">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className={`text-sm tracking-[0.2em] font-thin transition-all duration-300 hover:text-white ${
              currentPage === page.id 
                ? 'text-white border-b border-gray-600' 
                : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>
      <button 
        onClick={toggleMusic}
        className="text-gray-600 hover:text-white transition-colors duration-300"
        aria-label={isMusicPlaying ? "Wyłącz muzykę" : "Włącz muzykę"}
      >
        {isMusicPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>
    </nav>
  );
}
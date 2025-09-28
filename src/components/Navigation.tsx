interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { id: 'timer', label: 'LICZNIK' },
    { id: 'settings', label: 'NOWY CZAS' },
    // { id: 'about', label: 'O APLIKACJI' }
  ];

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
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
    </nav>
  );
}
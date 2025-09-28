export function AboutPage() {
  return (
    <div className="flex flex-col items-center space-y-12 w-full max-w-4xl mx-auto">
      {/* Nagłówek */}
      <div className="text-center">
        <h1 className="text-gray-400 text-5xl tracking-[0.3em] mb-4 font-thin opacity-80">
          O APLIKACJI
        </h1>
        <div className="w-32 h-px bg-gray-800 mx-auto"></div>
      </div>

      {/* Główna treść */}
      <div className="space-y-8 text-center max-w-2xl">
        <div className="space-y-6">
          <h2 className="text-gray-500 text-2xl tracking-[0.2em] font-thin">
            MINIMALISTYCZNY LICZNIK CZASU
          </h2>
          
          <div className="text-gray-600 text-lg font-thin leading-relaxed space-y-4">
            <p>
              Aplikacja stworzona z myślą o przypominaniu, że czas nieustannie płynie.
            </p>
            
            <p>
              Czarny design i surowe liczby mają wzbudzać lekki niepokój - 
              czas rzeczywiście ucieka i nie wróci.
            </p>
            
            <p>
              Gdy zostanie mniej niż 5 minut, liczby zmieniają kolor na pomarańczowy.
              W ostatniej minucie stają się czerwone i pulsują.
            </p>
          </div>
        </div>

        {/* Funkcje */}
        <div className="space-y-6 mt-16">
          <h3 className="text-gray-500 text-xl tracking-[0.2em] font-thin">
            FUNKCJE
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 font-thin">
            <div className="space-y-2">
              <div className="text-white text-sm tracking-[0.1em]">PRECYZJA</div>
              <div className="text-sm">Dokładność do dziesiątek milisekund</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-white text-sm tracking-[0.1em]">OSTRZEŻENIA</div>
              <div className="text-sm">Kolory zmieniają się gdy czas się kończy</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-white text-sm tracking-[0.1em]">MINIMALIZM</div>
              <div className="text-sm">Czyste, surowe wyświetlanie</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-white text-sm tracking-[0.1em]">USTAWIENIA</div>
              <div className="text-sm">Dowolny czas docelowy</div>
            </div>
          </div>
        </div>

        {/* Cytat */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <blockquote className="text-gray-500 text-xl font-thin italic tracking-wide">
            "Czas to jedyny prawdziwy kapitał, jaki posiada każdy człowiek,<br />
            a jedyne, czego nie może sobie pozwolić na stracenie."
          </blockquote>
          <cite className="text-gray-700 text-sm mt-4 block">— Thomas Edison</cite>
        </div>
      </div>
    </div>
  );
}
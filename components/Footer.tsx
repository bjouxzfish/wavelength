import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 p-3 mt-6 text-xs sm:text-sm">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Keyboard Shortcuts:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-400 rounded-md shadow-sm">A</kbd> Open Lid</li>
              <li><kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-400 rounded-md shadow-sm">C</kbd> Close Lid</li>
              <li><kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-400 rounded-md shadow-sm">N</kbd> New Game</li>
              <li><kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-400 rounded-md shadow-sm">K</kbd> New Clue</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Game Information:</h3>
            <p className="text-xs">Rules for the original game: 
              <a href="https://www.ultraboardgames.com/wavelength/game-rules.php" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300"> Read </a> |
              <a href="https://www.youtube.com/watch?v=ggI6MLrGx9w" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300"> Watch a video</a>
            </p>
            <p className="mt-1 text-xs">
              This app is a React learning project.
              If you like the game, please consider buying the physical copy from <a href="https://www.wavelength.zone/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">Wavelength Boardgame</a>.
            </p>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-700">
          Modernized with React & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
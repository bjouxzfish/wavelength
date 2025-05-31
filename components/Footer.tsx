import React from 'react';

// Reusable Kbd component for styling keyboard keys
const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-400 rounded-md shadow-sm">
    {children}
  </kbd>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 p-3 mt-6 text-xs sm:text-sm">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          {/* Column 1: Merged Controls & Shortcuts */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Controls & Shortcuts:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>
                <Kbd>N</Kbd> <strong>New Game</strong>: Starts a fresh game, setting up new opposing concepts for the spectrum and a new hidden target location. This also prompts the Psychic to give a new clue.
              </li>
              <li>
                <Kbd>K</Kbd> <strong>New Concepts</strong>: Allows the Psychic to replace the spectrum's opposing concepts. The hidden target's dial position remains.
              </li>
              <li>
                <Kbd>A</Kbd> <strong>Open Lid</strong>: Reveals the hidden target location, allowing for scoring.
              </li>
              <li>
                <Kbd>C</Kbd> <strong>Close Lid</strong>: Hides the target location again, preparing for the next round or a new guess.
              </li>
            </ul>
          </div>

          {/* Column 2: Game Information */}
          <div>
            {/* Adjusted margin: mt-3 for stacking on small screens, md:mt-0 when side-by-side */}
            <h3 className="font-semibold text-slate-200 mb-1 mt-3 md:mt-0">Game Information:</h3>
            <p className="text-xs">Rules for the original game:
              <a href="https://www.ultraboardgames.com/wavelength/game-rules.php" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300"> Read </a> |
              <a href="https://www.youtube.com/watch?v=ggI6MLrGx9w" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300"> Watch a Wavelength Game Review by TheGameBoyGeek</a>
            </p>
            <p className="mt-1 text-xs">
              This app is a React learning project.
              If you like the game, please consider buying the physical copy from <a href="https://www.wavelength.zone/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">Wavelength Boardgame</a>.
            </p>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-700">
          May the Force be with you!
        </div>
      </div>
    </footer>
  );
};

export default Footer;
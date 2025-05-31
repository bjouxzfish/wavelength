
import React from 'react';
import { OpponentGuessDirection } from '../types';

interface OpponentIndicatorProps {
  opponentGuess: OpponentGuessDirection;
}

const OpponentIndicator: React.FC<OpponentIndicatorProps> = ({ opponentGuess }) => {
  const baseTriangleClass = "transition-opacity duration-300";
  const lowerOpacity = opponentGuess === 'lower' ? 'opacity-100' : 'opacity-25'; // More subtle when not selected
  const higherOpacity = opponentGuess === 'higher' ? 'opacity-100' : 'opacity-25'; // More subtle when not selected

  return (
    <div className="flex justify-between items-center w-full max-w-xs sm:max-w-sm mx-auto mt-2 mb-4 px-4">
      <div className={`transform scale-150 ${baseTriangleClass} ${lowerOpacity}`}>
        <svg width="40" height="40" viewBox="0 0 100 100">
          {/* Cosmic Indigo: Teal triangles */}
          <polygon points="10,50 90,10 90,90" className="fill-teal-500 stroke-teal-300" strokeWidth="5" />
        </svg>
      </div>
      {/* Cosmic Indigo: Lighter text */}
      <p className="text-slate-300 text-lg font-medium">Opponent's Lean</p>
      <div className={`transform -scale-x-150 scale-y-150 ${baseTriangleClass} ${higherOpacity}`}>
         <svg width="40" height="40" viewBox="0 0 100 100">
          <polygon points="10,50 90,10 90,90" className="fill-teal-500 stroke-teal-300" strokeWidth="5" />
        </svg>
      </div>
    </div>
  );
};

export default OpponentIndicator;

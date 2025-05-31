
import React from 'react';

interface ClueDisplayProps {
  leftWord: string;
  rightWord: string;
}

const ArrowIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-6 h-6 sm:w-8 sm:h-8 text-slate-300 ${direction === 'left' ? '-scale-x-100' : ''}`} 
  >
    <path
      fillRule="evenodd"
      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
      clipRule="evenodd"
    />
  </svg>
);


const ClueDisplay: React.FC<ClueDisplayProps> = ({ leftWord, rightWord }) => {
  return (
    <div className="flex justify-center items-stretch gap-2 sm:gap-3 my-3 px-1 sm:px-2 w-full max-w-3xl mx-auto">
      <div className="flex-1 bg-blue-600 text-slate-100 p-3 sm:p-4 rounded-lg shadow-md text-center min-h-[90px] sm:min-h-[100px] flex flex-col justify-center items-center">
        <ArrowIcon direction="left" />
        <p className="text-lg sm:text-xl font-semibold mt-1">{leftWord}</p>
      </div>
      <div className="flex-1 bg-yellow-600 text-slate-100 p-3 sm:p-4 rounded-lg shadow-md text-center min-h-[90px] sm:min-h-[100px] flex flex-col justify-center items-center">
        <ArrowIcon direction="right" />
        <p className="text-lg sm:text-xl font-semibold mt-1">{rightWord}</p>
      </div>
    </div>
  );
};

export default ClueDisplay;

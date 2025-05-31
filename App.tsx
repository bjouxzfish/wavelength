
import React, { useState, useEffect, useCallback } from 'react';
import { WordPair, OpponentGuessDirection } from './types';
import { wordlist } from './wordlist';
import { MAX_SLOTS, DIAL_MIN_ANGLE, DIAL_MAX_ANGLE } from './constants';
import Button from './components/Button';
import GameBoard from './components/GameBoard';
import ClueDisplay from './components/ClueDisplay';
import OpponentIndicator from './components/OpponentIndicator';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [lidOpen, setLidOpen] = useState<boolean>(true); 
  const [currentClue, setCurrentClue] = useState<WordPair | null>(null);
  const [dialAngle, setDialAngle] = useState<number>(0); // Start at 0 degrees
  const [targetPosition, setTargetPosition] = useState<number>(0); 
  const [opponentGuess, setOpponentGuess] = useState<OpponentGuessDirection>(null);

  const resetGame = useCallback(() => {
    const newTargetPosition = Math.floor(Math.random() * MAX_SLOTS);
    setTargetPosition(newTargetPosition);
    setDialAngle(0); // Reset dial to 0 degrees
    setOpponentGuess(null);
  }, []);

  const getNewClue = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * wordlist.length);
    setCurrentClue(wordlist[randomIndex]);
  }, []);
  
  const openActualLid = useCallback(() => { 
    setLidOpen(false);
  }, []);

  const closeActualLid = useCallback(() => { 
    setLidOpen(true);
  }, []);


  useEffect(() => {
    resetGame();
    getNewClue();
    closeActualLid(); 
  }, [resetGame, getNewClue, closeActualLid]); 

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return; 
      }
      if (event.key === 'a' || event.key === 'A') openActualLid();
      else if (event.key === 'c' || event.key === 'C') closeActualLid();
      else if (event.key === 'n' || event.key === 'N') {
        resetGame();
        getNewClue(); 
      }
      else if (event.key === 'k' || event.key === 'K') getNewClue();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [resetGame, getNewClue, openActualLid, closeActualLid]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDialAngle(parseInt(event.target.value, 10));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-slate-100">
      <header className="p-2 bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-2 md:gap-3">
          <Button onClick={() => { resetGame(); getNewClue(); }} variant="primary" aria-label="Start New Game (N)">New Game (N)</Button>
          <Button onClick={closeActualLid} variant="secondary" aria-label="Close Lid (C)">Close Lid (C)</Button>
          <Button onClick={openActualLid} variant="secondary" aria-label="Open Lid (A)">Open Lid (A)</Button>
          <Button onClick={getNewClue} variant="secondary" aria-label="Get New Clue (K)">New Clue (K)</Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-2 py-2 sm:py-4 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-slate-800/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-xl">
          
          <div className="mb-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-pink-400">Wavelength</h1>
            <p className="text-indigo-300 text-sm sm:text-base">Align the dial to the psychic's clue!</p>
          </div>

          {currentClue && <ClueDisplay leftWord={currentClue.left} rightWord={currentClue.right} />}
          
          {/* Gameboard container: aspect-2/1 makes height half of width. max-w-lg (32rem/512px) means height is 256px. */}
          <div className="mt-6 mb-3 w-full max-w-lg mx-auto aspect-[2/1] relative">
            <GameBoard 
              targetPosition={targetPosition} 
              dialAngleDegrees={dialAngle} 
              lidOpen={lidOpen} 
            />
          </div>
          
          <div className="mt-4 px-2 sm:px-4">
             <label htmlFor="dialSlider" className="block text-center text-base sm:text-lg font-medium text-slate-200 mb-1 sm:mb-2">
              Current Team's Choice (Dial: {dialAngle}°)
            </label>
            <input
              id="dialSlider"
              type="range"
              min={DIAL_MIN_ANGLE}
              max={DIAL_MAX_ANGLE}
              value={dialAngle}
              onChange={handleSliderChange}
              className="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-pink-500"
              aria-label="Adjust team's choice dial"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1" aria-hidden="true">
              <span>{DIAL_MIN_ANGLE}°</span>
              <span>{DIAL_MAX_ANGLE}°</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-base sm:text-lg font-medium text-slate-200 mb-1 sm:mb-2">Opponent's Choice</p>
            <div className="flex justify-center gap-3 sm:gap-4">
              <Button onClick={() => setOpponentGuess('lower')} variant="opponent" aria-pressed={opponentGuess === 'lower'}>Lower</Button>
              <Button onClick={() => setOpponentGuess('higher')} variant="opponent" aria-pressed={opponentGuess === 'higher'}>Higher</Button>
            </div>
            <OpponentIndicator opponentGuess={opponentGuess} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
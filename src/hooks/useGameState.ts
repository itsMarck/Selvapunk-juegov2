import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

const INITIAL_STATE: GameState = {
  spkBalance: 0,
  experience: 0,
  level: 0,
  walletAddress: ''
};

export function useGameState(walletAddress: string) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(`gameState_${walletAddress}`);
    return saved ? JSON.parse(saved) : { ...INITIAL_STATE, walletAddress };
  });

  useEffect(() => {
    localStorage.setItem(`gameState_${walletAddress}`, JSON.stringify(gameState));
  }, [gameState, walletAddress]);

  const addSPK = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      spkBalance: prev.spkBalance + amount
    }));
  };

  const addExperience = (amount: number) => {
    setGameState(prev => {
      const newExp = prev.experience + amount;
      const newLevel = Math.floor(newExp / 100);
      
      return {
        ...prev,
        experience: newExp,
        level: newLevel
      };
    });
  };

  return { gameState, addSPK, addExperience };
}
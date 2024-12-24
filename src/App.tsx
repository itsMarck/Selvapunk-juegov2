import React, { useState } from 'react';
import { Character } from './types/game';
import { NFTCharacterSelection } from './components/NFTCharacterSelection';
import { ArenaSelection } from './components/ArenaSelection';
import { BattleScene } from './components/BattleScene';
import { useGameState } from './hooks/useGameState';
import { useWallet } from './hooks/useWallet';

function App() {
  const { account: walletAddress, provider } = useWallet();
  const { gameState, addSPK, addExperience } = useGameState(walletAddress || '');
  const [character, setCharacter] = useState<Character | null>(null);
  const [opponent, setOpponent] = useState<Character | null>(null);

  const handleBattleComplete = (won: boolean, experienceGained: number) => {
    if (won) {
      addSPK(5); // Award 5 SPK for victory
      addExperience(experienceGained);
    } else {
      addExperience(Math.floor(experienceGained * 0.25)); // 25% XP for losing
    }
    setOpponent(null);
  };

  return (
    <div className="relative">
      {!character && (
        <NFTCharacterSelection 
          onCharacterSelected={setCharacter}
          walletAddress={walletAddress || ''}
          spkBalance={gameState.spkBalance}
        />
      )}
      
      {character && !opponent && (
        <ArenaSelection
          character={character}
          onOpponentSelected={setOpponent}
          onBack={() => setCharacter(null)}
          walletAddress={walletAddress || ''}
          spkBalance={gameState.spkBalance}
        />
      )}
      
      {character && opponent && (
        <BattleScene
          character={character}
          opponent={opponent}
          onBattleComplete={handleBattleComplete}
          onBack={() => setOpponent(null)}
          walletAddress={walletAddress || ''}
          spkBalance={gameState.spkBalance}
        />
      )}
    </div>
  );
}

export default App;
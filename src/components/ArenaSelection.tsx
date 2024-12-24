import React, { useState, useEffect } from 'react';
import { Character } from '../types/game';
import { CharacterCard } from './CharacterCard';
import { BackButton } from './BackButton';
import { Header } from './Header';
import { generateCharacterFromNFT } from '../utils/characterUtils';

interface Props {
  character: Character;
  onOpponentSelected: (opponent: Character) => void;
  onBack: () => void;
  walletAddress: string;
  spkBalance: number;
  ethBalance?: string;
}

export function ArenaSelection({ 
  character, 
  onOpponentSelected, 
  onBack,
  walletAddress,
  spkBalance,
  ethBalance
}: Props) {
  const [opponents, setOpponents] = useState<Character[]>([]);

  useEffect(() => {
    // Generate 6 random opponents with valid NFT IDs (0-49)
    const generateOpponents = () => {
      const newOpponents: Character[] = [];
      for (let i = 0; i < 6; i++) {
        const randomId = Math.floor(Math.random() * 50); // 0-49
        newOpponents.push(
          generateCharacterFromNFT(randomId, `SelvaPunk #${randomId}`)
        );
      }
      return newOpponents;
    };

    setOpponents(generateOpponents());
  }, []);

  return (
    <div className="min-h-screen bg-[#f7e5c2] relative">
      <Header 
        walletAddress={walletAddress}
        spkBalance={spkBalance}
        ethBalance={ethBalance}
      />
      <BackButton onClick={onBack} />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Arena de Batalla</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Player Character */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tu Personaje</h3>
            <CharacterCard character={character} />
          </div>

          {/* Opponents */}
          <div>
            <h3 className="text-xl font-bold mb-4">Elige tu Oponente</h3>
            <div className="grid grid-cols-2 gap-4">
              {opponents.map((opponent) => (
                <CharacterCard
                  key={opponent.id}
                  character={opponent}
                  onClick={() => onOpponentSelected(opponent)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
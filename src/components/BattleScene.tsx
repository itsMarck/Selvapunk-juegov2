import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '../types/game';
import { calculateDamage } from '../utils/combatSystem';
import { BattleResult } from './BattleResult';
import { Header } from './Header';
import { BackButton } from './BackButton';

interface Props {
  character: Character;
  opponent: Character;
  onBattleComplete: (won: boolean, experienceGained: number) => void;
  onBack: () => void;
  walletAddress: string;
  spkBalance: number;
  ethBalance?: string;
}

export function BattleScene({
  character,
  opponent,
  onBattleComplete,
  onBack,
  walletAddress,
  spkBalance,
  ethBalance
}: Props) {
  const [playerHealth, setPlayerHealth] = useState(character.stats.health);
  const [opponentHealth, setOpponentHealth] = useState(opponent.stats.health);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'opponent'>('player');
  const [isAttacking, setIsAttacking] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [battleResult, setBattleResult] = useState<{
    victory: boolean;
    experienceGained: number;
  } | null>(null);

  const handleAttack = async () => {
    if (currentTurn !== 'player' || isAttacking || showResult) return;

    setIsAttacking(true);
    const damage = calculateDamage(character, opponent);
    
    if (damage === 0) {
      setBattleLog(prev => [...prev, `¡${opponent.name} ha evadido el ataque!`]);
    } else {
      const newHealth = Math.max(0, opponentHealth - damage);
      setOpponentHealth(newHealth);
      setBattleLog(prev => [...prev, `¡${character.name} hace ${damage} puntos de daño!`]);
      
      if (newHealth <= 0) {
        setBattleResult({
          victory: true,
          experienceGained: 50
        });
        setShowResult(true);
        setIsAttacking(false);
        return;
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAttacking(false);
    setCurrentTurn('opponent');
  };

  useEffect(() => {
    if (currentTurn === 'opponent' && opponentHealth > 0 && !showResult) {
      const performOpponentAttack = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const damage = calculateDamage(opponent, character);
        
        if (damage === 0) {
          setBattleLog(prev => [...prev, `¡${character.name} ha evadido el ataque!`]);
        } else {
          const newHealth = Math.max(0, playerHealth - damage);
          setPlayerHealth(newHealth);
          setBattleLog(prev => [...prev, `¡${opponent.name} hace ${damage} puntos de daño!`]);
          
          if (newHealth <= 0) {
            setBattleResult({
              victory: false,
              experienceGained: 10
            });
            setShowResult(true);
            return;
          }
        }
        
        setCurrentTurn('player');
      };
      performOpponentAttack();
    }
  }, [currentTurn, opponentHealth, showResult]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 relative">
      <Header 
        walletAddress={walletAddress}
        spkBalance={spkBalance}
        ethBalance={ethBalance}
      />
      <BackButton onClick={onBack} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Health Bars */}
        <div className="flex justify-between mb-8">
          <div className="w-64">
            <div className="text-lg font-bold mb-2">{character.name}</div>
            <div className="h-4 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${(playerHealth / character.stats.health) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="w-64">
            <div className="text-lg font-bold mb-2 text-right">{opponent.name}</div>
            <div className="h-4 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${(opponentHealth / opponent.stats.health) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Battle Area */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            animate={{
              x: isAttacking && currentTurn === 'player' ? 100 : 0,
              scale: isAttacking && currentTurn === 'player' ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={character.imageUrl} 
              alt={character.name}
              className="w-48 h-48 object-contain"
            />
          </motion.div>

          <motion.div
            animate={{
              x: isAttacking && currentTurn === 'opponent' ? -100 : 0,
              scale: isAttacking && currentTurn === 'opponent' ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={opponent.imageUrl} 
              alt={opponent.name}
              className="w-48 h-48 object-contain"
            />
          </motion.div>
        </div>

        {/* Battle Log */}
        <div className="bg-white bg-opacity-80 rounded-lg p-4 mb-4 h-32 overflow-y-auto">
          <AnimatePresence>
            {battleLog.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-1"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="text-center">
          <button
            onClick={handleAttack}
            disabled={currentTurn !== 'player' || isAttacking || showResult}
            className="px-8 py-3 bg-red-500 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-red-600 transition"
          >
            ¡Atacar!
          </button>
        </div>

        {/* Battle Result Modal */}
        {showResult && battleResult && (
          <BattleResult
            victory={battleResult.victory}
            experienceGained={battleResult.experienceGained}
            spkGained={battleResult.victory ? 5 : 0}
            onClose={() => onBattleComplete(battleResult.victory, battleResult.experienceGained)}
          />
        )}
      </div>
    </div>
  );
}
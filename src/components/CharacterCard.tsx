import React from 'react';
import { Shield, Swords, Zap } from 'lucide-react';
import { Character } from '../types/game';

interface Props {
  character: Character;
  onClick?: () => void;
  selected?: boolean;
}

export function CharacterCard({ character, onClick, selected }: Props) {
  const experienceToNextLevel = (character.level + 1) * 100;
  const experienceProgress = (character.experience / experienceToNextLevel) * 100;

  return (
    <div 
      className={`bg-white rounded-lg p-4 shadow-lg transition-all ${
        selected ? 'ring-2 ring-blue-500' : ''
      } ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={character.imageUrl} 
          alt={character.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded">
          Lvl {character.level}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2">{character.name}</h3>

      {/* Experience Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${experienceProgress}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {character.experience} / {experienceToNextLevel} XP
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-red-500" />
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${(character.stats.health / 150) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium">{character.stats.health}</span>
        </div>

        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-orange-500" />
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${(character.stats.strength / 30) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium">{character.stats.strength}</span>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${(character.stats.agility / 30) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium">{character.stats.agility}</span>
        </div>
      </div>
    </div>
  );
}
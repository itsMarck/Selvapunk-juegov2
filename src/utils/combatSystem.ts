import { Character } from '../types/game';

export function calculateDamage(attacker: Character, defender: Character): number {
  const baseDamage = attacker.stats.strength * 2;
  const defenseReduction = defender.stats.agility / 2;
  const finalDamage = Math.max(1, Math.floor(baseDamage - defenseReduction));
  
  // Check for evasion
  const evadeChance = defender.stats.agility / 100;
  if (Math.random() < evadeChance) {
    return 0; // Attack evaded
  }
  
  return finalDamage;
}

export function calculateExperience(playerLevel: number, opponentLevel: number, victory: boolean): number {
  const baseXP = 20;
  const levelDiff = opponentLevel - playerLevel;
  const levelMultiplier = Math.max(0.5, 1 + (levelDiff * 0.1));
  
  return victory ? Math.floor(baseXP * levelMultiplier) : Math.floor(baseXP * 0.25);
}
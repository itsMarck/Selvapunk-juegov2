import { MersenneTwister } from './mersenneTwister';

export function generateStats(nftId: number): {
  health: number;
  strength: number;
  agility: number;
  speed: number;
} {
  // Use NFT ID as seed for deterministic generation
  const rng = new MersenneTwister(nftId);
  
  // Generate stats between 1-30
  return {
    health: 100 + (rng.random() % 50), // 100-150 health
    strength: 1 + (rng.random() % 30),
    agility: 1 + (rng.random() % 30),
    speed: 1 + (rng.random() % 30)
  };
}
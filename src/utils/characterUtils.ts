import { Character } from '../types/game';
import { MersenneTwister } from './mersenneTwister';

export function generateCharacterFromNFT(nftId: number, name: string): Character {
  // Ensure NFT ID is within valid range (0-49)
  const validNftId = Math.min(49, Math.abs(nftId));
  
  // Create seed from NFT name and ID
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + validNftId;
  const rng = new MersenneTwister(seed);
  
  return {
    id: validNftId,
    name,
    level: 0,
    experience: 0,
    stats: {
      health: 100 + (rng.random() % 50), // 100-150 health
      strength: 1 + (rng.random() % 30),
      agility: 1 + (rng.random() % 30),
      speed: 1 + (rng.random() % 30)
    },
    imageUrl: `https://raw.githubusercontent.com/itsMarck/SelvaPunks/main/imagenes/${validNftId}.png`
  };
}
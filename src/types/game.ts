export interface GameState {
  spkBalance: number;
  experience: number;
  level: number;
  walletAddress: string;
}

export interface Character {
  id: number;
  name: string;
  level: number;
  experience: number;
  stats: {
    health: number;
    strength: number;
    agility: number;
    speed: number;
  };
  imageUrl: string;
}

export interface BattleState {
  playerHealth: number;
  opponentHealth: number;
  currentTurn: 'player' | 'opponent';
  log: string[];
  isFinished: boolean;
}
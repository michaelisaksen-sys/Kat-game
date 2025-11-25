export type GrowthStage = 'baby' | 'young' | 'adult';

export type KittenMood = 'happy' | 'sleepy' | 'hungry' | 'playful' | 'content';

export type FoodType = 'milk' | 'fish' | 'treats' | 'cat-food';

export type ToyType = 'yarn' | 'feather' | 'laser';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  hunger: number;
  happiness: number;
  energy: number;
  age: number; // in days
  growthStage: GrowthStage;
  position: Position;
  lastVisit: number; // timestamp
  unlockedFoods: FoodType[];
  unlockedToys: ToyType[];
  createdAt: number; // timestamp
}

export interface FoodItem {
  type: FoodType;
  name: string;
  hungerRestore: number;
  unlockDay: number;
  emoji: string;
}

export interface ToyItem {
  type: ToyType;
  name: string;
  happinessBoost: number;
  unlockDay: number;
  emoji: string;
}

export interface VisualEffect {
  id: string;
  type: 'heart' | 'sparkle' | 'food';
  x: number;
  y: number;
  timestamp: number;
}

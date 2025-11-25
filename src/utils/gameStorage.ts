import type { GameState, GrowthStage } from '../types/game';

const STORAGE_KEY = 'ghibli-kitten-game';

const INITIAL_STATE: GameState = {
  hunger: 80,
  happiness: 80,
  energy: 100,
  age: 0,
  growthStage: 'baby',
  position: { x: 400, y: 400 },
  lastVisit: Date.now(),
  unlockedFoods: ['milk'],
  unlockedToys: ['yarn'],
  createdAt: Date.now(),
};

// Decay rates per hour
const HUNGER_DECAY_RATE = 5;
const HAPPINESS_DECAY_RATE = 3;
const HOURS_PER_DAY = 24;

export const saveGameState = (state: GameState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadGameState = (): GameState => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return INITIAL_STATE;
  }

  try {
    const state: GameState = JSON.parse(stored);
    return updateStatsBasedOnTime(state);
  } catch (error) {
    console.error('Failed to load game state:', error);
    return INITIAL_STATE;
  }
};

export const resetGameState = (): GameState => {
  const newState = {
    ...INITIAL_STATE,
    createdAt: Date.now(),
    lastVisit: Date.now(),
  };
  saveGameState(newState);
  return newState;
};

const updateStatsBasedOnTime = (state: GameState): GameState => {
  const now = Date.now();
  const hoursPassed = (now - state.lastVisit) / (1000 * 60 * 60);

  // Calculate age in days
  const totalHours = (now - state.createdAt) / (1000 * 60 * 60);
  const age = Math.floor(totalHours / HOURS_PER_DAY);

  // Calculate stat decay
  const hungerDecay = Math.floor(hoursPassed * HUNGER_DECAY_RATE);
  const happinessDecay = Math.floor(hoursPassed * HAPPINESS_DECAY_RATE);

  // Update stats with minimum of 0
  const hunger = Math.max(0, state.hunger - hungerDecay);
  const happiness = Math.max(0, state.happiness - happinessDecay);

  // Determine growth stage based on age
  let growthStage: GrowthStage = 'baby';
  if (age >= 8) {
    growthStage = 'adult';
  } else if (age >= 4) {
    growthStage = 'young';
  }

  // Unlock items based on age
  const unlockedFoods = [...state.unlockedFoods];
  const unlockedToys = [...state.unlockedToys];

  if (age >= 4 && !unlockedFoods.includes('fish')) {
    unlockedFoods.push('fish', 'treats');
    unlockedToys.push('feather', 'laser');
  }

  if (age >= 8 && !unlockedFoods.includes('cat-food')) {
    unlockedFoods.push('cat-food');
  }

  return {
    ...state,
    hunger,
    happiness,
    age,
    growthStage,
    unlockedFoods,
    unlockedToys,
    lastVisit: now,
  };
};

export const clampStat = (value: number, min = 0, max = 100): number => {
  return Math.max(min, Math.min(max, value));
};

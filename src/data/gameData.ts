import type { FoodItem, ToyItem } from '../types/game';

export const FOODS: FoodItem[] = [
  {
    type: 'milk',
    name: 'Milk',
    hungerRestore: 15,
    unlockDay: 0,
    emoji: '🥛',
  },
  {
    type: 'fish',
    name: 'Fish',
    hungerRestore: 30,
    unlockDay: 4,
    emoji: '🐟',
  },
  {
    type: 'treats',
    name: 'Treats',
    hungerRestore: 20,
    unlockDay: 4,
    emoji: '🍪',
  },
  {
    type: 'cat-food',
    name: 'Cat Food',
    hungerRestore: 40,
    unlockDay: 8,
    emoji: '🍖',
  },
];

export const TOYS: ToyItem[] = [
  {
    type: 'yarn',
    name: 'Yarn Ball',
    happinessBoost: 20,
    unlockDay: 0,
    emoji: '🧶',
  },
  {
    type: 'feather',
    name: 'Feather Toy',
    happinessBoost: 20,
    unlockDay: 4,
    emoji: '🪶',
  },
  {
    type: 'laser',
    name: 'Laser Pointer',
    happinessBoost: 25,
    unlockDay: 4,
    emoji: '🔴',
  },
];

export const ROOM_BOUNDS = {
  minX: 50,
  maxX: 1850,
  minY: 80,
  maxY: 900,
};

export const KITTEN_MOVE_SPEED = 5;

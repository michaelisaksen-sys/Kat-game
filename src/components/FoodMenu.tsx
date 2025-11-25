import React from 'react';
import type { FoodType } from '../types/game';
import { FOODS } from '../data/gameData';

interface FoodMenuProps {
  unlockedFoods: FoodType[];
  onSelectFood: (food: FoodType) => void;
  onClose: () => void;
}

export const FoodMenu: React.FC<FoodMenuProps> = ({ unlockedFoods, onSelectFood, onClose }) => {
  const availableFoods = FOODS.filter((food) => unlockedFoods.includes(food.type));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Feed Your Kitten</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {availableFoods.map((food) => (
            <button
              key={food.type}
              onClick={() => {
                onSelectFood(food.type);
                onClose();
              }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span className="text-5xl">{food.emoji}</span>
              <div className="text-center">
                <div className="font-medium text-gray-800">{food.name}</div>
                <div className="text-xs text-gray-600">+{food.hungerRestore} hunger</div>
              </div>
            </button>
          ))}
        </div>

        {availableFoods.length === 0 && (
          <div className="text-center text-gray-500 py-8">No food available yet!</div>
        )}
      </div>
    </div>
  );
};

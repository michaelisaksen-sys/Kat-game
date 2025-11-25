import React from 'react';
import type { ToyType } from '../types/game';
import { TOYS } from '../data/gameData';

interface ToyMenuProps {
  unlockedToys: ToyType[];
  onSelectToy: (toy: ToyType) => void;
  onClose: () => void;
}

export const ToyMenu: React.FC<ToyMenuProps> = ({ unlockedToys, onSelectToy, onClose }) => {
  const availableToys = TOYS.filter((toy) => unlockedToys.includes(toy.type));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Play With Your Kitten</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {availableToys.map((toy) => (
            <button
              key={toy.type}
              onClick={() => {
                onSelectToy(toy.type);
                onClose();
              }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-2 border-pink-200 hover:border-pink-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span className="text-5xl">{toy.emoji}</span>
              <div className="text-center">
                <div className="font-medium text-gray-800">{toy.name}</div>
                <div className="text-xs text-gray-600">+{toy.happinessBoost} happiness</div>
              </div>
            </button>
          ))}
        </div>

        {availableToys.length === 0 && (
          <div className="text-center text-gray-500 py-8">No toys available yet!</div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs text-gray-600 text-center">
            💡 Click and drag to play! Your kitten will follow the toy.
          </p>
        </div>
      </div>
    </div>
  );
};

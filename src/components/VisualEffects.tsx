import React from 'react';
import type { VisualEffect } from '../types/game';

interface VisualEffectsProps {
  effects: VisualEffect[];
}

export const VisualEffects: React.FC<VisualEffectsProps> = ({ effects }) => {
  return (
    <>
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="absolute z-30 pointer-events-none animate-[heartPop_1s_ease-out_forwards]"
          style={{
            left: `${effect.x}px`,
            top: `${effect.y}px`,
          }}
        >
          {effect.type === 'heart' && <span className="text-3xl">❤️</span>}
          {effect.type === 'sparkle' && <span className="text-3xl">✨</span>}
          {effect.type === 'food' && <span className="text-3xl">😋</span>}
        </div>
      ))}
    </>
  );
};

interface YarnBallProps {
  position: { x: number; y: number };
}

export const YarnBall: React.FC<YarnBallProps> = ({ position }) => {
  return (
    <div
      className="absolute z-25 pointer-events-none transition-all duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-12 h-12 animate-spin">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full" />
        <div className="absolute inset-1 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full" />
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-pink-700" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-pink-700" />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 border-2 border-pink-700 rounded-full transform rotate-45" />
      </div>
    </div>
  );
};

interface LaserDotProps {
  position: { x: number; y: number };
}

export const LaserDot: React.FC<LaserDotProps> = ({ position }) => {
  return (
    <div
      className="absolute z-25 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full blur-md animate-ping" />
      </div>
    </div>
  );
};

interface FeatherToyProps {
  position: { x: number; y: number };
}

export const FeatherToy: React.FC<FeatherToyProps> = ({ position }) => {
  return (
    <div
      className="absolute z-25 pointer-events-none transition-all duration-150"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative animate-[float_0.5s_ease-in-out_infinite]">
        <span className="text-4xl">🪶</span>
      </div>
    </div>
  );
};

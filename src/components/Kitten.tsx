import React from 'react';
import type { GrowthStage, KittenMood, Direction } from '../types/game';

interface KittenProps {
  stage: GrowthStage;
  mood: KittenMood;
  position: { x: number; y: number };
  direction?: Direction;
  isMoving?: boolean;
  isPetting?: boolean;
  isEating?: boolean;
  isPlaying?: boolean;
}

export const Kitten: React.FC<KittenProps> = ({
  stage,
  mood,
  position,
  direction = 'down',
  isMoving = false,
  isPetting = false,
  isEating = false,
  isPlaying = false,
}) => {
  const getSize = () => {
    switch (stage) {
      case 'baby':
        return { width: 60, height: 60, scale: 0.7 };
      case 'young':
        return { width: 80, height: 80, scale: 0.85 };
      case 'adult':
        return { width: 100, height: 100, scale: 1 };
    }
  };

  const { width, height, scale } = getSize();

  const getAnimation = () => {
    if (isPetting) return 'animate-[purr_1s_ease-in-out_infinite]';
    if (isEating) return 'animate-[bounce_0.5s_ease-in-out_3]';
    if (isPlaying) return 'animate-[bounce_0.8s_ease-in-out_infinite]';
    if (isMoving) return 'transition-all duration-300 ease-out';
    return 'animate-[float_3s_ease-in-out_infinite]';
  };

  const getRotation = () => {
    if (!isMoving) return 'rotate-0';
    switch (direction) {
      case 'left':
        return '-scale-x-100';
      case 'right':
        return 'scale-x-100';
      default:
        return 'rotate-0';
    }
  };

  const renderKitten = () => {
    return (
      <div
        className={`relative ${getAnimation()} ${getRotation()}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
        }}
      >
        {/* Black Kitten body (Jiji-style) */}
        <div className="relative w-full h-full">
          {/* Main body (oval) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-[#1a1a1a] to-[#000000] rounded-[50%_50%_40%_40%] shadow-xl">
            {/* Subtle shine on fur */}
            <div className="absolute top-2 right-3 w-3 h-4 bg-white/10 rounded-full blur-sm" />
          </div>

          {/* Head */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#1a1a1a] to-[#000000] rounded-full shadow-xl z-10">
            {/* Subtle highlight */}
            <div className="absolute top-1 left-3 w-4 h-3 bg-white/5 rounded-full blur-sm" />

            {/* Ears - pointed triangular */}
            <div className="absolute -top-3 left-1.5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#1a1a1a] transform -rotate-12" />
            <div className="absolute -top-3 right-1.5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#1a1a1a] transform rotate-12" />

            {/* Inner ears (pink) */}
            <div className="absolute -top-2 left-3 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-[#FFB6C1] transform -rotate-12" />
            <div className="absolute -top-2 right-3 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-[#FFB6C1] transform rotate-12" />

            {/* Eyes - large white with small black pupils */}
            <div className="absolute top-4 left-2.5 w-5 h-5 bg-white rounded-full shadow-inner">
              <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-black rounded-full">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
            <div className="absolute top-4 right-2.5 w-5 h-5 bg-white rounded-full shadow-inner">
              <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-black rounded-full">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
            </div>

            {/* Nose - small pink */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FFB6C1] rounded-full" />

            {/* Whiskers - thin white lines */}
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={`whisker-${i}`}>
                <div
                  className="absolute left-0 w-7 h-[1px] bg-white/40"
                  style={{ top: `${24 + i * 2}px`, transform: `rotate(${-15 + i * 5}deg)` }}
                />
                <div
                  className="absolute right-0 w-7 h-[1px] bg-white/40"
                  style={{ top: `${24 + i * 2}px`, transform: `rotate(${15 - i * 5}deg)` }}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Tail - curved black tail */}
          <div className="absolute bottom-4 -right-5 w-14 h-3 bg-gradient-to-r from-[#000000] to-[#1a1a1a] rounded-full transform rotate-45 origin-left shadow-md">
            <div className="absolute -bottom-1 right-2 w-8 h-3 bg-gradient-to-r from-[#000000] to-[#1a1a1a] rounded-full transform rotate-20" />
          </div>

          {/* Paws - small black paws */}
          <div className="absolute bottom-0 left-3 w-3 h-3 bg-[#000000] rounded-full shadow-sm" />
          <div className="absolute bottom-0 right-3 w-3 h-3 bg-[#000000] rounded-full shadow-sm" />
        </div>

        {/* Status indicators */}
        {mood === 'hungry' && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl">💭</div>
        )}
        {mood === 'sleepy' && (
          <div className="absolute -top-8 right-0 text-xl animate-pulse">💤</div>
        )}
      </div>
    );
  };

  return (
    <div
      className="absolute z-20 transition-all duration-300 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {renderKitten()}

      {/* Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-sm"
        style={{ transform: `translateX(-50%) scale(${scale})` }}
      />
    </div>
  );
};

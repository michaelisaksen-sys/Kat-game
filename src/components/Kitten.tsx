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
        {/* Kitten body */}
        <div className="relative w-full h-full">
          {/* Main body (circle) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#F5DEB3] to-[#DEB887] rounded-full shadow-lg">
            {/* Fur texture */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
          </div>

          {/* Head */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#F5DEB3] to-[#DEB887] rounded-full shadow-md z-10">
            {/* Fur highlight */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/40 to-transparent rounded-full" />

            {/* Ears */}
            <div className="absolute -top-2 left-1 w-4 h-6 bg-gradient-to-br from-[#F5DEB3] to-[#DEB887] rounded-t-full transform -rotate-12" />
            <div className="absolute -top-2 right-1 w-4 h-6 bg-gradient-to-br from-[#F5DEB3] to-[#DEB887] rounded-t-full transform rotate-12" />
            <div className="absolute -top-1 left-2 w-2 h-4 bg-gradient-to-br from-[#FFB6C1] to-[#FF69B4] rounded-t-full transform -rotate-12" />
            <div className="absolute -top-1 right-2 w-2 h-4 bg-gradient-to-br from-[#FFB6C1] to-[#FF69B4] rounded-t-full transform rotate-12" />

            {/* Eyes */}
            <div className="absolute top-5 left-3 w-3 h-3 bg-[#2C1810] rounded-full">
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
            </div>
            <div className="absolute top-5 right-3 w-3 h-3 bg-[#2C1810] rounded-full">
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
            </div>

            {/* Nose */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-[#FFB6C1] rounded-full" />

            {/* Mouth */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-0.5 h-2 bg-[#2C1810] rounded transform rotate-12" />
              <div className="w-0.5 h-2 bg-[#2C1810] rounded transform -rotate-12" />
            </div>

            {/* Whiskers */}
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={`whisker-${i}`}>
                <div
                  className="absolute left-0 w-6 h-0.5 bg-[#2C1810] opacity-30"
                  style={{ top: `${24 + i * 2}px`, transform: `rotate(${-10 + i * 5}deg)` }}
                />
                <div
                  className="absolute right-0 w-6 h-0.5 bg-[#2C1810] opacity-30"
                  style={{ top: `${24 + i * 2}px`, transform: `rotate(${10 - i * 5}deg)` }}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Tail */}
          <div className="absolute bottom-2 -right-4 w-12 h-3 bg-gradient-to-r from-[#F5DEB3] to-[#DEB887] rounded-full transform rotate-45 origin-left" />

          {/* Paws */}
          <div className="absolute bottom-0 left-2 w-4 h-3 bg-[#DEB887] rounded-full" />
          <div className="absolute bottom-0 right-2 w-4 h-3 bg-[#DEB887] rounded-full" />
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

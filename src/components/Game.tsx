import React, { useEffect, useState, useRef } from 'react';
import type { GameState, VisualEffect, FoodType, ToyType, KittenMood, Direction } from '../types/game';
import { loadGameState, saveGameState, clampStat } from '../utils/gameStorage';
import { ROOM_BOUNDS, KITTEN_MOVE_SPEED } from '../data/gameData';
import { Background } from './Background';
import { Kitten } from './Kitten';
import { StatBar } from './StatBar';
import { ActionButton } from './ActionButton';
import { FoodMenu } from './FoodMenu';
import { ToyMenu } from './ToyMenu';
import { VisualEffects, YarnBall, LaserDot, FeatherToy } from './VisualEffects';
import { FOODS, TOYS } from '../data/gameData';

type GameMode = 'normal' | 'feeding' | 'playing' | 'petting';

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => loadGameState());
  const [effects, setEffects] = useState<VisualEffect[]>([]);
  const [mode, setMode] = useState<GameMode>('normal');
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [showToyMenu, setShowToyMenu] = useState(false);
  const [activeToy, setActiveToy] = useState<ToyType | null>(null);
  const [toyPosition, setToyPosition] = useState({ x: 0, y: 0 });
  const [isPetting, setIsPetting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<Direction>('down');
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const gameRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Save game state whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Determine kitten mood based on stats
  const getKittenMood = (): KittenMood => {
    if (gameState.hunger < 30) return 'hungry';
    if (gameState.energy < 30) return 'sleepy';
    if (gameState.happiness > 70) return 'happy';
    if (mode === 'playing') return 'playful';
    return 'content';
  };

  // Add visual effect
  const addEffect = (type: VisualEffect['type'], x: number, y: number) => {
    const effect: VisualEffect = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      x,
      y,
      timestamp: Date.now(),
    };
    setEffects((prev) => [...prev, effect]);

    // Remove effect after animation
    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e.id !== effect.id));
    }, 1000);
  };

  // Feed kitten
  const feedKitten = (foodType: FoodType) => {
    const food = FOODS.find((f) => f.type === foodType);
    if (!food) return;

    setMode('feeding');

    // Update hunger
    setGameState((prev) => ({
      ...prev,
      hunger: clampStat(prev.hunger + food.hungerRestore),
      happiness: clampStat(prev.happiness + 5),
    }));

    // Add effect
    addEffect('food', gameState.position.x, gameState.position.y - 40);

    // Reset mode after animation
    setTimeout(() => {
      setMode('normal');
    }, 1500);
  };

  // Play with toy
  const playWithToy = (toyType: ToyType) => {
    setActiveToy(toyType);
    setMode('playing');
  };

  const stopPlaying = () => {
    if (!activeToy) return;

    const toy = TOYS.find((t) => t.type === activeToy);
    if (toy) {
      setGameState((prev) => ({
        ...prev,
        happiness: clampStat(prev.happiness + toy.happinessBoost),
        energy: clampStat(prev.energy - 10),
      }));

      addEffect('sparkle', gameState.position.x, gameState.position.y - 40);
    }

    setActiveToy(null);
    setMode('normal');
  };

  // Handle mouse move for toys
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode === 'playing' && activeToy && gameRef.current) {
      const rect = gameRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setToyPosition({ x, y });

      // Move kitten towards toy
      moveKittenTowards(x, y);
    }
  };

  // Move kitten towards a target
  const moveKittenTowards = (targetX: number, targetY: number) => {
    setGameState((prev) => {
      const dx = targetX - prev.position.x;
      const dy = targetY - prev.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5) return prev;

      const speed = KITTEN_MOVE_SPEED;
      const newX = prev.position.x + (dx / distance) * speed;
      const newY = prev.position.y + (dy / distance) * speed;

      // Clamp to room bounds
      const clampedX = Math.max(ROOM_BOUNDS.minX, Math.min(ROOM_BOUNDS.maxX, newX));
      const clampedY = Math.max(ROOM_BOUNDS.minY, Math.min(ROOM_BOUNDS.maxY, newY));

      // Determine direction
      let newDirection: Direction = prev.position.x < targetX ? 'right' : 'left';
      if (Math.abs(dy) > Math.abs(dx)) {
        newDirection = prev.position.y < targetY ? 'down' : 'up';
      }
      setDirection(newDirection);

      return {
        ...prev,
        position: { x: clampedX, y: clampedY },
      };
    });
  };

  // Pet kitten
  const handlePetStart = () => {
    if (mode !== 'normal') return;
    setIsPetting(true);
    setMode('petting');
  };

  const handlePetEnd = () => {
    if (!isPetting) return;

    setIsPetting(false);
    setMode('normal');

    setGameState((prev) => ({
      ...prev,
      happiness: clampStat(prev.happiness + 8),
    }));

    addEffect('heart', gameState.position.x, gameState.position.y - 40);
  };

  // Keyboard movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setKeysPressed((prev) => new Set(prev).add(e.key));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setKeysPressed((prev) => {
          const newSet = new Set(prev);
          newSet.delete(e.key);
          return newSet;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Movement animation loop
  useEffect(() => {
    if (keysPressed.size === 0 || mode !== 'normal') {
      setIsMoving(false);
      return;
    }

    setIsMoving(true);

    const moveKitten = () => {
      setGameState((prev) => {
        let newX = prev.position.x;
        let newY = prev.position.y;
        let newDirection: Direction = direction;

        if (keysPressed.has('ArrowUp')) {
          newY -= KITTEN_MOVE_SPEED;
          newDirection = 'up';
        }
        if (keysPressed.has('ArrowDown')) {
          newY += KITTEN_MOVE_SPEED;
          newDirection = 'down';
        }
        if (keysPressed.has('ArrowLeft')) {
          newX -= KITTEN_MOVE_SPEED;
          newDirection = 'left';
        }
        if (keysPressed.has('ArrowRight')) {
          newX += KITTEN_MOVE_SPEED;
          newDirection = 'right';
        }

        // Clamp to room bounds
        newX = Math.max(ROOM_BOUNDS.minX, Math.min(ROOM_BOUNDS.maxX, newX));
        newY = Math.max(ROOM_BOUNDS.minY, Math.min(ROOM_BOUNDS.maxY, newY));

        setDirection(newDirection);

        return {
          ...prev,
          position: { x: newX, y: newY },
        };
      });

      animationFrameRef.current = requestAnimationFrame(moveKitten);
    };

    animationFrameRef.current = requestAnimationFrame(moveKitten);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [keysPressed, mode, direction]);

  return (
    <div
      ref={gameRef}
      className="relative w-full h-full overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={() => activeToy && stopPlaying()}
    >
      {/* Background */}
      <Background />

      {/* Kitten */}
      <div
        onMouseDown={handlePetStart}
        onMouseUp={handlePetEnd}
        onMouseLeave={handlePetEnd}
        className="cursor-pointer"
      >
        <Kitten
          stage={gameState.growthStage}
          mood={getKittenMood()}
          position={gameState.position}
          direction={direction}
          isMoving={isMoving}
          isPetting={isPetting}
          isEating={mode === 'feeding'}
          isPlaying={mode === 'playing'}
        />
      </div>

      {/* Toys during play */}
      {mode === 'playing' && activeToy === 'yarn' && <YarnBall position={toyPosition} />}
      {mode === 'playing' && activeToy === 'laser' && <LaserDot position={toyPosition} />}
      {mode === 'playing' && activeToy === 'feather' && <FeatherToy position={toyPosition} />}

      {/* Visual Effects */}
      <VisualEffects effects={effects} />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Stats */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto">
          <StatBar label="Hunger" value={gameState.hunger} maxValue={100} color="red" icon="🍖" />
          <StatBar
            label="Happiness"
            value={gameState.happiness}
            maxValue={100}
            color="pink"
            icon="❤️"
          />
        </div>

        {/* Age Display */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg pointer-events-auto">
          <div className="text-center">
            <div className="text-sm text-gray-600">Age</div>
            <div className="text-xl font-bold text-gray-800">Day {gameState.age}</div>
            <div className="text-xs text-gray-500 capitalize">{gameState.growthStage}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto">
          <ActionButton
            label="Feed"
            icon="🍽️"
            onClick={() => setShowFoodMenu(true)}
            active={mode === 'feeding'}
          />
          <ActionButton
            label="Play"
            icon="🎾"
            onClick={() => setShowToyMenu(true)}
            active={mode === 'playing'}
          />
          <ActionButton label="Pet" icon="✋" onClick={handlePetStart} active={mode === 'petting'} />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg pointer-events-auto">
          <div className="text-xs text-gray-600">
            {mode === 'normal' && '🎮 Use arrow keys to move'}
            {mode === 'playing' && '🖱️ Drag mouse to play with toy'}
            {mode === 'petting' && '✨ Keep petting your kitten'}
            {mode === 'feeding' && '😋 Nom nom nom...'}
          </div>
        </div>
      </div>

      {/* Menus */}
      {showFoodMenu && (
        <FoodMenu
          unlockedFoods={gameState.unlockedFoods}
          onSelectFood={feedKitten}
          onClose={() => setShowFoodMenu(false)}
        />
      )}

      {showToyMenu && (
        <ToyMenu
          unlockedToys={gameState.unlockedToys}
          onSelectToy={playWithToy}
          onClose={() => setShowToyMenu(false)}
        />
      )}
    </div>
  );
};

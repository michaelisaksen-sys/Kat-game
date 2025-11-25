# 🐱 Ghibli Kitten Virtual Pet Game

A charming web-based virtual pet game where you care for and raise an adorable kitten from baby to adult. Features a Studio Ghibli-inspired art style with soft watercolors, warm lighting, and whimsical character designs.

## ✨ Features

### Core Gameplay
- **Stats System**: Monitor your kitten's Hunger and Happiness levels
- **Growth System**: Watch your kitten grow from baby → young → adult (Days 0-8+)
- **Real-time Updates**: Stats decay naturally over time based on your last visit
- **Persistent Progress**: Game state automatically saves to browser localStorage

### Interactions

#### 🍽️ Feeding System
- Multiple food options with different hunger restoration values:
  - 🥛 Milk (unlocked Day 0) - +15 hunger
  - 🐟 Fish (unlocked Day 4) - +30 hunger
  - 🍪 Treats (unlocked Day 4) - +20 hunger
  - 🍖 Cat Food (unlocked Day 8) - +40 hunger

#### 🎾 Play Activities
- **🧶 Yarn Ball**: Click and drag to move the yarn - your kitten follows in real-time!
- **🪶 Feather Toy**: Wave the feather around and watch your kitten chase it
- **🔴 Laser Pointer**: Create a laser dot that your kitten can't resist

#### ✋ Petting System
- Click and hold on your kitten to pet them
- Increases happiness and shows adorable heart effects
- Hear purring sounds (when implemented)

#### 🎮 Movement System
- **Arrow Keys**: Move your kitten around the cozy living room
  - ⬆️ Up
  - ⬇️ Down
  - ⬅️ Left
  - ➡️ Right
- Smooth walking animations with collision detection
- Kitten faces the direction of movement

### Visual Design
- 🎨 Studio Ghibli-inspired aesthetic
- 🏠 Beautiful hand-crafted living room background
- 🌟 Smooth animations and transitions
- ❤️ Visual feedback effects (hearts, sparkles)
- 🌅 Warm, calming color palette

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Kat-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 How to Play

1. **Starting Out**: Your kitten begins as a baby with basic needs
2. **Monitor Stats**: Keep an eye on the hunger and happiness bars at the top
3. **Feed Your Kitten**: Click the "Feed" button to choose food
4. **Play Together**: Click "Play" to select toys and interact
5. **Show Affection**: Click "Pet" or click directly on your kitten to pet them
6. **Explore**: Use arrow keys to move your kitten around the room
7. **Watch Them Grow**: Return daily to see your kitten grow into an adult!

### Tips
- Stats decay over time, so visit regularly to keep your kitten happy and healthy
- New food and toys unlock as your kitten grows
- Different interactions restore different amounts of stats
- During yarn play, drag your mouse around - your kitten will follow!

## 🛠️ Technology Stack

- **React** - Component-based UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **localStorage** - Client-side data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Game.tsx              # Main game component
│   ├── Kitten.tsx            # Kitten character rendering
│   ├── Background.tsx        # Living room background
│   ├── StatBar.tsx           # Stat display component
│   ├── ActionButton.tsx      # Interactive buttons
│   ├── FoodMenu.tsx          # Food selection menu
│   ├── ToyMenu.tsx           # Toy selection menu
│   ├── VisualEffects.tsx     # Hearts, sparkles, toys
│   └── LoadingScreen.tsx     # Initial loading screen
├── types/
│   └── game.ts               # TypeScript type definitions
├── utils/
│   └── gameStorage.ts        # localStorage management
├── data/
│   └── gameData.ts           # Game constants and data
├── App.tsx                   # Root component
└── index.css                 # Global styles and animations
```

## 🎯 Game Mechanics

### Stat Decay Rates
- **Hunger**: Decreases by 5 points per hour
- **Happiness**: Decreases by 3 points per hour

### Growth Stages
- **Baby** (Days 0-3): Small size, limited activities
- **Young** (Days 4-7): Medium size, unlocks new toys and foods
- **Adult** (Day 8+): Full size, all activities unlocked

### Room Boundaries
- Kitten movement is constrained to the floor area
- Prevents walking through furniture or off-screen

## 🔜 Future Enhancements

- Multiple kitten breeds and colors
- Background music and sound effects
- Day/night cycle
- More elaborate mini-games
- Photo mode to capture cute moments
- Seasonal backgrounds and decorations
- Achievement system
- Multiple rooms to explore

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 💖 Credits

Inspired by classic virtual pet games and the beautiful art style of Studio Ghibli films.

---

Made with ❤️ for kitten lovers everywhere! 🐱

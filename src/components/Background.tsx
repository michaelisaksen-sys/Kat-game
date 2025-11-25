import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B8D4E8] via-[#E8F4F8] to-[#F0E8D8]" />

      {/* Window light */}
      <div className="absolute top-10 right-20 w-64 h-96 bg-gradient-to-br from-yellow-200/40 to-transparent rounded-3xl blur-2xl" />
      <div className="absolute top-10 left-20 w-64 h-96 bg-gradient-to-bl from-yellow-200/40 to-transparent rounded-3xl blur-2xl" />

      {/* Wall */}
      <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-b from-[#B8D8B8] to-[#9FB88E]" />

      {/* Floor */}
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-b from-[#D4A574] to-[#B8895E]">
        {/* Floor boards */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 left-0 right-0 bg-[#A07754] opacity-30"
            style={{ bottom: `${i * 12}%` }}
          />
        ))}
      </div>

      {/* Left window */}
      <div className="absolute top-12 left-16 w-48 h-64 bg-gradient-to-br from-[#B8E6F5]/80 to-[#87CEEB]/60 rounded-lg border-4 border-[#8B7355] shadow-xl overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
          <div className="border-2 border-[#8B7355]/40 rounded" />
          <div className="border-2 border-[#8B7355]/40 rounded" />
          <div className="border-2 border-[#8B7355]/40 rounded" />
          <div className="border-2 border-[#8B7355]/40 rounded" />
        </div>
        {/* Sunlight through window */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-transparent" />
        {/* Simple plant silhouette */}
        <div className="absolute bottom-0 left-4 w-12 h-20 bg-gradient-to-t from-[#4A7C59] to-[#6B9B7C] rounded-t-full opacity-60" />
      </div>

      {/* Right window */}
      <div className="absolute top-12 right-16 w-48 h-64 bg-gradient-to-br from-[#B8E6F5]/80 to-[#87CEEB]/60 rounded-lg border-4 border-[#8B7355] shadow-xl overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
          <div className="border-2 border-[#8B7355]/40 rounded" />
          <div className="border-2 border-[#8B7355]/40 rounded" />
          <div className="border-2 border-[#8B7355]/40 rounded" />
          <div className="border-2 border-[#8B7355]/40 rounded" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-transparent" />
      </div>

      {/* Door */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-32 h-56 bg-gradient-to-br from-[#7BC4B8] to-[#5A9B8B] rounded-t-3xl border-4 border-[#8B7355] shadow-xl">
        <div className="absolute top-1/2 right-4 w-3 h-3 bg-[#D4AF37] rounded-full shadow-md" />
        <div className="absolute inset-4 border-2 border-[#6AAAA0]/40 rounded-t-2xl" />
      </div>

      {/* Left plant pot */}
      <div className="absolute bottom-32 left-32">
        <div className="w-20 h-16 bg-gradient-to-b from-[#CD853F] to-[#8B5A3C] rounded-b-2xl" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-24">
          <div className="absolute bottom-0 left-4 w-8 h-20 bg-gradient-to-t from-[#4A7C59] to-[#6B9B7C] rounded-t-full" />
          <div className="absolute bottom-8 left-0 w-6 h-16 bg-gradient-to-t from-[#4A7C59] to-[#7BA88C] rounded-t-full transform -rotate-12" />
          <div className="absolute bottom-8 right-0 w-6 h-16 bg-gradient-to-t from-[#4A7C59] to-[#7BA88C] rounded-t-full transform rotate-12" />
        </div>
      </div>

      {/* Right plant pot */}
      <div className="absolute bottom-32 right-32">
        <div className="w-20 h-16 bg-gradient-to-b from-[#CD853F] to-[#8B5A3C] rounded-b-2xl" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-24">
          <div className="absolute bottom-0 left-4 w-8 h-20 bg-gradient-to-t from-[#4A7C59] to-[#6B9B7C] rounded-t-full" />
          <div className="absolute bottom-8 left-0 w-6 h-16 bg-gradient-to-t from-[#4A7C59] to-[#7BA88C] rounded-t-full transform -rotate-12" />
          <div className="absolute bottom-8 right-0 w-6 h-16 bg-gradient-to-t from-[#4A7C59] to-[#7BA88C] rounded-t-full transform rotate-12" />
        </div>
      </div>

      {/* Rug */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-96 h-64 bg-gradient-to-br from-[#E8B4A8] to-[#D89B8D] rounded-3xl shadow-lg opacity-80">
        <div className="absolute inset-4 border-4 border-[#C88570]/40 rounded-2xl" />
        <div className="absolute inset-8 border-2 border-[#C88570]/30 rounded-xl" />
      </div>

      {/* Floating dust particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 40}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

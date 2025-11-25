import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#FFF8E7] via-[#F5E6D3] to-[#E8D4C0] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 text-8xl animate-bounce">😺</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Ghibli Kitten</h1>
        <p className="text-gray-600 mb-8">Loading your virtual pet...</p>
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

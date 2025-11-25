import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Subtle overlay to ensure UI elements are visible */}
      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
};

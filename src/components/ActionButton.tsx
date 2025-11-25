import React from 'react';

interface ActionButtonProps {
  label: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  disabled = false,
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center gap-2
        px-6 py-4 rounded-2xl
        font-medium text-sm
        transition-all duration-300 transform
        ${
          active
            ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-xl scale-105'
            : 'bg-gradient-to-br from-white to-gray-50 text-gray-700 shadow-lg hover:shadow-xl hover:scale-105'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-yellow-50 hover:to-orange-50'}
        backdrop-blur-sm border-2 ${active ? 'border-yellow-500' : 'border-white/50'}
      `}
    >
      <span className="text-3xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

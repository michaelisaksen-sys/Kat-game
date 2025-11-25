import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue, color, icon }) => {
  const percentage = (value / maxValue) * 100;

  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'pink':
        return 'bg-pink-500';
      case 'blue':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };

  const getBgColorClasses = () => {
    switch (color) {
      case 'red':
        return 'bg-red-200';
      case 'yellow':
        return 'bg-yellow-200';
      case 'pink':
        return 'bg-pink-200';
      case 'blue':
        return 'bg-blue-200';
      default:
        return 'bg-green-200';
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
      <span className="text-2xl">{icon}</span>
      <div className="flex flex-col gap-1 min-w-[120px]">
        <div className="text-xs font-medium text-gray-700">{label}</div>
        <div className={`relative h-3 ${getBgColorClasses()} rounded-full overflow-hidden`}>
          <div
            className={`absolute inset-y-0 left-0 ${getColorClasses()} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>
        <div className="text-xs text-gray-600 text-right">
          {Math.round(value)}/{maxValue}
        </div>
      </div>
    </div>
  );
};

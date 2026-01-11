import React from 'react';
import { Mode } from '../../utils/calculator';

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  const modes: { id: Mode; label: string }[] = [
    { id: 'shoot', label: 'Shoot / AT' },
    { id: 'block', label: 'Block / DF' },
    { id: 'gk', label: 'Keeper / GK' },
  ];

  return (
    <div className="flex rounded-md shadow-sm mb-6" role="group">
      {modes.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onModeChange(m.id)}
          className={`flex-1 px-4 py-2 text-sm font-medium border first:rounded-l-lg last:rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-700
            ${
              currentMode === m.id
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'
            }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
};

import React from 'react';

interface ResultDisplayProps {
  total: number;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ total }) => {
  return (
    <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg mb-6 text-center">
      <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Power</h2>
      <div className="text-5xl font-extrabold text-blue-400 tracking-tighter">
        {total.toLocaleString()}
      </div>
      <p className="text-xs text-slate-500 mt-2">Calculated based on stats & modifiers</p>
    </div>
  );
};

import React from 'react';

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputNumber: React.FC<InputNumberProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="number"
        className={`px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

import React from 'react';
import { CalcParams, Mode } from '../../utils/calculator';
import { InputNumber } from '../common/InputNumber';
import { Button } from '../common/Button';

interface CalculatorFormProps {
  mode: Mode;
  params: CalcParams;
  onUpdate: (key: keyof CalcParams, value: any) => void;
  onReset: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ mode, params, onUpdate, onReset }) => {
  const isGK = mode === 'gk';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700">Input Stats</h3>
        <Button variant="secondary" onClick={onReset} className="text-xs px-2 py-1">Reset</Button>
      </div>

      {/* Rarity / Mode Toggles */}
      {!isGK && (
        <div className="mb-6 p-4 bg-slate-50 rounded-md border border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-2">Special Modes</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={params.isHero}
                onChange={(e) => onUpdate('isHero', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-900 font-medium">HERO Mode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={params.isBasara}
                onChange={(e) => onUpdate('isBasara', e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-slate-900">BASARA Mode</span>
            </label>
          </div>
        </div>
      )}

      {/* Base Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <InputNumber
          label="Base Kick / Catch"
          value={params.basePower || ''}
          onChange={(e) => onUpdate('basePower', Number(e.target.value))}
          placeholder="0"
        />
        <InputNumber
          label="Base Control / Tech"
          value={params.baseControl || ''}
          onChange={(e) => onUpdate('baseControl', Number(e.target.value))}
          placeholder="0"
        />
      </div>

      {/* Technique */}
      <div className="mb-6">
        <InputNumber
          label="Technique Power (技威力)"
          value={params.techniquePower || ''}
          onChange={(e) => onUpdate('techniquePower', Number(e.target.value))}
          placeholder="e.g. 100"
        />
      </div>

      {/* GK Specific */}
      {isGK && (
        <div className="mb-6">
           {/* Add Attribute Advantage Logic if needed */}
           <label className="block text-sm font-medium text-slate-700 mb-1">Matchup</label>
           <select 
             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
             value={params.matchupAdvantage}
             onChange={(e) => onUpdate('matchupAdvantage', parseFloat(e.target.value))}
           >
             <option value={1.0}>Normal (等倍)</option>
             <option value={1.2}>Advantage (有利 1.2x)</option>
             <option value={0.8}>Disadvantage (不利 0.8x)</option>
           </select>
        </div>
      )}

      {/* Beans & Equip (Simplified UI for Ver 1.0) */}
      <details className="mb-4 group">
        <summary className="cursor-pointer text-slate-500 hover:text-blue-600 text-sm font-medium mb-2 list-none flex items-center">
            <span className="mr-2">▶</span> Advanced (Beans & Equip)
        </summary>
        <div className="p-4 border-t border-slate-100 grid grid-cols-2 gap-4">
             <InputNumber label="Beans (Kick)" value={params.beanKick} onChange={e => onUpdate('beanKick', Number(e.target.value))} />
             <InputNumber label="Beans (Ctrl)" value={params.beanControl} onChange={e => onUpdate('beanControl', Number(e.target.value))} />
             <InputNumber label="Equip (Kick)" value={params.equipKick} onChange={e => onUpdate('equipKick', Number(e.target.value))} />
             <InputNumber label="Equip (Ctrl)" value={params.equipControl} onChange={e => onUpdate('equipControl', Number(e.target.value))} />
        </div>
      </details>

    </div>
  );
};

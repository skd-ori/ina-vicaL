import { useState, useMemo } from 'react';
import { Mode, CalcParams, calculateTotalPower } from '../utils/calculator';

export const useCalculator = () => {
  const [mode, setMode] = useState<Mode>('shoot');
  
  const [params, setParams] = useState<CalcParams>({
    basePower: 0,
    baseControl: 0,
    techniquePower: 0,
    matchupAdvantage: 1.0,
    isHero: false,
    isBasara: false,
    isLegendary: false,
    equipKick: 0,
    equipControl: 0,
    beanKick: 0,
    beanControl: 0,
    bonusRate: 0,
  });

  const totalPower = useMemo(() => {
    return calculateTotalPower(params, mode);
  }, [params, mode]);

  const updateParam = (key: keyof CalcParams, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const resetParams = () => {
    setParams(prev => ({
      ...prev,
      basePower: 0,
      baseControl: 0,
      techniquePower: 0,
      equipKick: 0,
      equipControl: 0,
      beanKick: 0,
      beanControl: 0,
       // Keep flags? Maybe reset those too or keep them
    }));
  };

  return {
    mode,
    setMode,
    params,
    updateParam,
    totalPower,
    resetParams
  };
};

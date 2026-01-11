export type Mode = 'shoot' | 'block' | 'gk';

export interface Character {
  id: number;
  name: string;
  kick: number;
  control: number;
  technique: number;
  isHero: boolean;
  // Add more as needed based on JSON
}

export interface CalcParams {
  basePower: number; // For manual or preset
  baseControl: number;
  techniquePower: number;
  matchupAdvantage: number; // 1.0, 1.2, 0.8
  isHero: boolean;
  isBasara: boolean; // Future
  isLegendary: boolean;
  // Equipment
  equipKick: number;
  equipControl: number;
  // Beans
  beanKick: number;
  beanControl: number;
  // Passives (simplified for now)
  bonusRate: number; // e.g., 0.1 for +10%
}

export const calculateTotalPower = (params: CalcParams, mode: Mode): number => {
  let kick = params.basePower;
  let control = params.baseControl;

  // 1. Rarity / Category Multiplier
  let rarityMult = 1.0;
  if (params.isHero) {
    rarityMult = 1.2; // Hypothesis for HERO
  } else if (params.isLegendary) {
    rarityMult = 1.4; // Legendary
  }
  // Basara handling?

  // Apply Rarity to Base
  let effKick = Math.floor(kick * rarityMult);
  let effControl = Math.floor(control * rarityMult);

  // 2. Add Beans
  effKick += params.beanKick;
  effControl += params.beanControl;

  // 3. Add Equipment
  effKick += params.equipKick;
  effControl += params.equipControl;

  // 4. Calculate Character Power (Base for Tech)
  // Formula approx: (Kick + Control*0.25) or similar? 
  // Let's use the standard Inazuma typical formula structure or the one from old script
  // Old script: kickEff = floor(base * rarity) + bean + equip
  // Total = (KickEff * ...) 
  
  // From old script.js logic:
  // totalPower = floor( (kickEff + techPower * techRate) * modifiers )
  
  // Let's assume a simplified formula for Ver 1.0 based on requirements
  // Total = (EffectiveKick + EffectiveControl/4) * (1 + BonusRate) + TechniquePower
  
  // Placeholder logic until exact formula is confirmed from script.js analysis
  const charPower = effKick + Math.floor(effControl * 0.25);
  
  let total = charPower;
  
  // Add Technique
  total += params.techniquePower;

  // Multipliers
  total = Math.floor(total * params.matchupAdvantage);
  total = Math.floor(total * (1 + params.bonusRate));

  return Math.max(0, total); // Ensure no negative
};

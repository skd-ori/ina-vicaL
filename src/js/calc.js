// --- Calculation Logic ---

window.calc = {
    getTechniquePower: function (base, evo) {
        const list = window.techniqueLookup[base];
        if (!list) return 0;
        const evoIndex = parseInt(evo) - 1;
        if (evoIndex < 0 || evoIndex >= list.length) return 0;
        return list[evoIndex];
    },

    parseEquip: function (val) {
        if (!val) return { k: 0, c: 0, t: 0, i: 0, a: 0, p: 0, m: 0 };
        const parts = val.split(',');
        return {
            k: parseFloat(parts[0]) || 0,
            c: parseFloat(parts[1]) || 0,
            t: parseFloat(parts[2]) || 0,
            i: parseFloat(parts[3]) || 0,
            a: parseFloat(parts[4]) || 0,
            p: parseFloat(parts[5]) || 0,
            m: parseFloat(parts[6]) || 0
        };
    },

    // Main Calculation Function
    calculate: function () {
        const s = window.appState;
        const d = window.dom;

        // Auto-lock logic for Base 30
        if (d.basePower && d.evolution) {
            const is30 = (d.basePower.value === '30');
            window.ui.toggleMatchupLock(is30);

            const evoContainer = d.evolution.parentElement.querySelector('.segmented-control');
            if (evoContainer) {
                const btns = evoContainer.querySelectorAll('.segment-btn');
                if (is30) {
                    if (d.evolution.value !== '1') {
                        d.evolution.value = '1';
                        btns.forEach(b => b.classList.remove('active'));
                        if (btns[0]) btns[0].classList.add('active');
                    }
                    btns.forEach((b, i) => {
                        if (i > 0) b.classList.add('disabled');
                    });
                } else {
                    btns.forEach(b => b.classList.remove('disabled'));
                }
            }
        }

        let kickEff = 0;
        let controlEff = 0;

        if (s.isManual) {
            kickEff = parseFloat(d.kickManual.value) || 0;
            controlEff = parseFloat(d.controlManual.value) || 0;
        } else {
            const cat = d.presetCategory ? d.presetCategory.value : 'standard';
            const kBean = parseFloat(d.kickBean.value) || 0;
            const cBean = parseFloat(d.controlBean.value) || 0;

            const eBoots = this.parseEquip(d.equipBoots.value);
            const eBrace = this.parseEquip(d.equipBracelet.value);
            const ePend = this.parseEquip(d.equipPendant.value);
            const eSpec = this.parseEquip(d.equipSpecial.value);

            const totalEquipKick = eBoots.k + eBrace.k + ePend.k + eSpec.k;
            const totalEquipCtrl = eBoots.c + eBrace.c + ePend.c + eSpec.c;

            const isBasara = (cat === 'basara');
            const isLegendary = (cat === 'standard');

            if (isBasara) {
                kickEff = s.activeBaseKick + kBean + totalEquipKick;
                controlEff = s.activeBaseCtrl + cBean + totalEquipCtrl;
            } else if (isLegendary && s.lastSelectedLegendaryChar) {
                kickEff = s.activeBaseKick + kBean + totalEquipKick;
                controlEff = s.activeBaseCtrl + cBean + totalEquipCtrl;
            } else {
                const rarityMult = 1.4;
                kickEff = Math.floor(s.activeBaseKick * rarityMult) + kBean + totalEquipKick;
                controlEff = Math.floor(s.activeBaseCtrl * rarityMult) + cBean + totalEquipCtrl;
            }
        }

        if (d.calcKick) d.calcKick.textContent = kickEff;
        if (d.calcControl) d.calcControl.textContent = controlEff;

        let charMultiplier = parseFloat(d.charMatchup.value);
        if (s.superMoveState === 'accel' && charMultiplier === 1.2) {
            charMultiplier = 2.0;
        }

        const statsSum = kickEff + controlEff;
        const characterPowerBase = statsSum * charMultiplier;

        let bonusPercent = (parseFloat(d.multiplier.value) || 0);
        if (s.superMoveState === 'od') bonusPercent += 50;
        if (s.superMoveState === 'keshin') bonusPercent += 40;
        if (s.superMoveState === 'armed') bonusPercent += 20;
        if (s.superMoveState === 'accel') bonusPercent += 30;
        if (s.superMoveState === 'boost30') bonusPercent += 30;

        // Passives
        const pTeamSame = parseFloat(document.getElementById('p_team_same')?.value || 0);
        const pTeamDiff = parseFloat(document.getElementById('p_team_diff')?.value || 0);
        const pTeamPos = parseFloat(document.getElementById('p_team_pos')?.value || 0);
        const pTeamSurr = parseFloat(document.getElementById('p_team_surround')?.value || 0);
        const pMood = parseFloat(document.getElementById('p_mood')?.value || 0);

        const pJustice = parseFloat(document.getElementById('p_justice')?.value || 0);
        const pCounter = parseFloat(document.getElementById('p_counter')?.value || 0);
        const pTension = parseFloat(document.getElementById('p_tension')?.value || 0);
        const pKizuna = parseFloat(document.getElementById('p_kizuna')?.value || 0);
        const pEnemy = parseFloat(document.getElementById('p_self_enemy')?.value || 0);
        const pNearbySame = parseFloat(document.getElementById('p_self_same')?.value || 0);
        const pNearbyDiff = parseFloat(document.getElementById('p_self_diff')?.value || 0);
        const pHalf1 = parseFloat(document.getElementById('p_half_1')?.value || 0);
        const pHalf2 = parseFloat(document.getElementById('p_half_2')?.value || 0);

        const totalPassive = pTeamSame + pTeamDiff + pTeamPos + pTeamSurr + pMood +
            pJustice + pCounter + pTension + pKizuna + pEnemy +
            pNearbySame + pNearbyDiff + pHalf1 + pHalf2;

        bonusPercent += totalPassive;


        let totalMultiplier = 1 + (bonusPercent / 100);
        const hasSpecialCond = d.specialCond.checked;
        const specialMultiplier = hasSpecialCond ? (parseFloat(d.specialCondValue.value) || 1.0) : 1.0;
        totalMultiplier *= specialMultiplier;

        const characterPowerFinal = Math.floor(characterPowerBase * totalMultiplier);
        if (d.characterPower) d.characterPower.textContent = characterPowerFinal;

        const base = d.basePower.value;
        const evo = d.evolution.value;
        let baseTechPower = 0;
        if (base === '0') {
            baseTechPower = 0;
        } else {
            baseTechPower = this.getTechniquePower(base, evo);
        }

        let techMatchupMult = parseFloat(d.techMatchup.value);
        if (s.superMoveState === 'accel' && techMatchupMult === 1.2) {
            techMatchupMult = 2.0;
        }

        let finalTech = baseTechPower;
        if (s.superMoveState === 'armed') {
            finalTech *= 1.5;
        }
        finalTech *= techMatchupMult;
        finalTech = Math.floor(finalTech);

        if (d.techniquePowerDisplay) d.techniquePowerDisplay.textContent = finalTech;

        const rawSum = characterPowerBase + finalTech;
        const totalAT = Math.floor(rawSum * totalMultiplier);

        if (d.totalAt) d.totalAt.textContent = totalAT;

        // Save result to slot
        s.slots[s.activeSlot].result = totalAT;

        this.updateChainResult(totalAT);
    },

    updateChainResult: function (totalAT) {
        const s = window.appState;
        const d = window.dom;

        // Battle Result Logic
        const oppPower = parseFloat(d.opponentPower ? d.opponentPower.value : 0) || 0;

        // Chain Logic
        let chainBonus = 0;
        if (s.activeSlot > 1 && s.battleMode === 'at') {
            const isChain = d.isChain && d.isChain.checked;
            if (isChain) {
                chainBonus = s.slots[s.activeSlot - 1].result || 0;
                if (d.chainPower) d.chainPower.value = chainBonus;
            } else {
                if (d.chainPower) d.chainPower.value = '';
            }
        }

        const finalMyPower = totalAT + chainBonus;

        if (d.battleResultText) {
            if (oppPower === 0) {
                d.battleResultText.textContent = `Total: ${finalMyPower}`;
                d.battleResultText.style.color = "#cbd5e1"; // Neutral
            } else {
                const diff = finalMyPower - oppPower;
                if (diff > 0) {
                    d.battleResultText.textContent = `WIN! (+${diff})`;
                    d.battleResultText.style.color = "#22c55e"; // Green
                } else if (diff < 0) {
                    d.battleResultText.textContent = `LOSE... (${diff})`;
                    d.battleResultText.style.color = "#ef4444"; // Red
                } else {
                    d.battleResultText.textContent = "DRAW";
                    d.battleResultText.style.color = "#eab308"; // Yellow
                }
            }
        }
    }
};

// Alias for compatibility
window.calculate = function () { window.calc.calculate(); };
window.getTechniquePower = window.calc.getTechniquePower;
window.parseEquip = window.calc.parseEquip;

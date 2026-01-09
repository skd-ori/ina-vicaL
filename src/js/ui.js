// --- UI & Event Handling ---

window.ui = {
    init: function () {
        // Cache DOM elements
        window.dom = {
            inputsMode: document.getElementsByName('inputMode'),
            presetContainer: document.getElementById('presetContainer'),
            manualContainer: document.getElementById('manualContainer'),
            calcKick: document.getElementById('calcKick'),
            calcControl: document.getElementById('calcControl'),
            kickManual: document.getElementById('kickManual'),
            controlManual: document.getElementById('controlManual'),
            basePower: document.getElementById('basePower'),
            evolution: document.getElementById('evolution'),
            multiplier: document.getElementById('multiplier'),
            charMatchup: document.getElementById('charMatchup'),
            techMatchup: document.getElementById('techMatchup'),
            specialCond: document.getElementById('specialCond'),
            specialCondValue: document.getElementById('specialCondValue'),
            kickBean: document.getElementById('kickBean'),
            controlBean: document.getElementById('controlBean'),
            luckBean: document.getElementById('luckBean'), // Fixed missing
            equipBoots: document.getElementById('equipBoots'),
            equipBracelet: document.getElementById('equipBracelet'),
            equipPendant: document.getElementById('equipPendant'),
            equipSpecial: document.getElementById('equipSpecial'),
            presetCategory: document.getElementById('presetCategory'),
            presetsStandard: document.getElementById('presets-standard'),
            presetsBasara: document.getElementById('presets-basara'),
            presetsHero: document.getElementById('presets-hero'),
            btnModeAT: document.getElementById('btnModeAT'),
            btnModeDF: document.getElementById('btnModeDF'),
            opponentPower: document.getElementById('opponentPower'),
            battleResultText: document.getElementById('battleResultText'),
            isChain: document.getElementById('isChain'),
            chainToggleContainer: document.getElementById('chainToggleContainer'),
            basaraRoute: document.getElementById('basaraRoute'),
            basaraRouteContainer: document.getElementById('basaraRouteContainer'),
            labelKickBean: document.getElementById('labelKickBean'),
            labelControlBean: document.getElementById('labelControlBean'),
            chainPower: document.getElementById('chainPower'),
            chainPowerInput: document.getElementById('chainPowerInput'),
            passiveContainer: document.getElementById('passiveContainer'),
            techniquePowerDisplay: document.getElementById('techniquePowerDisplay'),
            characterPower: document.getElementById('characterPower'),
            totalAt: document.getElementById('totalAt')
        };

        // Add event listeners that were previously implicit or inline
        // (Note: Many are still inline in HTML, which is fine for now, but we're defining the handlers here)
    },

    setBattleMode: function (mode) {
        window.appState.battleMode = mode;
        const d = window.dom;

        if (d.btnModeAT && d.btnModeDF) {
            d.btnModeAT.className = mode === 'at' ? 'tab-btn active' : 'tab-btn';
            d.btnModeDF.className = mode === 'df' ? 'tab-btn active' : 'tab-btn';
        }

        const lblKick = d.labelKickBean;
        const lblCtrl = d.labelControlBean;

        if (mode === 'at') {
            if (lblKick) lblKick.textContent = "Kick Beans (+0~82)";
            if (lblCtrl) lblCtrl.textContent = "Ctrl Beans (+0~82)";
            if (d.chainToggleContainer) d.chainToggleContainer.style.display = 'block';
            if (d.opponentPower) d.opponentPower.placeholder = "Opponent Block";

            const isChain = d.isChain && d.isChain.checked;
            if (d.chainPowerInput) d.chainPowerInput.style.display = isChain ? 'block' : 'none';

            document.querySelectorAll('.at-equip').forEach(b => b.style.display = 'block');
            document.querySelectorAll('.df-equip').forEach(b => b.style.display = 'none');
        } else {
            if (lblKick) lblKick.textContent = "Def/Catch Beans";
            if (lblCtrl) lblCtrl.textContent = "Tech Beans";
            if (d.chainToggleContainer) d.chainToggleContainer.style.display = 'none';
            if (d.isChain) d.isChain.checked = false;
            if (d.chainPowerInput) d.chainPowerInput.style.display = 'none';
            if (d.opponentPower) d.opponentPower.placeholder = "Incoming Shoot";

            document.querySelectorAll('.at-equip').forEach(b => b.style.display = 'block');
            document.querySelectorAll('.df-equip').forEach(b => b.style.display = 'block');
        }
        window.calc.calculate();
    },

    toggleMatchupLock: function (is30) {
        // Logic moved to calc.js mainly, but UI updates can happen here if needed
    },

    showToast: function (message) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    },

    copyResults: function () {
        const d = window.dom;
        const text = `
Inazuma Eleven Calc (LV50):
---------------------------
Kick: ${d.calcKick.textContent}
Ctrl: ${d.calcControl.textContent}
Char Power: ${d.characterPower.textContent}
Tech Power: ${d.techniquePowerDisplay.textContent}
Total AT: ${d.totalAt.textContent}
---------------------------`.trim();

        navigator.clipboard.writeText(text).then(() => {
            this.showToast("コピーしました！");
        }).catch(err => {
            console.error('Failed to copy', err);
            alert('Copy failed');
        });
    },

    // Segmented Control Helper
    refreshSegmentedUI: function () {
        const sync = (id) => {
            const sel = document.getElementById(id);
            if (!sel) return;
            const val = sel.value;
            const container = sel.nextElementSibling || sel.parentElement.querySelector('.segmented-control');
            if (container) {
                container.querySelectorAll('.segment-btn').forEach(b => {
                    // This is a bit specific to how implicit clicks were working
                    if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${val}'`)) {
                        b.classList.add('active');
                    } else if (b.textContent.includes(val)) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });
            }
        };
        ['presetCategory', 'equipBoots', 'equipBracelet', 'equipPendant', 'basePower', 'evolution', 'charMatchup', 'techMatchup'].forEach(sync);
    },

    updateChainUI: function () {
        const d = window.dom;
        const s = window.appState;

        const chainContainer = d.chainToggleContainer;
        const chainInput = d.chainPower;

        if (s.activeSlot > 1) {
            if (chainContainer) chainContainer.style.display = 'block';
            if (chainInput) {
                chainInput.placeholder = `${s.activeSlot - 1}人目の結果`;
                chainInput.readOnly = true;
            }
        } else {
            if (chainContainer) chainContainer.style.display = 'none';
            if (d.isChain) d.isChain.checked = false;
        }
    },

    setEquipSet: function (pos) {
        const sets = {
            'fw': [
                { id: 'equipBoots', val: '35,35,0,0,0,0,0', text: 'スパイク' },
                { id: 'equipBracelet', val: '30,29,0,0,0,0,0', text: '深淵' },
                { id: 'equipPendant', val: '30,40,0,0,0,0,0', text: '王者' },
                { id: 'equipSpecial', val: '30,0,40,0,0,0,0', text: 'ペガサス' }
            ],
            'shooter_mf': [
                { id: 'equipBoots', val: '35,35,0,0,0,0,0', text: 'スパイク' },
                { id: 'equipBracelet', val: '26,0,0,28,0,0,0', text: '野望' },
                { id: 'equipPendant', val: '30,40,0,0,0,0,0', text: '王者' },
                { id: 'equipSpecial', val: '30,0,40,0,0,0,0', text: 'ペガサス' }
            ],
            'mf': [
                { id: 'equipBoots', val: '0,30,28,0,0,0,0', text: 'エンシェント' },
                { id: 'equipBracelet', val: '0,0,18,0,22,0,0', text: '慈愛' },
                { id: 'equipPendant', val: '0,0,19,21,0,0,0', text: '紺碧' },
                { id: 'equipSpecial', val: '0,28,30,0,0,0,0', text: '鬼道' }
            ],
            'focus_df': [
                { id: 'equipBoots', val: '0,0,25,28,0,0,0', text: 'ジェネシス' },
                { id: 'equipBracelet', val: '0,0,0,23,23,0,0', text: '最果て' },
                { id: 'equipPendant', val: '15,15,0,0,0,0,0', text: '門番' },
                { id: 'equipSpecial', val: '0,0,0,21,17,0,0', text: '新型グラス' }
            ],
            'wall_df': [
                { id: 'equipBoots', val: '0,0,0,0,0,28,26', text: 'プロトコル' },
                { id: 'equipBracelet', val: '0,0,0,18,0,0,18', text: '影' },
                { id: 'equipPendant', val: '0,0,0,25,0,0,24', text: '彗星' },
                { id: 'equipSpecial', val: '0,0,0,0,0,26,27', text: 'レイトン' }
            ],
            'gk': [
                { id: 'equipBoots', val: '0,0,0,0,0,28,26', text: 'プロトコル' },
                { id: 'equipBracelet', val: '0,0,0,0,35,35,0', text: 'じいちゃん' },
                { id: 'equipPendant', val: '0,0,0,0,29,27,0', text: '守護者' },
                { id: 'equipSpecial', val: '0,0,0,0,35,0,35', text: '円堂' }
            ]
        };

        const s = sets[pos];
        if (!s) return;

        s.forEach(item => {
            const container = document.getElementById(item.id).nextElementSibling;
            if (!container) return;
            let targetBtn = Array.from(container.querySelectorAll('.segment-btn')).find(b => b.textContent.includes(item.text));
            if (!targetBtn) {
                targetBtn = Array.from(container.querySelectorAll('.segment-btn')).find(b => b.getAttribute('onclick').includes(`'${item.val}'`));
            }
            if (targetBtn) {
                window.setSegment(item.id, item.val, targetBtn);
            }
        });
    }
};

// Global Exposure
window.setBattleMode = window.ui.setBattleMode;
window.copyResults = window.ui.copyResults.bind(window.ui);
window.showToast = window.ui.showToast;
window.setEquipSet = window.ui.setEquipSet;

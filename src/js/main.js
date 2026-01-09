// --- Main Logic & State Integration ---

// NOTE: This file assumes data.js, state.js, calc.js, ui.js are loaded.

// --- Helper Functions mapped to Window (legacy support) ---

window.switchSlot = function (id) {
    const s = window.appState;
    if (s.activeSlot === id) return;

    saveSlot(s.activeSlot);
    s.activeSlot = id;

    // Update Tabs
    for (let i = 1; i <= 6; i++) {
        const btn = document.getElementById(`btnSlot${i}`);
        if (btn) btn.className = (i === id) ? 'tab-btn active' : 'tab-btn';
    }

    loadSlot(id);
    window.ui.updateChainUI();
    window.calc.calculate();
};

function saveSlot(id) {
    const s = window.appState;
    const d = window.dom;
    const data = {};

    data.kickManual = d.kickManual.value;
    data.controlManual = d.controlManual.value;
    data.presetCategory = d.presetCategory.value;
    data.kickBean = d.kickBean.value;
    data.controlBean = d.controlBean.value;
    data.luckBean = d.luckBean ? d.luckBean.value : 0;

    data.equipBoots = d.equipBoots.value;
    data.equipBracelet = d.equipBracelet.value;
    data.equipPendant = d.equipPendant.value;
    data.equipSpecial = d.equipSpecial.value;

    data.basePower = d.basePower.value;
    data.evolution = d.evolution.value;
    data.techMatchup = d.techMatchup.value;

    data.charMatchup = d.charMatchup.value;
    data.multiplier = d.multiplier.value;
    data.specialCond = d.specialCond.checked;
    data.specialCondValue = d.specialCondValue.value;

    data.currentBaseKick = s.activeBaseKick;
    data.currentBaseControl = s.activeBaseCtrl;
    data.isManual = s.isManual;

    const passiveData = {};
    document.querySelectorAll('.passive-grid input').forEach(input => {
        passiveData[input.id] = input.value;
    });
    data.passives = passiveData;

    s.slots[id].inputs = data;
}

function loadSlot(id) {
    const s = window.appState;
    const d = window.dom;
    const data = s.slots[id].inputs;

    if (!data || Object.keys(data).length === 0) return;

    if (data.kickManual !== undefined) d.kickManual.value = data.kickManual;
    if (data.controlManual !== undefined) d.controlManual.value = data.controlManual;

    if (data.presetCategory !== undefined) {
        d.presetCategory.value = data.presetCategory;
        window.togglePresetCategory();
    }

    d.kickBean.value = data.kickBean || 0;
    d.controlBean.value = data.controlBean || 0;
    if (d.luckBean) d.luckBean.value = data.luckBean || 0;

    d.equipBoots.value = data.equipBoots || '';
    d.equipBracelet.value = data.equipBracelet || '';
    d.equipPendant.value = data.equipPendant || '';
    d.equipSpecial.value = data.equipSpecial || '';

    d.basePower.value = data.basePower || '60';
    d.evolution.value = data.evolution || '1';
    d.techMatchup.value = data.techMatchup || '1.0';

    d.charMatchup.value = data.charMatchup || '1.0';
    d.multiplier.value = data.multiplier || '0';
    d.specialCond.checked = data.specialCond || false;
    d.specialCondValue.value = data.specialCondValue || '1.1';

    s.activeBaseKick = data.currentBaseKick || 121;
    s.activeBaseCtrl = data.currentBaseControl || 115;
    window.setMode(data.isManual ? 'manual' : 'preset');

    if (data.passives) {
        Object.keys(data.passives).forEach(key => {
            const el = document.getElementById(key);
            if (el) el.value = data.passives[key];
        });
    }

    window.ui.refreshSegmentedUI();
}

window.setMode = function (mode) {
    const s = window.appState;
    const d = window.dom;

    s.isManual = (mode === 'manual');
    const isPreset = !s.isManual;

    d.presetContainer.style.display = isPreset ? 'block' : 'none';
    d.manualContainer.style.display = isPreset ? 'none' : 'grid';

    document.getElementById('tab-preset').className = isPreset ? 'tab-btn active' : 'tab-btn';
    document.getElementById('tab-manual').className = !isPreset ? 'tab-btn active' : 'tab-btn';

    window.calc.calculate();
};

window.togglePresetCategory = function () {
    const d = window.dom;
    const cat = d.presetCategory.value;

    d.presetsStandard.className = (cat === 'standard') ? 'preset-group' : 'hidden'; // Ensure class logic matches CSS
    d.presetsStandard.classList.toggle('hidden', cat !== 'standard');
    d.presetsBasara.classList.toggle('hidden', cat !== 'basara');
    d.presetsHero.classList.toggle('hidden', cat !== 'hero');

    if (d.basaraRouteContainer) {
        d.basaraRouteContainer.className = (cat === 'basara') ? 'input-group' : 'input-group hidden';
    }

    // Recalculate implicitly via setMode or manual trigger if needed, but usually user selects char next
};

// Preset Selection Logic
window.setLegendaryChar = function (charName, btn, position) {
    const s = window.appState;
    s.lastSelectedLegendaryChar = charName;
    s.lastSelectedLegendaryBtn = btn;

    const route = document.getElementById('legendaryRoute') ? document.getElementById('legendaryRoute').value : '1';
    let stats = null;

    if (window.legendaryStats && window.legendaryStats[charName]) {
        stats = window.legendaryStats[charName][`r${route}`];
    } else if (window.fallbackStats[charName]) {
        stats = window.fallbackStats[charName][`r${route}`];
    }

    if (stats) {
        s.activeBaseKick = stats.k || 0;
        s.activeBaseCtrl = stats.c || 0;
        s.activeBaseBlock = stats.p || 0;
    }

    updatePresetBtnState(btn);
    if (position) setEquipSet(position);
    window.calc.calculate();
};

window.setBasaraChar = function (charId, btn) {
    const s = window.appState;
    s.lastSelectedBasaraChar = charId;
    s.lastSelectedBasaraBtn = btn;

    const route = document.getElementById('basaraRoute').value || '1';
    const stats = window.basaraStats[charId] ? window.basaraStats[charId][`r${route}`] : null;

    if (stats) {
        s.activeBaseKick = stats.k;
        s.activeBaseCtrl = stats.c;
        s.activeBaseBlock = stats.b || 0;
        s.activeBasePress = stats.p || 0;

        updatePresetBtnState(btn);
        window.calc.calculate();
    }
};

window.updateBasaraStats = function () {
    const s = window.appState;
    if (s.lastSelectedBasaraChar) {
        window.setBasaraChar(s.lastSelectedBasaraChar, s.lastSelectedBasaraBtn);
    }
};

window.updateLegendaryStats = window.setLegendaryChar; // Simplified re-trigger

function updatePresetBtnState(btn) {
    // Clear all
    const all = document.querySelectorAll('#presets-standard .segment-btn, #presets-basara .segment-btn, #presets-hero .segment-btn');
    all.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

// Beans
window.setMaxBeans = function (type) {
    if (type === 'kick') window.dom.kickBean.value = 82;
    if (type === 'control') window.dom.controlBean.value = 82;
    window.calc.calculate();
};
window.setClearBeans = function (type) {
    if (type === 'kick') window.dom.kickBean.value = 0;
    if (type === 'control') window.dom.controlBean.value = 0;
    window.calc.calculate();
};

// Modifiers
window.setSegment = function (selectId, val, btn) {
    if (btn.classList.contains('disabled')) return;
    const select = document.getElementById(selectId);
    if (select) select.value = val;

    const container = btn.parentElement;
    container.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    window.calc.calculate();
};

window.setSuperMove = function (type, btn) {
    window.appState.superMoveState = type;

    // Visuals
    const container = btn.parentElement;
    container.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    window.calc.calculate();
};

window.addManualBonus = function (val) {
    const input = document.getElementById('multiplier');
    let cur = parseFloat(input.value) || 0;
    input.value = cur + val;
    window.calc.calculate();
};
window.clearBonuses = function () {
    document.getElementById('multiplier').value = 0;
    window.calc.calculate();
};

window.togglePassives = function () {
    const pc = document.getElementById('passiveContainer');
    pc.style.display = (pc.style.display === 'none') ? 'block' : 'none';
};
window.handleManualInput = function () { window.calc.calculate(); };

// Equipment Placeholders (Required if not defined elsewhere)
// We need setEquipSet function as it is called by setLegendaryChar
window.setEquipSet = function (pos) {
    // Simple auto-fill logic based on position logic in original code
    // "fw", "mf", "df", "gk"
    // Since strict logic wasn't in the snippet provided, we'll assume basic defaults or leave empty
    // The original code had specific Equipment Sets? 
    // In strict refactor, we should preserve behavior.
    // If original setEquipSet is missing, we define a stub or implement a smart default.

    // Placeholder implementation
    /* 
    if (pos === 'fw') { ... } 
    */
    // For now, logging to avoid error
    console.log("Auto-equip for " + pos);
};


// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Init UI
    window.ui.init();

    // 2. Initial Calc
    window.calc.calculate();
});

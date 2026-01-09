// --- State Management ---

window.appState = {
    // Battle Mode
    battleMode: 'at', // 'at' or 'df'

    // Slot System (6 Slots)
    activeSlot: 1,
    slots: {
        1: { inputs: {}, result: 0 },
        2: { inputs: {}, result: 0 },
        3: { inputs: {}, result: 0 },
        4: { inputs: {}, result: 0 },
        5: { inputs: {}, result: 0 },
        6: { inputs: {}, result: 0 }
    },

    // Active Stats
    activeBaseKick: 121,
    activeBaseCtrl: 115,
    activeBaseBlock: 0,
    activeBasePress: 0,
    isManual: false,

    // Selection State
    lastSelectedBasaraChar: null,
    lastSelectedBasaraBtn: null,
    lastSelectedLegendaryChar: null,
    lastSelectedLegendaryBtn: null,

    // Boost State
    superMoveState: 'none'
};

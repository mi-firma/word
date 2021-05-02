export default {
    addItem(state, payload) {
        state.items.push(payload);
        
        return state;
    },
    editEmail(state, payload){
        state.items[payload.index][1] = payload.selectedValue;
        return state;
    },
    editName(state, payload){
        state.items[payload.index][0] = payload.selectedValue;
        return state;
    },
    moveItem(state, payload) {
        var fromIndex = payload.fromIndex;
        var toIndex = payload.toIndex;
        function arraymove(state, fIndex, tIndex) {
            var element = state.items[fIndex];
            state.items.splice(fIndex, 1);
            state.items.splice(tIndex, 0, element);
        }
        arraymove(state,fromIndex,toIndex);
        return state;
    },
    clearItem(state, payload) {
        state.items.splice(payload.index, 1);
        
        return state;
    },
    setFlowType(state, payload) {
        state.tipoFlujo = payload;
        return state;
    },
    setSigners(state, payload) {
        state.signers = payload;
    
        return state
    },
    setSignersOrder(state, payload) {
        state.ordenFirmantes = payload;
    }
};

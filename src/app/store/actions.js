export default {
    addItem(context, payload) {
        context.commit('addItem', payload);
    },
    editEmail(context, payload) {
        context.commit('editEmail', payload);
    },
    editName(context, payload) {
        context.commit('editName', payload);
    },
    moveItem(context, payload) {
        context.commit('moveItem', payload);
    },
    clearItem(context, payload) {
        context.commit('clearItem', payload);
    },
    setFlowType(context, payload) {
        context.commit('setFlowType', payload);
    },
    setSigners(context, payload) {
        context.commit('setSigners', payload);
    },
    setSignersOrder(context, payload) {
        context.commit('setSignersOrder', payload);
    }
};

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentAddress: 0,
        walletInfo: {},
        chainId: '',
        referrer: '',
    },
    mutations: {
        getCurrentAddress(state, newval) {
            state.currentAddress = newval
        },
        getWalletInfo(state, newval) {
            state.walletInfo = newval
        },
        getChainId(state, newVal) {
            state.chainId = newVal
        },
        getReferrer(state, newVal) {
            state.referrer = newVal
        }
    }
})
export default store

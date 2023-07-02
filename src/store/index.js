import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentAddress: 0,
        walletInfo: {},
        chainId: '',
        referrer: '',
        isLastBuyer: false,
        pot: ''
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
        },
        isLastBuyer(state, newVal) {
            state.isLastBuyer = newVal
        },
        setPot(state, newVal) {
            state.pot = newVal
        }
    }
})
export default store

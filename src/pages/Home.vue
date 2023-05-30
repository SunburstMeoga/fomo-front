<template>
    <div>
        <div ref="vantaRef" style="width:100%;height:100vh;position:fixed;z-index: -1;"></div>
        <menu-bar></menu-bar>
        <div class="bg-primary text-text rounded-lg mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12 p-2 text-center">
            {{ $t('word.illustrate') }}
        </div>
        <div v-if="$store.state.walletInfo.address && $store.state.chainId === '0x11623'">
            <module-title :titleWord="$t('account.infor')"></module-title>
            <div class="card mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12">
                <account />
            </div>
        </div>

        <module-title :titleWord="$t('purchase.title')" :secondTitle="$t('purchase.tips')"></module-title>
        <div class="card mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12">
            <purchase></purchase>
        </div>
        <module-title :titleWord="$t('round.title')"></module-title>
        <div class="card mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12">
            <prize-pool></prize-pool>
        </div>
    </div>
</template>

<script>

import * as THREE from 'three'
import Net from 'vanta/src/vanta.net'
import MenuBar from '../components/MenuBar.vue'
import ModuleTitle from '../components/ModuleTitle.vue'
import Purchase from '../components/Purchase.vue'
import PrizePool from '../components/PrizePool.vue'
import Account from '../components/Account'

export default {
    components: {
        MenuBar,
        ModuleTitle,
        Purchase,
        PrizePool,
        Account,
    },
    mounted() {
        this.vantaEffect = Net({
            el: this.$refs.vantaRef,
            THREE: THREE,
            color: '#DA251D',
            backgroundColor: '#000000',
            mouseControls: true,
            touchControls: true,
            scale: 1.00,
            scaleMobile: 1.20,
        })
    },
    beforeDestroy() {
        if (this.vantaEffect) {
            this.vantaEffect.destroy()
        }
    },
}
</script>

<style scoped>
.card {
    gap: 20px;
    border-radius: 11px;
    backdrop-filter: blur(3px);
    background-color: #262626;
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
}
</style>

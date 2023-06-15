<template>
    <div class="py-3 px-3">
        <div class="w-11/12 text-text">
            <div>{{ $t('popularize.referrerAddress') }}</div>
            <div class="break-words text-xs">{{ referrerAddress }}</div>
            <div class="flex justify-start items-baseline">
                {{ $t('popularize.referrerNumber') }}
                <span class="number">
                    <count-to :start-val="0" :end-val="referralsNumber" :duration="2000" />
                </span>
                {{ $t('popularize.people') }}
            </div>
            <div class="flex justify-start items-baseline">
                {{ $t('popularize.totalEarning') }}
                <span class="number">
                    <count-to :start-val="0" :end-val="referralsNumber * 0.05" :duration="2000" />
                </span> HAH
            </div>

            <!-- <div class="flex justify-start items-baseline">{{ $t('popularize.referrerNumber') }}
                <span class="number">
                    <count-to :start-val="0" :end-val="referralsNumber" :duration="5000" />
                </span>
                {{ $t('popularize.people') }} {{ $t('popularize.totalEarning') }}
                <span class="number">
                    <count-to :start-val="0" :end-val="referralsNumber * 0.05" :duration="2000" />
                </span> HAH
            </div> -->

        </div>
    </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { config } from '../const/config'
export default {
    components: {
        CountTo
    },
    data() {
        return {
            referralsNumber: 0,
            referralsEarnings: 0,
            referrerAddress: ''
        }
    },
    created() {
        localStorage.getItem('referrer') ? this.referrerAddress = localStorage.getItem('referrer') : '0x0000000000000000000000000000000000000000'
    },
    mounted() {
        this.getInviter()
        setInterval(() => {
            this.getInviter()
        }, 2000);
    },
    methods: {
        getInviter() {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.Inviter(localStorage.getItem('referrer') ? localStorage.getItem('referrer') : window.ethereum.selectedAddress).call().then((result) => {
                this.inviterInfo = result
                this.referralsNumber = Number(result.number)
                this.referralsEarnings = Number(result.amount)
            })
        }
    }
}
</script>

<style scoped>
.number {
    @apply px-1 font-bold text-primary text-2xl flex items-baseline
}
</style>
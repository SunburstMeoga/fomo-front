<template>
    <div class="py-3">
        <div class="w-11/12 mr-auto ml-auto sm:flex sm:flex-col sm:w-full sm:rounded-full sm:justify-between sm:px-10">
            <div class="flex justify-between items-center text-text">
                <div>{{ $t('account.address') }}</div>
                <div class="flex justify-start items-center">
                    <div class="sm:hidden">
                        {{ addressFilter($store.state.walletInfo.address) }}
                    </div>
                    <div class="hidden sm:block">
                        {{ $store.state.walletInfo.address }}
                    </div>
                    <div class="border cursor-pointer border-text rounded-2xl px-2 text-sm text-text ml-2"
                        @click="copyContent($store.state.walletInfo.address)">
                        {{ $t('word.copy') }}
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center text-text">
                <div>{{ $t('account.balance') }}</div>
                <div>{{ $store.state.walletInfo.balance }} HAH</div>
            </div>
            <div class="flex justify-between items-center text-text">
                <div>{{ $t('account.totalKeys') }}</div>
                <div>{{ keys }} </div>
            </div>
            <div class="flex justify-between items-center text-text">
                <div>{{ $t('account.earnings') }}</div>
                <div>{{ earnings }} HAH</div>
            </div>
            <div class="flex justify-between items-center text-text">
                <div>{{ $t('account.spend') }}</div>
                <div>{{ spend }} HAH</div>
            </div>
        </div>

    </div>
</template>

<script>
import { addressFilter } from '@/utils/format'
import { config } from '../const/config'
import { Toast } from 'vant'

export default {
    data() {
        return {
            keys: '',
            earnings: '',
            spend: ''
        }
    },
    mounted() {
        this.getAccountInfo()
    },
    methods: {
        addressFilter,
        getAccountInfo() {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.keyHolders(window.ethereum.selectedAddress).call().then((result) => {
                this.keys = parseInt(result)
                console.log('keys:', typeof this.keys)
                web3Contract.methods.totalKeysSold().call().then((totalKeysSold) => {
                    console.log('totalKeysSold', parseInt(totalKeysSold))
                    web3Contract.methods.accumulatedHolderPrizeShare().call().then((res) => {
                        this.earnings = parseInt(res) * parseInt(result) / parseInt(totalKeysSold)
                        console.log('earnings:', this.earnings, res, result, totalKeysSold)
                    })
                })
            })
            web3Contract.methods.accumulatedNewPlayerSpend(window.ethereum.selectedAddress).call().then((res) => {
                this.spend = parseInt(res)
                console.log(typeof this.spend)
            })
        },
        copyContent(content) {
            if (!content) return
            console.log(content)
            navigator.clipboard.writeText(content).then(() => {
                this.$notify({
                    title: this.$t('word.success'),
                    message: this.$t('word.copySuccess'),
                    type: 'success'
                })
            }, () => {
                this.$message.error(this.$t('message.fail'));
                this.$notify.error({
                    title: 'Error',
                    message: error.message
                })
            });
        },
    }
}
</script>

<style></style>
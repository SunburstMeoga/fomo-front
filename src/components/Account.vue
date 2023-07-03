<template>
    <div>
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
                    <div>{{ $store.state.walletInfo.balance }} {{ Config.chainName }}</div>
                </div>
                <div class="flex justify-between items-center text-text">
                    <div>{{ $t('account.epicycle') }}{{ $t('account.hold') }}{{ $t('account.totalKeys') }}</div>
                    <div>{{ accountInfo.numKey }} </div>
                </div>
                <div class="flex justify-between items-center text-text">
                    <div>{{ $t('account.history') }}{{ $t('account.hold') }}{{ $t('account.totalKeys') }}</div>
                    <div>{{ accountInfo.numKey_s }} </div>
                </div>

                <div class="flex justify-between items-center text-text">
                    <div>{{ $t('account.epicycle') }}{{ $t('account.spend') }}</div>
                    <div>{{ fromWei(accountInfo.spend) }} {{ Config.chainName }}</div>
                </div>
                <div class="flex justify-between items-center text-text">
                    <div>{{ $t('account.history') }}{{ $t('account.spend') }}</div>
                    <div>{{ fromWei(accountInfo.spend_s) }} {{ Config.chainName }}</div>
                </div>
                <div class="flex justify-between items-center text-text">
                    <div>{{ $t('account.epicycle') }}{{ $t('account.estimate') }}{{ $t('account.earnings') }}</div>
                    <div>{{ fromWei(expectIncome) }} {{ Config.chainName }}</div>
                </div>
                <div class="text-primary  text-right text-sm" v-show="$store.state.isLastBuyer">
                    Pot*0.7 + expect Income
                </div>
                <div class="flex justify-between items-center text-text">
                    <div>{{ $t('account.withdrawn') }}{{ $t('account.earnings') }}</div>
                    <div>{{ fromWei(accountInfo.withd) }} {{ Config.chainName }}</div>
                </div>
                <div class="flex justify-between items-center text-text mb-2">
                    <div>{{ $t('account.withdrawable') }}{{ $t('account.earnings') }}</div>
                    <div>{{ fromWei(canWithdrawalsBalance) }} {{ Config.chainName }}</div>
                </div>
                <div class="text-text bg-primary text-center py-2 w-full rounded-full" @click="handleWithdrawal">
                    {{ $t('account.withdrawals') }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { addressFilter } from '@/utils/format'
import { config } from '../const/config'
import { Toast } from 'vant'

export default {
    components: { [Toast.name]: Toast },
    data() {
        return {
            accountInfo: {},
            canWithdrawalsBalance: '',
            expectIncome: '0',
        }
    },
    mounted() {
        if (this.$store.state.chainId !== this.Config.chainId) {
            return
        }

        this.getAccountInfo()
        setInterval(() => {
            this.getAccountInfo()
            console.log('is lastBuyer', this.$store.state.isLastBuyer)
        }, 2000);
    },
    methods: {
        addressFilter,
        fromWei(value) {
            if (value === '0' || value === null) {
                // console.log('值为0', value)
                return "0.0000"
            } else {
                // console.error('值不为0', value)
                return this.Web3.utils.fromWei(value, 'ether')
            }
        },
        handleWithdrawal() {
            if (this.canWithdrawalsBalance === '0') {
                Toast.fail(this.$t('word.noBalance'));
                return
            }
            this.$emit('handleWithdrawal')
        },
        getWalletBalance(address) {
            this.Web3.eth.getBalance(address).then((res) => {
                let walletInfo = {
                    address: address,
                    balance: this.fromWei(res)
                }
                localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
                localStorage.setItem('connectStatus', 'connect')
                this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
                // console.log('store', this.$store.state.walletInfo)
            }).catch(err => {
                console.log('getbalance err', err)
            })
        },
        getAccountInfo() {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.Infos2(window.ethereum.selectedAddress).call().then((result) => {
                this.accountInfo = result

                // console.log(this.accountInfo)
            })
            web3Contract.methods.balanceOf(window.ethereum.selectedAddress).call().then((result) => {
                // console.log(((Number(this.$store.state.pot)) * 0.7 + Number(result)).toString())
                // console.log('pot', ((Number(this.$store.state.pot)) * 0.7 + Number(result)).toString())
                this.canWithdrawalsBalance = result

            })
            web3Contract.methods.expectIncome(window.ethereum.selectedAddress).call().then((result) => {
                // console.log(((Number(this.$store.state.pot)) * 0.7 + Number(result)).toString())
                // console.log('pot', ((Number(this.$store.state.pot)) * 0.7 + Number(result)).toString())
                if (this.$store.state.isLastBuyer) {
                    this.expectIncome = (((Number(this.$store.state.pot)) * 0.7 + Number(result))).toString()
                } else {
                    this.expectIncome = result
                }

                console.log('expectIncome', (Number(this.$store.state.pot)) * 0.7, result)

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
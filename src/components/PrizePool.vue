<template>
    <div>
        <div class="py-3 sm:flex sm:justify-between">
            <div class='w-11/12 ml-auto mr-auto text-text'>
                <div class=''>
                    {{ $t('round.roundNumber') }} #{{ currentRound }}
                </div>
                <div class='text-xl font-medium sm:font-bold sm:text-3xl'>
                    {{ $t('round.drain') }}
                </div>
                <div class='mb-1 text-4xl text-primary font-bold'>
                    {{ countTime }}
                </div>
                <!-- <div class='w-full h-0.5 bg-barWhite mb-2'>
                    <div class='bg-primary py-px' :style="{ width: barWidth }"></div>
                </div> -->
                <div class="sm:mt-2">
                    <div class='flex justify-between text-text mb-2 sm:mb-2'>
                        <div class='text-sm sm:text-lg'>
                            {{ $t('round.lastBuyer') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            <div class='text-sm flex justify-start items-center sm:text-lg'>
                                <div class="hidden sm:block">
                                    {{ lastBuyer }}
                                </div>
                                <div class="sm:hidden">
                                    {{ addressFilter(lastBuyer) }}
                                </div>
                                <div class="border cursor-pointer border-text rounded-2xl px-2 text-sm text-text ml-2"
                                    @click="copyContent(lastBuyer)">
                                    {{ $t('word.copy') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='flex justify-between text-text mb-2 sm:mb-2'>
                        <div class='text-sm sm:text-lg'>
                            {{ $t('round.pot') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            {{ pot }} {{ ' ' + Config.chainName }}
                        </div>
                    </div>
                    <div class='flex justify-between text-text mb-2 sm:mb-2'>
                        <div class='text-sm sm:text-lg'>
                            {{ $t('account.epicycle') }}{{ $t('round.totalKeySold') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            {{ roundInfo.totalKeysSold }}
                        </div>
                    </div>
                    <div class='flex justify-between text-text mb-2 sm:mb-2'>
                        <div class='text-sm sm:text-lg'>
                            {{ $t('account.history') }}{{ $t('round.totalKeySold') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            {{ roundInfo.totalKeysSold_s }}
                        </div>
                    </div>
                    <div class='flex justify-between text-text mb-2 sm:mb-2'>
                        <div class='text-sm sm:text-lg'>
                            {{ $t('account.epicycle') }}{{ $t('round.totalAmount') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            {{ fromWei(roundInfo.totalHAH) }}{{ ' ' + Config.chainName }}
                        </div>
                    </div>
                    <div class='flex justify-between text-text mb-2 sm:mb-2'>
                        <div class='text-sm sm:text-lg'>
                            {{ $t('account.history') }}{{ $t('round.totalAmount') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            {{ fromWei(roundInfo.totalHAH_s) }} {{ ' ' + Config.chainName }}
                        </div>
                    </div>
                    <div class='flex justify-between text-text mb-2 sm:mb-2'>
                        <div class='text-sm sm:text-lg'>
                            {{ $t('round.roundCount') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            {{ roundCount }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from '../const/config'
import { addressFilter } from '@/utils/format'
import { Toast } from 'vant'
import CountTo from 'vue-count-to'



export default {
    components: {
        CountTo
    },
    data() {
        return {
            currentRound: '-',
            timer: null,
            barLongPoint: 0,
            countTime: '-',
            nowTimeStamp: null,
            lastBuyer: '',
            pot: '',
            totalKeysSold: '',
            roundCount: '',
            roundInfo: {},
            timeStamp: ''
        }
    },

    computed: {
        barWidth() {
            return this.barLongPoint + '%'
        }
    },

    mounted() {
        if (this.$store.state.chainId !== this.Config.chainId) {
            return
        }
        this.getInfo()
        this.getTime()
        setInterval(() => {
            this.getInfo()
            this.getTime()
        }, 2000);
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {

        addressFilter,
        fromWei(value) {
            if (value === '0' || value === null) {
                // console.log('值为0')
                return "0.0000"
            } else {
                // return this.Web3.utils.fromWei(value, 'ether')
                let number = Number(this.Web3.utils.fromWei(value, 'ether'))
                return number.toFixed(5)
            }

            // return value

        },
        copyContent(content) {
            if (!content) return
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
        countDown(endTimeStamp, nowTimeStamp) {
            var time = {}
            if (endTimeStamp > nowTimeStamp) {
                var mss = endTimeStamp - nowTimeStamp
                var days = Math.floor(mss / (1000 * 60 * 60 * 24))
                var hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                var minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
                var seconds = Math.floor((mss % (1000 * 60)) / 1000)
                time = {
                    day: days < 10 ? '0' + days : days,
                    hour: hours < 10 ? '0' + hours : hours,
                    minute: minutes < 10 ? '0' + minutes : minutes,
                    second: seconds < 10 ? '0' + seconds : seconds,
                    mss: mss
                }
                this.countTime = time.hour + ' : ' + time.minute + ' : ' + time.second
            } else {
                time = {
                    day: '00',
                    hour: '00',
                    minute: '00',
                    second: '00',
                    mss: '00'
                }
                clearInterval(this.timer)
            }
        },
        getInfo() {
            // console.log
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)

            web3Contract.methods.lastBuyer().call().then((result) => {
                this.lastBuyer = result
                // console.log(result === window.ethereum.selectedAddress, result.toLowerCase(), window.ethereum.selectedAddress)
                if (result.toLowerCase() === window.ethereum.selectedAddress) {
                    this.$store.commit('isLastBuyer', true)
                } else {
                    this.$store.commit('isLastBuyer', false)
                }
            })
            web3Contract.methods.rounds().call().then((result) => {
                // console.log('回合信息', result)
                this.roundInfo = result
            })
            web3Contract.methods.pot().call().then((result) => {
                this.$store.commit('setPot', result)
                this.pot = this.fromWei(result)
                // console.log('pot', this.pot)
            })
            web3Contract.methods.roundCount().call().then((result) => {
                this.roundCount = result
                this.currentRound = parseInt(result) + 1
            })
        },
        getTime() {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.lastBuyTimestamp().call().then((result) => {
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.countDown(parseInt(result) * 1000, new Date().getTime())
                }, 1000)
            })
        }
    }
}
</script>

<style scoped></style>

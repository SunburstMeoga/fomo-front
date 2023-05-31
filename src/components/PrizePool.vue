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
                <div class='mb-1 sm:text-xl'>
                    {{ countTime }}
                </div>
                <div class='w-full h-0.5 bg-barWhite mb-2'>
                    <div class='bg-primary py-px' :style="{ width: barWidth }"></div>
                </div>
                <div class="sm:mt-10">
                    <div class='flex justify-between text-text mb-2 sm:mb-2' v-for='(item, index) in roundList'
                        :key='index'>
                        <div class='text-sm sm:text-lg'>
                            {{ item.title }}
                        </div>
                        <div class='flex flex-col items-end'>
                            <div class='text-sm flex justify-start items-center sm:text-lg'>
                                <div v-if="index !== 0">
                                    {{ item.content }}
                                </div>
                                <div v-else>
                                    <span class="sm:hidden">{{ item.mobileAddress }}</span>
                                    <span class="hidden sm:block">{{ item.pcAddress }}</span>
                                </div>
                                <div v-if="index === 0"
                                    class="border cursor-pointer border-text rounded-2xl px-2 text-sm text-text ml-2"
                                    @click="copyContent(item.content)">
                                    {{ $t('word.copy') }}
                                </div>
                            </div>
                            <!-- <div class='text-xs sm:text-sm'>
                                {{ item.amount }}
                            </div> -->

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


export default {
    data() {
        return {
            currentRound: '-',
            timer: null,
            barLongPoint: 0,
            countTime: '-'
        }
    },
    computed: {
        roundList() {
            return [
                {
                    title: this.$t('round.lastBuyer'),
                    pcAddress: '-',
                    mobileAddress: '-',
                    amount: '0 USD'
                },
                {
                    title: this.$t('round.pot'),
                    content: '0.00 Keys',
                    amount: 'Total 0 Keys'
                },
                {
                    title: this.$t('round.totalKeySold'),
                    content: '0.0000 HAH',
                    amount: '0 USD'
                },
                {
                    title: this.$t('round.roundCount'),
                    content: '0.0000 HAH',
                    amount: '0 USD'
                }
            ]
        },
        barWidth() {
            return this.barLongPoint + '%'
        }
    },
    created() {
        this.$bus.$on('buySuccess', () => {
            console.log('我是奖池组件，key已经购买成功了')
            this.getInfo()
        })
    },
    mounted() {
        this.getInfo()

    },
    beforeDestroy() {
        clearInterval(this.timer)
    },

    methods: {
        addressFilter,
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
        countDown(endTimeStamp) {
            var nowTimeStamp = new Date().getTime()
            console.log('nowTimeStamp', nowTimeStamp)
            console.log('endTimeStamp', endTimeStamp)

            var time = {}
            if (endTimeStamp > nowTimeStamp) {
                var mss = endTimeStamp - nowTimeStamp
                var days = parseInt(mss / (1000 * 60 * 60 * 24))
                var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
                var seconds = parseInt((mss % (1000 * 60)) / 1000)
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
                this.countTime = this.$t('round.loading')
                this.countTime = time.hour + ' : ' + time.minute + ' : ' + time.second

            }
            this.barLongPoint = (((time.hour * 60 * 60 + minutes * 60 + seconds) / 86400).toFixed(4)) * 100
        },
        getInfo() {
            // console.log(new this.Web3.eth.Contract(config.erc20_abi, config.con_addr))
            // return
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.lastBuyer().call().then((result) => {
                console.log('lastBuyer:', result)
                this.roundList[0].mobileAddress = this.addressFilter(result)
                this.roundList[0].pcAddress = result

            })
            web3Contract.methods.lastBuyTimestamp().call().then((result) => {
                console.log('lastBuyTimestamp:', result)
                this.timer = setInterval(() => {
                    this.countDown(parseInt(result) * 1000)
                }, 1000)
            })
            web3Contract.methods.pot().call().then((result) => {
                console.log('pot:', result)
                this.roundList[1].content = this.Web3.utils.fromWei(result, 'ether') + ' HAH'

            })
            web3Contract.methods.totalKeysSold().call().then((result) => {
                console.log('totalKeysSold:', result)
                this.roundList[2].content = result

            })
            web3Contract.methods.roundCount().call().then((result) => {
                console.log('roundCount:', result)
                this.roundList[3].content = result
                this.currentRound = parseInt(result) + 1
            })

        }
    }
}
</script>

<style scoped></style>

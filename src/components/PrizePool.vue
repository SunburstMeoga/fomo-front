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
                            {{ $t('round.totalKeySold') }}
                        </div>
                        <div class='flex flex-col items-end'>
                            {{ totalKeysSold }}
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


export default {
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
            websocket: null
        }
    },

    computed: {

        barWidth() {
            return this.barLongPoint + '%'
        }
    },
    created() {
        this.initWebSocket();
        this.$bus.$on('buySuccess', () => {
            console.log('$bus')

            this.nowTimeStamp = new Date().getTime()
            this.barLongPoint = 0
            clearInterval(this.timer)
            this.getInfo()
        })
    },
    mounted() {
        if (this.$store.state.chainId !== this.Config.chainId) {
            return
        }
        this.getInfo()
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    destroyed: function () {
        this.websocket.close();
    },
    methods: {
        initWebSocket() {
            let url = 'wss://app.dexduel.com/ws/'
            console.log(url);
            this.websocket = new WebSocket(url);
            this.websocket.onerror = this.websocketOnerror;
            this.websocket.onmessage = this.websocketOnmessage;
            this.websocket.onclose = this.websocketOnclose;
        },

        websocketOnerror(e) {
            console.log("WebSocket Connect Error", e);

            // this.reconnect();
        },
        websocketOnmessage(e) {
            console.log("-----Message-------", e);
            console.log('websocket data')
            this.getInfo()
        },
        websocketOnclose(e) {
            console.log("connection closed (" + e.code + ")");
        },
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
                // if (endTimeStamp > this.nowTimeStamp) {
                //     this.barLongPoint = parseInt((nowTimeStamp - this.nowTimeStamp) / (endTimeStamp - this.nowTimeStamp) * 100)
                // }
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
                this.barLongPoint = 0
            }
            // console.log(this.countTime)

        },
        getInfo() {
            // console.log(new this.Web3.eth.Contract(config.erc20_abi, config.con_addr))
            // return
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.lastBuyer().call().then((result) => {
                this.lastBuyer = result
            })

            web3Contract.methods.pot().call().then((result) => {
                this.pot = this.Web3.utils.fromWei(result, 'ether')
            })
            web3Contract.methods.totalKeysSold().call().then((result) => {
                console.log('totalKeysSold:', result)
                this.totalKeysSold = result
            })
            web3Contract.methods.roundCount().call().then((result) => {
                console.log('roundCount:', result)
                this.roundCount = result
                this.currentRound = parseInt(result) + 1
            })
            web3Contract.methods.lastBuyTimestamp().call().then((result) => {
                console.log('lastBuyTimestamp:', result)
                this.timer = setInterval(() => {
                    this.countDown(parseInt(result) * 1000)
                }, 1000)
            })
        }
    }
}
</script>

<style scoped></style>

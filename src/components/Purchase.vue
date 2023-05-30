<template>
    <div class="py-3">
        <!-- <div class="flex justify-around items-center flex-wrap px-2 sm:flex-no-wrap">
            <div class="w-5/12 mb-1 flex flex-col justify-center items-center sm:w-56" @click="clickTeam(index)"
                v-for="(item, index) in purchaseList" :key="index">
                <div class="w-9/12 rounded-full" :class="currentTeam === index ? 'item-clicked' : ''">
                    <img :src="item.image" class="w-full" />
                </div>
                <div class="text-base text-text" :class="currentTeam === index ? 'item-title-clicked' : ''">
                    {{ item.title }}
                </div>
            </div>
        </div> -->
        <div class="w-11/12 mr-auto ml-auto sm:flex  sm:rounded-full sm:h-12 sm:justify-between sm:px-10">
            <div class="flex justify-between items-center text-text sm:text-text sm:w-2/4 sm:justify-start">
                <div class="text-lg sm:mr-6">
                    Key
                </div>
                <div class="w-2/4 h-8 sm:mr-6">
                    <input type="number"
                        class="rounded-full border border-primary bg-cardBg text-center h-full w-full sm:text-text"
                        v-model="keyNumber" @change="keysChange($event)">
                </div>
                <div class="text-lg">
                    {{ numFilter(ethProportion) }} @HAH
                </div>
            </div>
            <div class="flex justify-between items-center py-4">
                <div class="w-full cursor-pointer text-lg border border-primary rounded-full text-center py-1 text-text sm:border-text sm:text-text sm:px-20"
                    @click="toSend()">
                    {{ $t('purchase.send') }}
                </div>
                <!-- <div
                    class="border-text text-lg border rounded-full px-6 py-1 text-text sm:border-text sm:text-text sm:ml-6">
                    Use Valut
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
// import { Loading } from 'element-ui'
import { config } from '../const/config'

export default {
    data() {
        return {
            // web3: new this.Web3(window.ethereum),
            purchaseList: [
                {
                    title: 'Snek',
                    image: require('../assets/snek.png'),
                    value: 2
                },
                {
                    title: 'Whale',
                    image: require('../assets/whale.png'),
                    value: 0
                },
                {
                    title: 'Bull',
                    image: require('../assets/bull.png'),
                    value: 3
                },
                {
                    title: 'Bear',
                    image: require('../assets/bear.png'),
                    value: 1
                }
            ],
            currentTeam: 0,
            keyNumber: 1,
            ethProportion: 0
        }
    },
    mounted() {
        this.getEthByKey(1)
    },
    methods: {

        //  保留四位小数
        numFilter(value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(4)
            return realVal
        },
        //  购买的keys发生变化
        keysChange(e) {
            const { value } = e.target
            console.log('检测到的变化' + value)
            this.getEthByKey(value)
        },
        getEthByKey(ethByValue) {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.calculateKeyPrice(ethByValue).call().then((result) => {
                console.log('当前一个key需要', result, '个wei')
                this.ethProportion = this.Web3.utils.fromWei(result, 'ether')
            })
        },
        clickTeam(index) {
            this.currentTeam = index
            console.log('current', index)
        },
        toSend() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })

            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            let data = web3Contract.methods.buyKeys(this.keyNumber, window.ethereum.selectedAddress,).encodeABI()
            // console.log('this.ethProportion', this.ethProportion)
            // return
            this.Web3.eth.sendTransaction({
                to: config.con_addr,
                from: window.ethereum.selectedAddress,
                data: data,
                value: this.Web3.utils.toWei(this.ethProportion, 'ether')
            })
                .on('confirmation', (confirmationNumber, receipt) => {
                    console.log(confirmationNumber, receipt)
                    this.$notify({
                        title: 'Success',
                        message: 'Successful bet',
                        type: 'success'
                    })
                    this.keyNumber = 1
                    this.getEthByKey(this.keyNumber)
                    loading.close()
                })
                .on('error', (error) => {
                    console.log(error)
                    loading.close()
                    this.$notify.error({
                        title: 'Error',
                        message: error.message
                    })
                })
        }
    }
}
</script>

<style scoped>
/*.item-title-clicked {
    color: #EF4444;
    font-weight: 800;
}

.item-clicked {
    background: #EF4444;
}*/
</style>

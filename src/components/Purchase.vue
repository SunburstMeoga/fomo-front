<template>
    <div class="pt-4">
        <div class="w-11/12 mr-auto ml-auto sm:flex sm:rounded-full sm:h-12 sm:justify-between sm:px-10">
            <div class="flex justify-between items-center text-text sm:text-text sm:w-2/4 sm:justify-start">
                <div class="text-lg sm:mr-6">
                    Key
                </div>
                <div class="w-2/4 h-8 sm:mr-6">
                    <input type="number"
                        class="rounded-full border border-primary bg-cardBg text-center h-full w-full sm:text-text"
                        v-model="keyNumber" @input="keysChange($event)">
                </div>
                <div class="text-lg">
                    {{ numFilter(ethProportion) }} @HAH
                </div>
            </div>
            <div class="flex justify-between items-center mt-4 pb-4">
                <div class="w-full cursor-pointer text-lg border border-primary rounded-full text-center py-1 text-text sm:border-text sm:text-text sm:px-20"
                    @click="toSend()">
                    {{ $t('purchase.send') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { Loading } from 'element-ui'
import { config } from '../const/config'
import { Toast } from 'vant'

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
            if (value) {
                console.log('检测到的变化' + value)
                this.getEthByKey(value)
            }
        },
        getEthByKey(ethByValue) {
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.calculateKeyPrice(ethByValue).call().then((result) => {
                console.log('当前一个key需要', result, '个wei')
                this.ethProportion = this.Web3.utils.fromWei(result, 'ether')
                Toast.clear()
            })
        },
        clickTeam(index) {
            this.currentTeam = index
            console.log('current', index)
        },
        toSend() {
            Toast.loading({
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            let data = web3Contract.methods.buyKeys(this.keyNumber, window.ethereum.selectedAddress,).encodeABI()
            web3Contract.methods.calculateKeyPrice(this.keyNumber).call().then((result) => {
                // web3Contract.methods.buyKeys(this.keyNumber, window.ethereum.selectedAddress,).send({ from: window.ethereum.selectedAddress, value: result })
                //     .on('confirmation', (confirmationNumber, receipt) => {
                //         Toast.clear()
                //         console.log(confirmationNumber, receipt)
                //         console.log('成功')
                //     })
                //     .on('error', console.error);
                this.Web3.eth.sendTransaction({
                    to: config.con_addr,
                    from: window.ethereum.selectedAddress,
                    data: data,
                    value: result
                })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        if (confirmationNumber === 0) {
                            this.$bus.$emit('buySuccess')
                            this.keyNumber = 1
                            this.getEthByKey(this.keyNumber)
                            Toast.success(this.$t('word.success'))

                            return
                        }



                    })
                    .on('error', (error) => {
                        console.log(error)
                        Toast.fail(this.$t('word.fail'))
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

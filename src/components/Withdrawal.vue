<template>
    <div>
        <van-popup position="bottom" :style="{ height: '10%' }" v-model="showWithdrawal">
            <div class="px-2 py-2">
                <div>
                    {{ $t('account.withdrawable') }}{{ $t('word.amount') }}
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex-1">
                        <input class="w-full" v-model=" value " ref="inputId" pattern="\d*" type='tel' id='inputId'
                            :placeholder="$t('account.withdrawable') + '  ' + fromWei(canWithdrawalBalance) + ' ' + {{ Config.chainName }}" />
                    </div>
                    <div class="flex justify-end">
                        <div class="px-2 py-1 underline text-sm text-primary" @click=" allWithdrawal ">
                            {{ $t('word.all') }}
                        </div>
                        <div class="px-2 py-1 bg-primary rounded text-sm text-text ml-2" @click=" toWithdrawal ">
                            {{ $t('word.confirm') }}{{ $t('account.withdrawals') }}
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Popup, NumberKeyboard, Field, Toast } from 'vant'
import { config } from '../const/config'


export default {
    components: { [Popup.name]: Popup, [NumberKeyboard.name]: NumberKeyboard, [Field.name]: Field, [Toast.name]: Toast },
    data() {
        return {
            showWithdrawal: false,
            show: true,
            value: '',
            canWithdrawalBalance: ''
        }
    },
    mounted() {
        setInterval(() => {
            this.getBalance()
            console.log('is lastBuyer', this.$store.state.isLastBuyer)
        }, 2000);
    },
    methods: {
        clearNoNum(value) {
            value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
            value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
            if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                value = parseFloat(value);
            }
            if (!value || value == '0' || value == '0.0' || value == '0.00') {
                alert('退款金额不能为空');
                return;
            }
            //  正常得话继续调后端接口
        },
        fromWei(value) {
            return this.Web3.utils.fromWei(value, 'ether')
        },
        allWithdrawal() {
            this.value = this.fromWei(this.canWithdrawalBalance)
        },
        getBalance() {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.balanceOf(window.ethereum.selectedAddress).call().then((result) => {
                this.canWithdrawalBalance = result
                // console.log('弹窗的提现:', result)
            })
        },
        toWithdrawal() {
            Toast.loading({
                message: this.$t('round.loading'),
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            let withdrawalAmount = this.Web3.utils.toWei(this.value, 'ether')
            web3Contract.methods.withdrawal(withdrawalAmount)
                .send({ from: window.ethereum.selectedAddress })
                .on('transationHash', (hash) => {
                    // console.log('hash', hash)
                })
                .on('receipt', (receipt) => {
                    // console.log('receipt', receipt)
                })
                .then((res) => {
                    console.log('res', res)
                    Toast.clear()
                })
                .catch(err => {
                    console.log('err', err)
                    Toast.clear()

                    //   this.isLoading = false

                })
            // web3Contract.methods.withdrawal(withdrawalAmount).call().then((result) => {
            //     this.showWithdrawal = false
            //     Toast.success(this.$t('word.success'));
            //     console.log('result', result)
            // }).catch((err) => {
            //     Toast.fail(err);
            // })
        },
        onInput(value) {
            console.log(value)
            this.value = this.clearNoNum(value)
        },
        onDelete() {
            console.log('删除');
        },

    },
}
</script>

<style>
.van-key--blue {
    background: #DA251D;
}
</style>
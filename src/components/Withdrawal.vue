<template>
    <div>
        <van-popup position="bottom" :style="{ height: '10%' }" v-model="showWithdrawal">
            <div class="px-2 py-2">
                <div>
                    提现金额
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex-1">
                        <input class="w-full" v-model="value" ref="inputId" pattern="\d*" type='tel' id='inputId'
                            :placeholder="'本次最多可提现 ' + canWithdrawalBalance + ' HAH'" />
                    </div>
                    <div class="flex justify-end">
                        <div class="px-2 py-1 underline text-sm text-primary">
                            全部
                        </div>
                        <div class="px-2 py-1 bg-primary rounded text-sm text-text ml-2" @click="toWithdrawal">
                            确认提现
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
        this.getBalance()
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
        getBalance() {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.balanceOf(window.ethereum.selectedAddress).call().then((result) => {
                this.canWithdrawalBalance = result
                console.log('canWithdrawalBalance:', result)
            })
        },
        toWithdrawal() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)

            web3Contract.methods.withdrawal(BigInt(325234523453453452345234523452345345)).call().then((result) => {
                this.canWithdrawalsBalance = result

                console.log('canWithdrawalsBalance:', result)
                Toast.success('成功');
            }).catch((err) => {
                Toast.fail(err);
            })
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
<template>
    <div class="rounded-lg border border-primary">
        <div class="bg-moduleBg rounded-lg text-text pb-2">
            <div class="rounded-t-lg py-3 text-lg font-bold bg-primary text-center">Rules of the game</div>
            <div class="h-52 overflow-x-auto py-2 px-4 text-xs mb-2" style="height: 400px;">
                <p>
                    1、玩家通过购买KEY，向该游戏的合约地址发送一定量的HAH，同时玩家会收到当前汇率下一定数量的Key（每把key的价值则根据购买次数进行上涨，玩家可一次性购买多把key，但价格只会涨幅一次）。
                </p>
                <br>
                <p>
                    2、玩家发送的HAH中，50%的价值会进入总奖池，作为最终奖励发放，剩余的50%中，20%会作为key的奖励发放至之前购买key的用户手里，5%将作为宣传奖励发放给上级推荐人，平台则抽取10%用于游戏的宣传与维护，剩余15%将会进去空投池，每个玩家购买的时候都将会有一定概率获得空投池50%的奖励。
                </p>
                <br>

                <table width="100%" align="center" style="border: 1px #ffffff solid">
                    <tbody>
                        <tr>
                            <td style="border: 1px #ffffff solid" class="text-center">奖池</td>
                            <td style="border: 1px #ffffff solid" class="text-center">Key持有者</td>
                            <td style="border: 1px #ffffff solid" class="text-center">上级</td>
                            <td style="border: 1px #ffffff solid" class="text-center">平台</td>
                            <td style="border: 1px #ffffff solid" class="text-center">空投池</td>
                        </tr>
                        <tr>
                            <td style="border: 1px #ffffff solid" class="text-center">50%</td>
                            <td style="border: 1px #ffffff solid" class="text-center">20%</td>
                            <td style="border: 1px #ffffff solid" class="text-center">5%</td>
                            <td style="border: 1px #ffffff solid" class="text-center">10%</td>
                            <td style="border: 1px #ffffff solid" class="text-center">15%</td>
                        </tr>
                    </tbody>
                </table>
                <br>

                <p>
                    3、每一把key在购买后，游戏时间将会增加30秒，游戏时间上限为24小时。胜利者能获得最终奖励。
                </p>
                <br>
                <p>
                    4、在游戏时间结束后，最后一次购买钥匙的玩家将会赢取总奖池奖励。其中70%将会直接发放至赢家账户，平台抽取10%作为手续费，剩余20%则会进入下一轮游戏的总奖池中。
                </p>
                <br>
                <table width="100%" align="center" style="border: 1px #ffffff solid">
                    <tbody>
                        <tr>
                            <td style="border: 1px #ffffff solid" class="text-center">胜利者</td>
                            <td style="border: 1px #ffffff solid" class="text-center">下一轮</td>
                            <td style="border: 1px #ffffff solid" class="text-center">平台</td>
                        </tr>
                        <tr>
                            <td style="border: 1px #ffffff solid" class="text-center">70%</td>
                            <td style="border: 1px #ffffff solid" class="text-center">20%</td>
                            <td style="border: 1px #ffffff solid" class="text-center">10%</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="text-primary mr-auto ml-auto flex justify-center items-center py-2">
                <div>
                    <van-checkbox v-model="noPrompts" class="text-sm text-primary" icon-size="18px" checked-color="#DA251D"
                        @change="clickTips" />
                </div>
                <div class="text-sm pl-2">不再提示</div>
            </div>
            <!-- <div class="flex justify-center items-center">
                <div class="border border-primary text-sm text-primary rounded-full px-3 py-1" @click="closeRule">
                    知道了
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { Checkbox } from 'vant'
export default {
    components: { [Checkbox.name]: Checkbox },
    data() {
        return {
            show: true,
            noPrompts: false
        }
    },
    mounted() {
        // this.init()
        if (localStorage.getItem('noPrompts') && localStorage.getItem('noPrompts') === '1') {
            this.noPrompts = true
        }
    },
    methods: {
        clickTips(noPrompts) {
            console.log(noPrompts)
            if (noPrompts) {
                localStorage.setItem('noPrompts', '1')
            } else {
                localStorage.removeItem('noPrompts')
            }
        },
        closeRule() {
            this.$emit('closeRule')
        }
    }
}
</script>

<style>
.rule-content {
    height: 99%;
}

.table>tbody>tr>td {
    vertical-align: middle;
}
</style>
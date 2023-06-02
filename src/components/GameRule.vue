<template>
    <div class="rounded-lg border border-primary">
        <div class="bg-moduleBg rounded-lg text-text pb-2">
            <div class="rounded-t-lg py-3 text-lg font-bold bg-primary text-center">{{ $t('rules.title') }}</div>
            <div class="h-52 overflow-x-auto py-2 px-4 text-xs mb-2" style="height: 400px;">
                <p>
                    {{ $t('rules.purchaseRuleOne', { chainName: Config.chainName }) }}
                </p>
                <br>
                <p>
                    {{ $t('rules.purchaseRuleTwo', { chainName: Config.chainName }) }}
                </p>

                <table width="100%" align="center" style="border: 1px #ffffff solid">
                    <tbody>
                        <tr>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitlePot') }}</td>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitleOwner') }}</td>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitlePre') }}</td>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitlePlatform') }}
                            </td>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitleAir') }}</td>
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
                    {{ $t('rules.purchaseRuleThree') }}
                </p>
                <br>
                <p>
                    {{ $t('rules.purchaseRuleFour') }}
                </p>
                <table width="100%" align="center" style="border: 1px #ffffff solid">
                    <tbody>
                        <tr>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitleWinner') }}
                            </td>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitleNextRound') }}
                            </td>
                            <td style="border: 1px #ffffff solid" class="text-center">{{ $t('rules.tableTitlePlatform') }}
                            </td>
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
                <div class="text-sm pl-2">{{ $t('rules.noPrompts') }}</div>
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
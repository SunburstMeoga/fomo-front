<template>
    <div class="py-3 px-3">
        <div class="w-11/12 text-text">
            <div>推荐地址：</div>
            <div class="break-words text-xs">0x5962974eeb0b17b43EDaBFc9b747839317AA852F</div>
            <div class="flex justify-start items-baseline">该地址已推荐
                <span class="number">
                    <count-to :start-val="0" :end-val="referralsNumber" :duration="5000" />
                </span>
                人，共收益
                <span class="number">
                    <count-to :start-val="0" :end-val="referralsNumber * 0.05" :duration="5000" />
                </span> HAH
            </div>

        </div>
    </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
    components: {
        CountTo
    },
    data() {
        return {
            referralsNumber: 100.22,
            referralsEarnings: 0
        }
    },
}
</script>

<style scoped>
.number {
    @apply px-1 font-bold text-primary text-2xl flex items-baseline
}
</style>
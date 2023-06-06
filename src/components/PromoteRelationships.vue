<template>
    <div class="py-3 px-3">
        <div class="w-11/12 text-text">
            <div>推荐地址：</div>
            <div class="break-words text-xs">0x5962974eeb0b17b43EDaBFc9b747839317AA852F</div>
            <div class="flex justify-start items-baseline">该地址已推荐 <span class="number"> {{ referralsEarnings }} </span>
                人，共收益
                <span class="number"> {{ referralsNumber }} </span> HAH
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            referralsNumber: 0,
            referralsEarnings: 0
        }
    },
}
</script>

<style scoped>
.number {
    @apply px-1 font-bold text-primary text-2xl
}
</style>
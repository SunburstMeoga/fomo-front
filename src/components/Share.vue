<template>
    <div class="">
        <div class="rounded text-text bg-primary text-center py-2 w-full" @click="showShare = true">
            分享
        </div>
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
    </div>
</template>

<script>
import { ShareSheet, Toast } from 'vant';

export default {
    components: { [ShareSheet.name]: ShareSheet, [Toast.name]: Toast },
    data() {
        return {
            showShare: false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
            ],
        };
    },
    methods: {
        onSelect(option) {
            Toast(option.name);
            this.showShare = false;
        },
    },
}
</script>

<style></style>
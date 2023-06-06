<template>
    <div class="">
        <div class="rounded text-text bg-primary text-center py-2 w-full" @click="showShare = true">
            分享
        </div>
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />

        <van-popup v-model="show">
            <vue-qr :logoSrc="imageUrl" text="https://www.baidu.com" :size="200"></vue-qr>
        </van-popup>
    </div>
</template>

<script>
import { ShareSheet, Toast, Popup } from 'vant';
import vueQr from 'vue-qr'

export default {
    components: { [ShareSheet.name]: ShareSheet, [Toast.name]: Toast, [Popup.name]: Popup, vueQr, },
    data() {
        return {
            showShare: false,
            show: false,
            imageUrl: require("../assets/pglogo@60.png"),
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
            console.log(option)
            Toast(option.name);
            if (option.name === '二维码') {
                this.show = true;
            }
            this.showShare = false;
        },
    }
}
</script>

<style></style>
<template>
    <div class="">
        <div class="rounded text-text bg-primary text-center py-2 w-full" @click="showShare = true">
            分享
        </div>
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />

        <van-popup v-model="show">
            <div class="flex flex-col items-center pb-3">
                <vue-qr ref="qrData" :logoSrc="imageUrl" text="https://www.baidu.com" :size="200" class="mb-1"></vue-qr>
                <div class="py-1 px-2 bg-primary text-text rounded" @click="downQr">
                    保存到本地相册
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { ShareSheet, Toast, Popup } from 'vant';
import { toTelegram, toQQ, toWhatsApp, toWechat } from '@/utils/share.js'
import vueQr from 'vue-qr'

export default {
    components: { [ShareSheet.name]: ShareSheet, [Toast.name]: Toast, [Popup.name]: Popup, vueQr, },
    data() {
        return {
            showShare: false,
            show: false,
            imageUrl: require("../assets/pglogo@60.png"),
            options: [
                [
                    { name: 'Telegram', icon: 'https://img2.baidu.com/it/u=1365112930,1544002754&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', type: 1 },
                    { name: 'WhatsApp', icon: 'https://img0.baidu.com/it/u=1421846083,3598758220&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300', type: 2 },
                    { name: 'WeChat', icon: 'wechat', type: 3 },
                    { name: 'QQ', icon: 'qq', type: 4 },
                ],

                [{ name: 'QRCode', icon: 'qrcode', type: 5 },
                { name: 'Copy Link', icon: 'link', type: 6 },]

            ],
            shareUrl: 'https://www.baidu.com',
            shareTitle: '分享链接'
        };
    },
    methods: {
        toTelegram, toQQ, toWhatsApp, toWechat,
        downQr() {
            let name = 'PGChain推广链接';
            let a = document.createElement("a");
            a.style.display = "none";
            a.download = name;
            a.href = this.$refs.qrData.imgUrl;
            console.log(this.$refs)
            document.body.appendChild(a);
            a.click();
        },
        onSelect(option) {
            console.log(option)
            // Toast(option.name);
            switch (option.type) {
                case 1: this.toTelegram(this.shareUrl, this.shareTitle)
                    break;
                case 2: this.toWhatsApp(this.shareUrl, this.shareTitle)
                    break;

                case 3: this.toWechat(this.shareUrl, this.shareTitle)
                    break;

                case 4: this.toQQ(this.shareUrl, this.shareTitle)
                    break;

                case 5: this.show = true;
                    break;

                case 6: this.copyContent()
            }

            this.showShare = false;
        },
        copyContent(content) {
            if (!content) return
            console.log(content)
            navigator.clipboard.writeText(content).then(() => {
                this.$notify({
                    title: this.$t('word.success'),
                    message: this.$t('word.copySuccess'),
                    type: 'success'
                })
            }, () => {
                this.$message.error(this.$t('message.fail'));
                this.$notify.error({
                    title: 'Error',
                    message: error.message
                })
            });
        },
    }
}
</script>

<style></style>
<template>
    <div>
        <van-notice-bar left-icon="volume-o" :scrollable="false">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                <van-swipe-item>内容 1</van-swipe-item>
                <van-swipe-item>内容 2</van-swipe-item>
                <van-swipe-item>内容 3</van-swipe-item>
            </van-swipe>
        </van-notice-bar>
    </div>
</template>

<script>
import { NoticeBar, SwipeItem } from 'vant';
export default {
    components: { [NoticeBar.name]: NoticeBar, [SwipeItem.name]: SwipeItem }
}
</script>

<style scoped>
.notice-swipe {
    height: 40px;
    line-height: 40px;
}
</style>
<style>
.van-notice-bar {
    color: #DA251D;
    background-color: #000;
}
</style>
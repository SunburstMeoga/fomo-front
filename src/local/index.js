import VueI18n from 'vue-i18n'
import Vue from 'vue'
import en from './modules/en-us'
import zhcn from './modules/zh-cn'
import zhhk from './modules/zh-hk'
import jajp from './modules/ja-jp'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en-us', // language flag
    messages: {
        'zh-hk': zhhk,
        'zh-cn': zhcn,
        'en-us': en,
        'ja-jp': jajp
    }
})

export default i18n
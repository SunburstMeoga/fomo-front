import Vue from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css"
import router from './router'
import Web3 from 'web3'
import { config } from './const/config'
import store from './store'
import '@/assets/css/tailwind.css'
import '@/assets/css/iconfont.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import i18n from './local'

Vue.use(Vant)

Vue.prototype.Web3 = new Web3(window.ethereum)
Vue.prototype.Config = config
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')

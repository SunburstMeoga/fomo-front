<template>
  <div id="app">
    <div ref="vantaRef" v-if="!showContent" style="width:100%;height:100vh;position:fixed;z-index: -1;"></div>
    <div v-if="!showContent" class="my_title font-bold text-5xl sm:text-6xl text-primary">Welcome to the PGChain</div>
    <router-view v-if="showContent" />
  </div>
</template>
<script>
import * as THREE from 'three'
import Globe from 'vanta/src/vanta.globe'
import { Dialog } from 'vant'

export default {
  name: 'App',
  components: { [Dialog.name]: Dialog },

  data() {
    return {
      showContent: false,
      timer: null
    }
  },
  created() {
    console.log(this.$route.query)
    if (this.$route.query.referrer) {
      console.log(this.$route.query.referrer)
      localStorage.setItem('referrer', this.$route.query.referrer)
    }
    this.getChainId()
    if (localStorage.getItem('locale')) {
      this.$i18n.locale = localStorage.getItem('locale')
    }
  },
  mounted() {
    this.vantaEffect = Globe({
      el: this.$refs.vantaRef,
      THREE: THREE,
      color: '#DA251D',
      backgroundColor: '#000000',
      mouseControls: true,
      touchControls: true,
      scale: 1.00,
      scaleMobile: 1.00,
    })
    this.timer = setTimeout(() => {
      this.showContent = true
    }, 2000)
    if (localStorage.getItem('connectStatus') && localStorage.getItem('connectStatus') === 'connect') {
      this.initWallet()
    }
    this.accountHasChanged()
    this.networkHasChanged()

  },
  beforeDestroy() {
    clearTimeout(this.timer)
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },
  methods: {
    async accountHasChanged() {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length !== 0) {
          this.getWalletBalance(accounts[0])
          console.log('isConnected', this.Web3.currentProvider._state.isConnected)
        }
      })
    },
    async initWallet() {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.getWalletBalance(accounts[0])
        console.log('initWallet')
      } catch (error) {
        console.error(error)
      }
    },
    async getChainId() {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId"
        });
        console.log('当前链id', chainId)
        this.$store.commit('getChainId', chainId)
        if (chainId !== this.Config.chainId) {
          Dialog.alert({
            title: this.$t('dialog.checkNetwork'),
            message: this.$t('dialog.checkMessage', { chainName: this.Config.chainName }),
            confirmButtonText: this.$t('dialog.confirmButtonText'),
          }).then(() => {
            this.switchNetwork()
          });
        }
        this.switchNetwork()
      } catch (err) {
        console.error(err);
      }
    },
    async switchNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.Config.chainId }],
        })
      } catch (err) {
        console.error(err)
        if (err.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: this.Config.chainId,
                  chainName: 'PGChain',
                  rpcUrls: [this.Config.rpc],
                  iconUrls: ['https://testnet.hashahead.org/logo.png'],
                  blockExplorerUrls: ['https://testnet.hashahead.org/'],
                  nativeCurrency: {
                    name: this.Config.chainName,
                    symbol: this.Config.chainName,
                    decimals: 18
                  }
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }
        }
      }
    },
    async networkHasChanged() {
      window.ethereum.on('chainChanged', (chainChanged) => {
        console.log('当前链id', chainChanged)
        this.$store.commit('getChainId', chainChanged)

        if (chainChanged !== this.Config.chainId) {
          Dialog.alert({
            title: this.$t('dialog.checkNetwork'),
            message: this.$t('dialog.checkMessage', { chainName: this.Config.chainName }),
            confirmButtonText: this.$t('dialog.confirmButtonText'),
          }).then(() => {
            this.switchNetwork()
          });
          // this.switchNetwork()

        }
      })
    },

    getWalletBalance(address) {
      this.Web3.eth.getBalance(address).then((res) => {
        let walletInfo = {
          address: address,
          balance: this.Web3.utils.fromWei(res, 'ether')
        }

        localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
        localStorage.setItem('connectStatus', 'connect')
        this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
        console.log('store', this.$store.state.walletInfo)
      }).catch(err => {
        console.log('getbalance err', err)
      })
    },
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.my_title {
  z-index: 999;
  position: fixed;
  top: 40%;
  left: 8%;
  color: #fff;
}

body {
  font-family: '"Comfortaa", Arial, "Helvetica Neue", Helvetica, serif, sans-serif';
}
</style>

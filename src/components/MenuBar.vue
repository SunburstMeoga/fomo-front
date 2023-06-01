<template>
    <div class="w-full h-14 bg-current py-1 bg-opacity-50 flex justify-center items-center bg-teamBg sm:h-20">
        <div class="flex justify-between items-center w-11/12">
            <div class="text-4xl text-primary font-bold">
                Fomo3D
            </div>

            <div class="flex justify-end items-center text-text">
                <div
                    class="rounded-sm bg-primary border-primary border px-2 py-1 hover:text-primary hover:border-primary hover:border hover:bg-moduleBg cursor-pointer">
                    <div class="icon iconfont icon-guizeguanli" @click="showRule" />
                </div>

                <van-popover @select="onConfirm" v-model="showPicker" theme="dark" trigger="click" :actions="columns">
                    <template #reference>
                        <div
                            class="rounded-sm bg-primary border-primary border px-2 py-1 ml-2 sm:ml-6 hover:text-primary hover:border-primary hover:border hover:bg-moduleBg cursor-pointer">
                            <div class="icon iconfont icon-message-language" />
                        </div>
                    </template>
                </van-popover>

                <!-- <div
                    class="rounded-sm bg-primary border-primary border px-2 py-1 ml-2 sm:ml-6 hover:text-primary hover:border-primary hover:border hover:bg-moduleBg cursor-pointer">
                    <div class="icon iconfont icon-message-language" @click="showPicker = true" />
                </div> -->
                <div class="px-2 py-1 rounded-sm bg-primary border-primary border ml-2 sm:ml-6 hover:text-primary hover:border-primary hover:border hover:bg-moduleBg cursor-pointer"
                    @click="handleConnect()">
                    {{ $store.state.walletInfo.address && $store.state.chainId === Config.chainId ? $t('menubar.disconnect')
                        :
                        $t('menubar.connect') }}
                </div>
            </div>
        </div>
        <div>
            <van-popup v-model="show" class="w-9/12 rounded-lg">
                <div>
                    <game-rule />
                </div>
            </van-popup>
        </div>
        <!-- <div>
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :confirm-button-text="$t('word.confirm')" :cancel-button-text="$t('word.cancel')"
                    :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup>
        </div> -->
    </div>
</template>

<script>
import { Popup, Picker, Popover } from 'vant'
import GameRule from '../components/GameRule'
export default {
    components: { [Popup.name]: Popup, GameRule, [Picker.name]: Picker, [Popover.name]: Popover },
    data() {
        return {
            // web3: new this.Web3(window.ethereum),
            // columns: ['English', '简体中文', '繁體中文', '日本語'],
            columns: [{ text: 'English' }, { text: '简体中文' }, { text: '繁體中文' }, { text: '日本語' }],
            show: false,
            showPicker: false,

            currentAddress: 'Connect',
            // web3: new this.Web3(window.ethereum)

        }
    },
    mounted() {
        // this.init()
        if (localStorage.getItem('noPrompts') && localStorage.getItem('noPrompts') === '1') {
            this.show = false
        } else {
            this.show = true
        }
    },
    methods: {
        onConfirm(value, index) {
            console.log(`当前值：${value}, 当前索引：${index}`);
            switch (index) {
                case 0: this.$i18n.locale = 'en-us'
                    break
                case 1: this.$i18n.locale = 'zh-cn'
                    break
                case 2: this.$i18n.locale = 'zh-hk'
                    break
                case 3: this.$i18n.locale = 'ja-jp'
            }
            localStorage.setItem('locale', this.$i18n.locale)
            console.log(this.$i18n.locale)
            this.showPicker = false
        },

        showRule() {
            this.show = true
            console.log(this.show)
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
                                    chainName: 'Hash Ahead Testnet',
                                    rpcUrls: ['https://rpc-testnet.hashahead.org'],
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
        async login() {
            console.log('Login')
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                })
                this.getWalletBalance(accounts[0])
                localStorage.setItem('connectStatus', 'connect')
                this.getChainId()
                console.log('store', this.$store.state)
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
                console.log('store', this.$store.state)

                // if (chainId !== this.Config.chainId) {
                //   Dialog.alert({
                //     title: this.$t('dialog.checkNetwork'),
                //     message: this.$t('dialog.checkMessage'),
                //     confirmButtonText: this.$t('dialog.confirmButtonText'),
                //   }).then(() => {
                this.switchNetwork()
                //   });
                // }
            } catch (err) {
                console.error(err);
            }
        },
        getWalletBalance(address) {
            this.Web3.eth.getBalance(address).then((res) => {
                let walletInfo = {
                    address: address,
                    balance: this.Web3.utils.fromWei(res, 'ether')
                }
                // this.getNodeList()
                localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
                localStorage.setItem('connectStatus', 'connect')
                console.log(localStorage.getItem('walletInfo'))
                // this.isConnect = true
                this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
                console.log('store', this.$store.state.walletInfo)
            }).catch(err => {
                console.log('getbalance err', err)
            })
        },
        loginOut() {
            console.log('Login out')
            localStorage.removeItem('walletInfo')
            // localStorage.removeItem('earningsInfo')
            localStorage.setItem('connectStatus', 'disconnect')
            this.$store.commit('getWalletInfo', {})
        },
        handleConnect() {
            console.log(localStorage.getItem('connectStatus'))
            if (localStorage.getItem('connectStatus') === 'connect') {
                this.loginOut()
            } else if (!localStorage.getItem('connectStatus') || localStorage.getItem('connectStatus') === 'disconnect') {
                this.login()
            }

        },
    }
}
</script>

<style scoped></style>

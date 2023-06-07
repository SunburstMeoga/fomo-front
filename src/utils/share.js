// share.js

// url - 需要分享的页面地址（当前页面地址）
// title - 分享的标题（文章标题）


export function toQQ(url, title) {
    url = encodeURIComponent(url)
    title = encodeURIComponent(title)
    window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${url}&desc=${title}&pics=`)
}
export function toTelegram(url, title) {
    url = encodeURIComponent(url)
    title = encodeURIComponent(title)
    window.open(`https://t.me/share?url=${url}&text=${title}`)
}

export function toWhatsApp(url, title) {
    url = encodeURIComponent(url)
    title = encodeURIComponent(title)
    window.open(`https://web.whatsapp.com/send?text=${title}&url=${url}`)
}


export function toWechat(url, title) {
    url = encodeURIComponent(url)
    title = encodeURIComponent(title)
    // console.log(21, process.env.NUXT_ENV_APISERVER)
    window.open(`${process.env.NUXT_ENV_APISERVER}/sharetoWechat?url=${url}&title=${title}`)
}
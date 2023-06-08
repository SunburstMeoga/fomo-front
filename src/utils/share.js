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

export function toWhatsApp() {
    let _href = "https://api.whatsapp.com/send?";
    const text = `分享的文案`
    const link = location.href // 分享的页面
    _href += "text=" + text;//标题
    _href += "&url=" + link;//链接
    console.log('_href', _href)
    // return
    // window.open(`https://api.whatsapp.com/send?text=测试标题测试文案&url=https://www.baidu.com`);
    window.open(_href, '_blank');
}


export function toWechat(url, title) {
    url = encodeURIComponent(url)
    title = encodeURIComponent(title)
    // console.log(21, process.env.NUXT_ENV_APISERVER)
    window.open(`${process.env.NUXT_ENV_APISERVER}/sharetoWechat?url=${url}&title=${title}`)
}
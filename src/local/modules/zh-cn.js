export default {
    menubar: {
        connect: '连接钱包',
        disconnect: '断开连接'
    },
    word: {
        illustrate: '你输掉这场比赛的唯一方法就是停止比赛',
        copy: '复制',
        success: '成功',
        copySuccess: '复制成功',
        confirm: '确认',
        cancel: '取消',
        fail: '请重试',
        noBalance: '余额不足',
        amount: '金额',
        all: '全部'
    },
    popularize: {
        referrer: '推荐人',
        referrerAddress: '推荐地址',
        referrerNumber: '该地址已推荐',
        people: '人',
        totalEarning: '共收益',
    },
    account: {
        infor: '账户信息',
        address: '地址',
        balance: '余额',
        totalKeys: 'Key的总数量',
        earnings: '收益',
        spend: '花费',
        hold: '持有',
        epicycle: '本轮',
        history: '历史',
        estimate: '预估',
        withdrawn: '已提现',
        withdrawable: '可提现',
        withdrawals: '提现',
        expectIncome: '预估收益有两部分构成，持有Key的收益({expectIncome})和赢家的收益({pot})，如果你不是最后一个购买者仅有Key的持有收益。'
    },
    purchase: {
        title: '购买',
        tips: '购买一定数量的Key以增加倒计时时间',
        send: '发送{chainName}'
    },
    round: {
        title: '回合信息',
        roundNumber: '当前回合数',
        drain: '本轮游戏将于以下时间结束',
        loading: '正在加载...',
        lastBuyer: '最后一个买家',
        pot: '总奖池',
        totalKeySold: '售出的Key总数',
        roundCount: '已完结的回合次数',
        totalAmount: '玩家购买Key的总金额',
    },
    rules: {
        noPrompts: '不再提示',
        title: '游戏规则',
        purchaseRuleOne: '1、玩家向平台发送PGC购买Key，在每轮游戏开始时每位玩家的Key单价为1PGC，此后每购买1个Key，Key的单价会上涨0.01PGC，即key的单价会随着玩家购买的key的数量增加而增加，增幅为：每持有1个key，下一个购买的key较上一个key单价上涨0.01PGC。',
        purchaseRuleTwo: '2、在本轮游戏所有的玩家发送的PGC中.有50%的PGC会进入总奖池（Pot）。',
        purchaseRuleThree: '3、本轮游戏所有的玩家发送的PGC中剩余的50%中，20%会作为key的奖励发放至之前购买key的用户手里，5%将作为宣传奖励发放给上级推荐人（如果没有推荐人则将这5%加入到Key持有者里），平台则抽取10%用于游戏的宣传与维护，剩余15%将会进行抽奖发放给之前购买Key的某一个用户手里（中奖几率与该用户购买Key的数量形成正相关）。',
        purchaseRuleFour: '4、每当有一把Key被成功购买，当前轮次游戏时间将会增加30秒，游戏时间上限为24小时。当倒计时结束时，则本轮游戏结束，最后一次购买Key的玩家为本轮游戏最后的赢家，最后的赢家能获得最终奖励。',
        purchaseRuleFive: '5、倒计时结束时，代表本轮游戏已结束，最后的赢家将会赢取总奖池奖励。其中70%将会直接发放至赢家账户，平台抽取10%作为手续费，剩余20%则会进入下一轮游戏的总奖池中。',
        tableTitlePot: '奖池',
        tableTitleOwner: 'Key持有者',
        tableTitlePre: '上级',
        tableTitlePlatform: '平台',
        tableTitleAir: '空投池',
        tableTitleWinner: '胜利者',
        tableTitleNextRound: '下一轮',
    },
    dialog: {
        checkNetwork: '检查您的网络',
        checkMessage: '目前此页面仅在{chainName}中受支持，如果切换网络失败，请手动切换网络',
        confirmButtonText: '在“钱包”中切换网络'
    },
    share: {
        share: '分享',
        save: '保存到本地',
    }
}
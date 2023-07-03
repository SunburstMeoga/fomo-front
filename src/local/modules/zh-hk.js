export default {
    menubar: {
        connect: '連接錢包',
        disconnect: '斷開連接'
    },
    word: {
        illustrate: '你輸掉這場比賽的唯一方法就是停止比賽',
        copy: '複製',
        success: '成功',
        copySuccess: '復製成功',
        confirm: '確認',
        cancel: '取消',
        fail: '請重試',
        noBalance: '餘額不足',
        amount: '金額',
        all: '全部'

    },
    popularize: {
        referrer: '推薦人',
        referrerAddress: '推薦地址',
        referrerNumber: '該地址已推薦',
        people: '人',
        totalEarning: '共收益',
    },
    account: {
        infor: '賬戶信息',
        address: '地址',
        balance: '餘額',
        totalKeys: 'Key的總數量',
        earnings: '收益',
        spend: '花費',
        hold: '持有',
        epicycle: '本輪',
        history: '歷史',
        estimate: '預估',
        withdrawn: '已提現',
        withdrawable: '可提現',
        withdrawals: '提現',
        expectIncome: '預估收益有兩部分構成，持有Key的收益（x.xxx）和贏家的收益（x.xxx），如果你不是最後一個購買者僅有Key的持有收益。 '
    },
    purchase: {
        title: '購買',
        tips: '購買一定數量的Key以增加倒計時時間',
        send: '發送{chainName}'
    },
    round: {
        title: '回合信息',
        roundNumber: '當前回合數',
        drain: '本輪遊戲將於以下時間結束',
        loading: '正在加載...',
        lastBuyer: '最後一個買家',
        pot: '合約池',
        totalKeySold: '售出的Key總數',
        roundCount: '已完結的回合次數',
        totalAmount: '玩家購買Key的總金額',

    },
    rules: {
        noPrompts: '不再提示',
        title: '遊戲規則',
        purchaseRuleOne: '1、玩家向平臺發送PGC購買Key，在每輪遊戲開始時每位玩家的Key單價為1PGC，此後每購買1個Key，Key的單價會上漲0.01PGC，即key的單價會隨著玩家購買的key的數量增加而增加，增幅為:每持有1個key，下一個購買的key較上一個key單價上漲0.01PGC。 ',
        purchaseRuleTwo: '2、在本輪遊戲所有的玩家發送的PGC中. 有50%的PGC會進入總獎池（Pot）。 ',
        purchaseRuleThree: '3、本輪遊戲所有的玩家發送的PGC中剩餘的50%中，20%會作為key的獎勵發放至之前購買key的使用者手裡，5%將作為宣傳獎勵發放給上級推薦人（如果沒有推薦人則將這5%加入到Key持有者里），平臺則抽取10%用於遊戲的宣傳與維護，剩餘15% 將會進行抽獎發放給之前購買Key的某一個使用者手裡（中獎幾率與該用戶購買Key的數量形成正相關）。 ',
        purchaseRuleFour: '4、每當有一把Key被成功購買，當前輪次遊戲時間將會增加30秒，遊戲時間上限為24小時。 當倒計時結束時，則本輪遊戲結束，最後一次購買Key的玩家為本輪遊戲最後的贏家，最後的贏家能獲得最終獎勵。 ',
        purchaseRuleFive: '5、倒計時結束時，代表本輪遊戲已結束，最後的贏家將會贏取總獎池獎勵。 其中70%將會直接發放至贏家帳戶，平臺抽取10%作為手續費，剩餘20%則會進入下一輪遊戲的總獎池中。 ',
        tableTitlePot: '獎池',
        tableTitleOwner: 'Key持有者',
        tableTitlePre: '上級',
        tableTitlePlatform: '平台',
        tableTitleAir: '空投池',
        tableTitleWinner: '勝利者',
        tableTitleNextRound: '下一輪',
    },
    dialog: {
        checkNetwork: '檢查您的網路',
        checkMessage: '目前此頁面僅在{chainName}中受支援，如果切換網路失敗，請手動切換網路',
        confirmButtonText: '在“錢包”中切換網络'
    },
    share: {
        share: '分享',
        save: '保存到本地',
    }
}
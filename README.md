# misc-code
个人与雀魂有关的杂项文件

## 文件说明

#### [CodeDecode.py](CodeDecode.py)

这个是雀魂的核心 JavaScript 文件: `code.js` 的解混淆脚本

配套文件都在 `codejs` 文件夹下, 六位数字 `240728` 之类的文件夹指的是 `code.js` 文件版本

为了减小仓库文件大小, 只保留两个版本的 `code.js` 相关文件(一个 `code.js` 就有10M, 一个子文件夹就有30M)

`origin` 和 `output` 文件夹分别指原文件和输出文件

`code_origin.js` 是从预览界面复制下来的原文件, `code.js` 是除去前三行的后的, `dict.js` 就是前三行

`code_decode.js` 是解混淆后的 `code.js`, `dict_format` 是格式美化后的 `dict.js`

具体使用可见我的B站专栏: [cv36277616](https://www.bilibili.com/read/cv36277616)

---

#### [AccountDecode.py](AccountDecode.py)

这个是雀魂账号的三种 id: `account_id`, `friend_id`, `match_id` 之间的转换

加好友用的是 `friend_id`, 详见: [cv23616802](https://www.bilibili.com/read/cv23616802) 

---

#### [MatchDecode.py](MatchDecode.py)

这是是雀魂匿名牌谱与普通牌谱之间的转换脚本

`dec_url` 表示普通牌谱, `enc_url` 表示匿名牌谱, `debug` 是转换模式

要用的话直接在这个脚本里面改 `dec_url` 或 `enc_url` 的内容就行

对应专栏: [cv36066023](https://www.bilibili.com/read/cv36066023)

---

#### [paipu 文件夹](paipu)

`GetPaipuJSON.js` 文件就是在这个专栏中提到在 Console 里输入的脚本: [cv36373732](https://www.bilibili.com/read/cv36373732)

这里照专栏中做的话就把这个文件中的内容复制粘贴到 Console 里面就行

不过最好还是能看懂这个脚本的大致结构, 用的雀魂 API 是 `fetchGameRecord`

下面那个 `replay-editor` 文件夹也与这个专栏有关

专栏中的那场对局的牌谱信息文件也放到了这个文件夹以 [paipu](paipu/paipu_210815-6da08e40-2605-42fb-a5e3-f8aa5940362a.json) 开头的那个文件中

这个脚本的出处是 [牌譜をファイルに保存するにゃ](https://wikiwiki.jp/majsoul-api/%E7%89%8C%E8%AD%9C%E3%82%92%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%99%E3%82%8B%E3%81%AB%E3%82%83)

专栏中提到的 `fetchCustomizedContestByContestId` API 源自: [大会の情報と牌譜一覧をファイルに保存するにゃ](https://wikiwiki.jp/majsoul-api/%E5%A4%A7%E4%BC%9A%E3%81%AE%E6%83%85%E5%A0%B1%E3%81%A8%E7%89%8C%E8%AD%9C%E4%B8%80%E8%A6%A7%E3%82%92%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%99%E3%82%8B%E3%81%AB%E3%82%83)

也放到了这个文件夹的 `taikai.js` 文件里面

另外在这专栏中提到的那个能下载本账号最近1000个牌谱的脚本是这个 [MajsoulPaipuAnalyzer](https://github.com/zyr17/MajsoulPaipuAnalyzer)

关键信息在 `browseinject.js` 中, 用的雀魂 API 是 `fetchGameRecordList`

专栏中的那个雀魂 API 列表网站: [Protocol Documentation](https://wife.awa.moe/mjsoul/api.html)

此外: 雀魂牌谱屋的两个仓库: [amae-koromo](https://github.com/SAPikachu/amae-koromo) , [amae-koromo-scripts](https://github.com/SAPikachu/amae-koromo-scripts)

---

#### [replay-editor 文件夹](replay-editor)

这个是之前已经不再维护的仓库 [majsoul-replay-editor](https://github.com/GrandDawn/majsoul-replay-editor) 里面提到的视频 [BV1HE411Q7JM](https://www.bilibili.com/video/BV1HE411Q7JM) 所用的自制牌谱回放文档

但因为牌谱信息文件格式有变化, 所以目前只能当做参考

---

---

另外欢迎阅读我在B站发的几篇与雀魂有关的专栏: [rl846240](https://www.bilibili.com/read/readlist/rl846240)

以及关注 [我的B站空间](https://space.bilibili.com/372365985/)

---

TODO:

1. 把上面B站提到的几个专栏用 Markdown 的形式搬到 github 上
2. 实现雀魂自制牌谱回放(修改牌谱信息文件 以及 学会使用 Fiddler)
3. 实现批量爬取牌谱的方法(尝试理解雀魂牌谱屋的原理)
4. 研究雀魂 code.js 文件的结构与内容

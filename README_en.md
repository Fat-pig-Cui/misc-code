# misc-code

个人与雀魂有关的杂项文件, 中文版: [README.md](README.md)

Some python scripts about the game [Mahjong Soul](https://en.wikipedia.org/wiki/Mahjong_Soul)

## Description of Files

#### [CodeDecode.py](CodeDecode.py)

This is decryption script file of the core JavaScript file of Mahjong Soul: `code.js`

The companion files are all in the `codejs` folder, and the six-digit `240728` folder refers to the `code.js` file version

Only two different `code.js` file are listed in this repository to reduce size 

see details in [README_en.md](./doc/codejs文件解混淆/README_en.md)

---

#### [AccountDecode.py](AccountDecode.py)

This is the transformation of three ids (`account_id`, `friend_id`, `match_id`) in Mahjong Soul accounts

`freind_id` is what we use to add friends, see details in [README_en.md](doc/如何通过牌谱链接加好友/README_en.md) 

---

#### [MatchDecode.py](MatchDecode.py)

This is a script on transforming Mahjong Soul match links (between anonymous link and non-anonymous ones) 

`dec_url` means non-anonymous link, `enc_url` means anonymous one, `debug` means transformation mode

see details in [README_en.md](./doc/匿名牌谱与普通牌谱之间的转换/README_en.md)

---

#### [doc folder](./doc)

contains 4 folder, means 4 articles

---

#### [paipu folder](paipu)

`GetPaipuJSON.js` is the script which is mentioned in this article to input into Console: [README_en.md](./doc/牌谱里面到底记载了什么/README_en.md)

Copy this file's content to browser Console, with using Mahjong Soul's API `fetchGameRecord`

the `replay-editor` folder below also has something to do with the article above

the match info JSON file mentioned in the article is under this folder, whose name starts with [paipu](paipu/paipu_210815-6da08e40-2605-42fb-a5e3-f8aa5940362a.json)

This Javascript file is from [牌譜をファイルに保存するにゃ](https://wikiwiki.jp/majsoul-api/%E7%89%8C%E8%AD%9C%E3%82%92%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%99%E3%82%8B%E3%81%AB%E3%82%83)

API mentioned in the article `fetchCustomizedContestByContestId` is from [大会の情報と牌譜一覧をファイルに保存するにゃ](https://wikiwiki.jp/majsoul-api/%E5%A4%A7%E4%BC%9A%E3%81%AE%E6%83%85%E5%A0%B1%E3%81%A8%E7%89%8C%E8%AD%9C%E4%B8%80%E8%A6%A7%E3%82%92%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%99%E3%82%8B%E3%81%AB%E3%82%83), 
full content is `taikai.js`

Scripts which can download 1000 recent match record of one account is [MajsoulPaipuAnalyzer](https://github.com/zyr17/MajsoulPaipuAnalyzer)

key info is in `browseinject.js`, with using API `fetchGameRecordList`

Mahjong Soul API list: [Protocol Documentation](https://wife.awa.moe/mjsoul/api.html)

In addition, two repositories of MajSoul Stats: [amae-koromo](https://github.com/SAPikachu/amae-koromo) , [amae-koromo-scripts](https://github.com/SAPikachu/amae-koromo-scripts)

---

#### [replay-editor Folder](replay-editor)

This is the doc of the video [BV1HE411Q7JM](https://www.bilibili.com/video/BV1HE411Q7JM), which is mentioned in the out-of-date repository [majsoul-replay-editor](https://github.com/GrandDawn/majsoul-replay-editor)

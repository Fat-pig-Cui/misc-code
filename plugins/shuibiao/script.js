(function () {
    const injectUI = function () {
        if (
            typeof uiscript === 'undefined' ||
            !uiscript.UI_DesktopInfo ||
            typeof ui === 'undefined' ||
            // !ui.mj.desktopInfoUI.uiView ||
            !Laya.View.uiMap['mj/desktopInfo'] ||
            !Laya.View.uiMap['lobby/friend']) {
            console.log('Majsoul UIScript inject failed, Retring.')
            return setTimeout(injectUI, 1000)
        }
        console.log('Majsoul UIScript injected.');

        // 注入"查看"按钮UI
        (() => {
            let e = Laya.View.uiMap['lobby/friend'].child[1].child[2].child[2].child[0].child[0].child;
            let t = {
                type: 'Button',
                props: {
                    y: 99,
                    x: 450,
                    width: 156,
                    stateNum: 1,
                    skin: 'chs_t/myres/btn_small.png',
                    name: 'check',
                    height: 70,
                    anchorY: 0.5,
                    anchorX: 0.5,
                    sizeGrid: '30,30,30,30'
                },
                child: [{
                    type: 'Label',
                    props: {
                        y: 9,
                        x: 39,
                        width: 82,
                        text: '查看',
                        height: 39,
                        fontSize: 40,
                        font: 'chst_fengyu',
                        color: '#e6ba78',
                        align: 'center'
                    },
                    child: [{
                        type: 'Script',
                        props: {
                            runtime: "capsui.LabelLocalizationSize"
                        }
                    }
                    ]
                }, {
                    type: 'Script',
                    props: {
                        runtime: 'capsui.CButton'
                    }
                }
                ]
            };
            e[0].child.push(t);
            e[1].child.push(t);
        })();

        // 查水表 Class Start
        var cyInitMgr = (function () {
            function e() {
                (this.f = []),
                    (this.done = []),
                    (e.Inst = this)
            }

            return (
                (e.prototype.register = function (c, f) {
                    this.f.push({
                        c: c,
                        f: f
                    })
                }),
                    (e.prototype.init = function (c) {
                        if (this.done.includes(c))
                            return
                        for (var i = 0; i < this.f.length; ++i) {
                            if (this.f[i].c === c)
                                this.f[i].f()
                        }
                        this.done.push(c)
                    }),
                    (GameMgr.Inst.EnterLobby = (function () {
                        var o = GameMgr.Inst.EnterLobby
                        return function () {
                            return cyInitMgr.Inst.init('lobby'),
                                o.apply(this, arguments)
                        }
                    })()),
                    e)
        })();
        new cyInitMgr();
        // 查水表 Class End

        // 注册到 lobby Start
        cyInitMgr.Inst.register('lobby', () => {
            const setItem = uiscript.UI_Friend.Inst.page_search.setItem
            uiscript.UI_Friend.Inst.page_search.setItem = function (e, i, n) {
                let x = setItem.call(this, e, i, n)
                var c = 0;
                ["p0", "p1"].forEach(v => {
                    if (n[v]) {
                        n[v]["btn_check"] = i.getChildByName(v).getChildByName('check');
                        let id = this.playerinfos[2 * e + c].account_id
                        n[v]["btn_check"].clickHandler = Laya.Handler.create(
                            this,
                            function () {
                                uiscript.UI_OtherPlayerInfo.Inst.show(id)
                            }, null, false)
                        c = !c;
                    }
                });
                return x
            }
        })
        // 注册到 lobby End

        uiscript.UI_DesktopInfo.prototype.refreshSeat = function (t) {
            void 0 === t && (t = !1);
            view.DesktopMgr.Inst.seat;
            for (var e = view.DesktopMgr.Inst.player_datas, i = 0; i < 4; i++) {
                var n = view.DesktopMgr.Inst.localPosition2Seat(i),
                    a = this._player_infos[i];
                if (n < 0)
                    a.container.visible = !1;
                else {
                    a.container.visible = !0;
                    var r = view.DesktopMgr.Inst.getPlayerName(n);
                    if (game.Tools.SetNickname(a.name, r), a.head.id = e[n].avatar_id, a.head.set_head_frame(e[n].account_id, e[n].avatar_frame), a.avatar = e[n].avatar_id, 0 !== i) {
                        var s = e[n].account_id && 0 !== e[n].account_id,//移除牌谱模式判断 && view.DesktopMgr.Inst.mode != view.EMJMode.paipu,
                            o = e[n].account_id && 0 !== e[n].account_id && view.DesktopMgr.Inst.mode === view.EMJMode.play,
                            l = view.DesktopMgr.Inst.mode !== view.EMJMode.play;
                        t ? a.headbtn.onChangeSeat(s, o, l) : a.headbtn.reset(s, o, l)
                    }
                    e[n].title ? a.title.id = game.Tools.titleLocalization(e[n].account_id, e[n].title) : a.title.id = 0
                }
            }
        };
        // 改写 看信息 按钮
        uiscript.UI_DesktopInfo.prototype.btn_seeinfo = function (e) {
            if (view.DesktopMgr.Inst.gameing) {
                var i = view.DesktopMgr.Inst.player_datas[view.DesktopMgr.Inst.localPosition2Seat(e)].account_id;
                0 !== i && (view.DesktopMgr.Inst.game_config, uiscript.UI_OtherPlayerInfo.Inst.show(i, view.DesktopMgr.Inst.game_config.mode.mode < 10 ? 1 : 2))
            }
        };
        console.log('查水表插件加载完毕')
    }
    injectUI()
})()

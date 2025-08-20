// ==UserScript==
// @name         Complete Global Saturation
// @namespace    NyaggerSquad
// @icon         https://i.imgur.com/EQmyAni.png
// @version      1.01
// @description  Makes titles from other servers visible (as long as they exist on the current server)
// @author       anon
// @include      https://mahjongsoul.game.yo-star.com/
// @include      https://game.mahjongsoul.com/
// @include      https://game.maj-soul.com/1/
// ==/UserScript==

(function () {
    'use strict';

    //skips updating titles that are missing an english name (they'll stay as notitle),
    //otherwise the title area will be completely blank since they don't actually exist on the english server.
    //set this to false if you aren't playing on EN (although I haven't actually tested that)
    const SKIP_CHINK = false;

    function refreshHook() {
        for (let i in view.DesktopMgr.Inst.player_datas) {
            let local = view.DesktopMgr.Inst.seat2LocalPosition(view.DesktopMgr.Inst.players[i].seat);
            let player_data = view.DesktopMgr.Inst.player_datas[i];
            let player_info = uiscript.UI_DesktopInfo.Inst._player_infos[local];
            //player_info.head.set_head_frame(player_data.account_id, player_data.avatar_frame);
            if (SKIP_CHINK && !/^[\w\d\s :/-]+$/i.test(cfg.item_definition.title.get(player_data.title)?.name_chs)) {
                console.log("Skipped ", cfg.item_definition.title.get(player_data.title).name_chs, cfg.item_definition.title.get(player_data.title).icon)
                continue;
            }
            player_info.title.id = player_data.title;
        }
    }

    function retardCompatibilityFix() {
        uiscript.UI_DesktopInfo.Inst.refreshSeat = (function () {
            const cacheF = uiscript.UI_DesktopInfo.Inst.refreshSeat;
            return function () {
                const result = cacheF.apply(this, arguments);
                refreshHook();
                return result;
            };
        })();
    }

    var LazyCheck = setInterval(function () {
        if (uiscript?.UI_DesktopInfo?.Inst?.initRoom) {
            uiscript.UI_DesktopInfo.Inst.initRoom = (function () {
                const cacheF = uiscript.UI_DesktopInfo.Inst.initRoom;
                return function () {
                    const result = cacheF.apply(this, arguments);
                    retardCompatibilityFix();
                    return result;
                };
            })();
            clearInterval(LazyCheck);
        }
    }, 2000);
})();
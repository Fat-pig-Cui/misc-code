//作者: bin
class RecordEdit {
  constructor() {
    this.init();
    this.isEdit = false;
    this.helper = new EditHelper();
    this.data = {
      actions: '',
      xun: 0,
      players: null
    }
  }
  edit() {
    let UI_Repaly = uiscript.UI_Repaly.Inst;
    let round = UI_Repaly.rounds[0];
    UI_Repaly.rounds = [round];
    if (this.data.actions) round["actions"] = this.data.actions;
    if (this.data.xun) round["xun"] = this.data.xun;
    if (this.data.players) UI_Repaly.gameResult.result.players = this.data.players;
    console.log(round);
    this.isEdit = false;
  }
  init() {
    const _this = this;
    const initData = uiscript.UI_Repaly.prototype.initData
    uiscript.UI_Repaly.prototype.initData = function (t) {
      let _ = initData.call(this, t)
      if (_this.isEdit) _this.edit(this);
      return _;
    }
  }
}
class EditHelper {
  constructor() {
    this.data = [];
  }
  addNewRound({
    "ben": ben = 0,
    "chang": chang = 0,
    "dora": dora = "",
    "ju": ju = 0,
    "left_tile_count": left_tile_count = 69,
    "liqibang": liqibang = 0,
    "md5": md5 = "",
    "paishan": paishan = "",
    "scores": scores = [],
    "tiles0": tiles0 = [],
    "tiles1": tiles1 = [],
    "tiles2": tiles2 = [],
    "tiles3": tiles3 = [],
  }) {
    this.data = [];
    this.data.push({
      name: "RecordNewRound",
      data: {
        'ben': ben,
        'chang': chang,
        'dora': dora,
        'ju': ju,
        'left_tile_count': left_tile_count,
        'liqibang': liqibang,
        'md5': md5,
        'paishan': paishan,
        'scores': scores,
        'tiles0': tiles0,
        'tiles1': tiles1,
        'tiles2': tiles2,
        'tiles3': tiles3
      }
    });
    return this;
  }
  addDiscardTile({
    'doras': doras = null,
    'is_liqi': is_liqi = false,
    'is_wliqi': is_wliqi = false,
    'moqie': moqie = false,
    'seat': seat = 0,
    'tile': tile = ""
  }) {
    this.data.push({
      name: "RecordDiscardTile",
      data: {
        'doras': doras,
        'is_liqi': is_liqi,
        'is_wliqi': is_wliqi,
        'moqie': moqie,
        'seat': seat,
        'tile': tile
        // zhenting: [false, false, false, false]
      }
    });
    return this;
  }
  addDealTile({
    'doras': doras = null,
    'left_tile_count': left_tile_count = 0,
    'seat': seat = 0,
    'tile': tile = ""
  }) {
    this.data.push({
      name: "RecordDealTile",
      data: {
        'doras': doras,
        'left_tile_count': left_tile_count,
        'seat': seat,
        'tile': tile
        // zhengting: [false, false, false, false]
      }
    });
    return this;
  }
  addChiPengGang({
    'froms': froms = [],
    'seat': seat = 0,
    'tiles': tiles = [],
    'type': type = 0,
  }) {
    this.data.push({
      name: "RecordChiPengGang",
      data: {
        'froms': froms,
        'seat': seat,
        'tiles': tiles,
        'type': type
        // zhengting: [false, false, false, false]
      }
    });
    return this;
  }
  addAnGangAddGang({
    'seat': seat = 0,
    'tiles': tiles = [],
    'type': type = 0
  }) {
    this.data.push({
      name: "RecordAnGangAddGang",
      data: {
        'seat': seat,
        'tiles': tiles,
        'type': type
        // zhengting: [false, false, false, false]
      }
    });
    return this;
  }
  addBaBei({
    'moqie': moqie = false,
    'seat': seat = 0
  }) {
    this.data.push({
      name: "RecordBaBei",
      data: {
        'moqie': moqie,
        'seat': seat
      }
    });
    return this;
  }
  endLiuJu({
    'seat': seat = 0,
    'tiles': tiles = [],
    'type': type = 0
  }) {
    this.data.push({
      name: "RecordLiuJu",
      data: {
        'seat': seat,
        'tiles': tiles,
        'type': type
      }
    });
    return this.data;
  }
  endHule(HuleInfo, wait_timeout = 0) {
    this.data.push({
      name: "RecordHule",
      data: {
        'delta_scores': [0, 0, 0, 0],
        'hules': HuleInfo,
        'old_scores': [0, 0, 0, 0],
        'scores': [0, 0, 0, 0],
        'wait_timeout': wait_timeout
      }
    });
    return this.data;
  }
  endNoTile({
    'liujumanguan': liujumanguan = false,
    'players': players = [],
    'scores': scores = []
  }) {
    this.data.push({
      name: "RecordNoTile",
      data: {
        'gameend': false,
        'liujumanguan': liujumanguan,
        'players': players,
        'scores': scores
      }
    });
    return this.data;
  }
  getdata() {
    return this.data;
  }
}
if (!window.recordedit) {
  window.recordedit = new RecordEdit();
  Majsoul_Plus["RecordEdit"] = {
    name: "回放修改",
    actions: {
      "修改一次": () => window.recordedit.isEdit = true,
      "取消修改": () => window.recordedit.isEdit = false,
      "设置为预设": () => {
        const actions = window.recordedit.helper.addNewRound({
          dora: "5z",
          left_tile_count: 69,
          md5: "",
          paishan: "5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z55z5z5z5z5z5z5z5z5z55z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z",
          scores: [200000, 200000, 200000, 200000],
          tiles0: ["1s", "1s", "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "9s", "9s", "6z"],
          tiles1: ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"],
          tiles2: ["2s", "2s", "2s", "4s", "4s", "4s", "6s", "6s", "6s", "8s", "8s", "8s", "6z"],
          tiles3: ["1z", "1z", "1z", "2z", "2z", "2z", "3z", "3z", "3z", "4z", "4z", "4z", "6z"],
        }).addDealTile({
          is_liqi: true,
          is_wliqi: true,
          moqie: true,
          seat: 0,
          tile: "6z",
        }).endHule([{
          count: 3,
          doras: ["5z"],
          fans: [{
            val: 2,
            id: 49
          }, {
            val: 1,
            id: 59
          }],
          fu: 0,
          hand: ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"],
          hu_tile: "6z",
          liqi: false,
          ming: [],
          point_rong: 32000 * 3,
          point_sum: 32000 * 3,
          point_zimo_qin: 32000 * 3,
          qinjia: false,
          seat: 1,
          title_id: 7,
          yiman: true,
          zimo: false,
        }, {
          count: 4,
          doras: ["5z"],
          fans: [{
            val: 1,
            id: 40
          }, {
            val: 2,
            id: 48
          }, {
            val: 1,
            id: 59
          }],
          fu: 0,
          hand: ["2s", "2s", "2s", "4s", "4s", "4s", "6s", "6s", "6s", "8s", "8s", "8s", "6z"],
          hu_tile: "6z",
          liqi: false,
          ming: [],
          point_rong: 32000 * 4,
          point_sum: 32000 * 4,
          point_zimo_qin: 32000 * 4,
          qinjia: false,
          seat: 2,
          title_id: 8,
          yiman: true,
          zimo: false,
        }, {
          count: 6,
          doras: ["5z"],
          fans: [{
            val: 1,
            id: 39
          }, {
            val: 2,
            id: 48
          }, {
            val: 2,
            id: 50
          }, {
            val: 1,
            id: 59
          }],
          fu: 0,
          hand: ["1z", "1z", "1z", "2z", "2z", "2z", "3z", "3z", "3z", "4z", "4z", "4z", "6z"],
          hu_tile: "6z",
          liqi: false,
          ming: [],
          point_rong: 32000 * 6,
          point_sum: 32000 * 6,
          point_zimo_qin: 32000 * 6,
          qinjia: false,
          seat: 3,
          title_id: 9,
          yiman: true,
          zimo: false,
        }], 3);
        const xun = [1];
        const players = [{
          gold: 0,
          grading_score: 0,
          part_point_1: 200000 + 32000 * 6,
          part_point_2: 0,
          seat: 3,
          total_point: 32000 * 6
        }, {
          gold: 0,
          grading_score: 0,
          part_point_1: 200000 + 32000 * 4,
          part_point_2: 0,
          seat: 2,
          total_point: 32000 * 4
        }, {
          gold: 0,
          grading_score: 0,
          part_point_1: 200000 + 32000 * 3,
          part_point_2: 0,
          seat: 1,
          total_point: 32000 * 3
        }, {
          gold: 0,
          grading_score: 0,
          part_point_1: 200000 - 32000 * 13,
          part_point_2: 0,
          seat: 0,
          total_point: -32000 * 13
        }];
        window.recordedit.data.actions = actions;
        window.recordedit.data.xun = xun;
        window.recordedit.data.players = players;
      },
      "自定义": () => {
        let actions = window.recordedit.helper.addNewRound({
          ben: 0,
          chang: 0,
          dora: "5z",
          ju: 0,
          left_tile_count: 69,
          liqibang: 0,
          md5: "00000000",
          paishan: "5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z55z5z5z5z5z5z5z5z5z55z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z",
          scores: ["1z", "1z", "1z", "2z", "2z", "2z", "3z", "3z", "3z", "4z", "4z", "4z", "5z", "5z"],
          tiles0: ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
          tiles1: ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
          tiles2: ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
          tiles3: ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
        }).addDiscardTile({
          is_liqi: true,
          is_wliqi: true,
          moqie: true,
          seat: 0,
          tile: "5z",
        }).addDealTile({
          left_tile_count: 68,
          seat: 1,
          tile: "5z"
        }).addDiscardTile({
          is_liqi: false,
          is_wliqi: false,
          moqie: true,
          seat: 1,
          tile: "5z"
        }).addDealTile({
          left_tile_count: 67,
          seat: 2,
          tile: "5z"
        }).addDiscardTile({
          is_liqi: false,
          is_wliqi: false,
          moqie: true,
          seat: 2,
          tile: "5z"
        }).addDealTile({
          left_tile_count: 66,
          seat: 3,
          tile: "5z"
        }).addDiscardTile({
          is_liqi: false,
          is_wliqi: false,
          moqie: true,
          seat: 3,
          tile: "5z"
        }).addDealTile({
          left_tile_count: 65,
          seat: 0,
          tile: "1z"
        })
        actions = actions.addAnGangAddGang({
          seat: 0,
          tiles: "1z",
          type: 3,
        }).addDealTile({
          doras: ["5z", "5z"],
          left_tile_count: 64,
          seat: 0,
          tile: "2z"
        }).addAnGangAddGang({
          seat: 0,
          tiles: "2z",
          type: 3,
        }).addDealTile({
          doras: ["5z", "5z", "5z"],
          left_tile_count: 63,
          seat: 0,
          tile: "3z"
        }).addAnGangAddGang({
          seat: 0,
          tiles: "3z",
          type: 3,
        }).addDealTile({
          doras: ["5z", "5z", "5z", "5z"],
          left_tile_count: 62,
          seat: 0,
          tile: "4z"
        }).addAnGangAddGang({
          seat: 0,
          tiles: "4z",
          type: 3,
        }).addDealTile({
          doras: ["5z", "5z", "5z", "5z", "5z"],
          left_tile_count: 61,
          seat: 0,
          tile: "5z"
        })
        for (let i = 60; i > 0; i -= 4) {
          actions = actions.addDiscardTile({
            is_liqi: false,
            is_wliqi: false,
            moqie: true,
            seat: 0,
            tile: "5z",
          }).addDealTile({
            left_tile_count: i,
            seat: 1,
            tile: "5z"
          }).addDiscardTile({
            is_liqi: false,
            is_wliqi: false,
            moqie: true,
            seat: 1,
            tile: "5z"
          }).addDealTile({
            left_tile_count: i - 1,
            seat: 2,
            tile: "5z"
          }).addDiscardTile({
            is_liqi: false,
            is_wliqi: false,
            moqie: true,
            seat: 2,
            tile: "5z"
          }).addDealTile({
            left_tile_count: i - 2,
            seat: 3,
            tile: "5z"
          }).addDiscardTile({
            is_liqi: false,
            is_wliqi: false,
            moqie: true,
            seat: 3,
            tile: "5z"
          }).addDealTile({
            left_tile_count: i - 3,
            seat: 0,
            tile: "5z"
          })
        }
        actions = actions.endHule([{
          count: 6,
          doras: ["5z", "5z", "5z", "5z", "5z"],
          lidoras: ["5z", "5z", "5z", "5z", "5z"],
          fans: [{
            val: 1,
            id: 39
          }, {
            val: 1,
            id: 44
          }, {
            val: 2,
            id: 48
          }, {
            val: 2,
            id: 50
          }],
          fu: 0,
          hand: ["5z"],
          hu_tile: "5z",
          liqi: true,
          ming: ["angang(1z,1z,1z,1z)", "angang(2z,2z,2z,2z)", "angang(3z,3z,3z,3z)", "angang(4z,4z,4z,4z)"],
          point_rong: 32000 * 6,
          point_sum: 32000 * 6,
          point_zimo_qin: 32000 * 6,
          point_zimo_xian: 32000 * 2,
          qinjia: true,
          seat: 0,
          title_id: 10,
          yiman: true,
          zimo: true
        }], 3)
        const xun = [8 * 1, 8 * 3, 8 * 4, 8 * 5, 8 * 6, 8 * 7, 8 * 8, 8 * 9, 8 * 10, 8 * 11, 8 * 12, 8 * 13, 8 * 14, 8 * 15, 8 * 16, 8 * 17];
        const players = [{
          gold: 0,
          grading_score: 0,
          part_point_1: 25000 + 32000 * 6,
          part_point_2: 0,
          seat: 0,
          total_point: 32000 * 6
        }, {
          gold: 0,
          grading_score: 0,
          part_point_1: 25000 - 32000 * 2,
          part_point_2: 0,
          seat: 1,
          total_point: -32000 * 2
        }, {
          gold: 0,
          grading_score: 0,
          part_point_1: 25000 - 32000 * 2,
          part_point_2: 0,
          seat: 2,
          total_point: -32000 * 2
        }, {
          gold: 0,
          grading_score: 0,
          part_point_1: 25000 - 32000 * 2,
          part_point_2: 0,
          seat: 3,
          total_point: -32000 * 2
        }];
        window.recordedit.data.actions = actions;
        window.recordedit.data.xun = xun;
        window.recordedit.data.players = players;
      }
    }
  }
  console.log("回放修改 加载完毕")
} else {
  console.warn("window.recordedit 被占用")
}

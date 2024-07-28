// 作者:bin
/** 修改主要注入 */
class RecordEdit {
    /** 初始化,注入 */
    init(): void;
    /** 是否修改 */
    isEdit: boolean;
    /** 回放生成小助手 */
    helper: EditHelper;
}
/** 回放生成器 */
class EditHelper {
    /** 英语存储回放数据 */
    data: data[];
    /**
     * 初始化 `data` 字段,并添加开局配牌数据
     * @param data 数据
     */
    addNewRound(data: RecordNewRound): this;
    /**
     * 添加切牌数据
     * @param data 数据
     */
    addDiscardTile(data: RecordDiscardTile): this;
    /**
     * 添加摸牌数据
     * @param data 数据
     */
    addDealTile(data: RecordDealTile): this;
    /**
     * 添加吃碰杠事件
     * @param data 数据
     */
    addChiPengGang(data: RecordChiPengGang): this;
    /**
     * 添加暗杠加杠事件
     * @param data 数据
     */
    addAnGangAddGang(data: RecordAnGangAddGang): this;
    /**
     * 添加拔北事件
     * @param data 数据
     */
    addBaBei(data: RecordBaBei): this;
    /**
     * 添加特殊流局结局
     * @param data 数据
     */
    endLiuJu(data: RecordLiuJu): this['data'];
    /**
     * 添加和牌结局
     * @param data 数据
     */
    endHule(data: RecordHule[], wait_timeout): this['data'];
    /**
     * 添加荒牌流局结局
     * @param data 数据
     */
    endNoTile(data: RecordNoTile): this['data'];
    /**
     * 用于获取 `data` 字段，无实际作用
     * @param data 数据
     */
    getdata(): this['data'];
    /**
     * 
     * @param data 数据
     */
}
/**
 * 回放数据单元
 * #### 基本流程
 * - GameStart
 * - - - RecordAnGangAddGang
 * - - RecordDiscardTile
 * - - - (GameEnd)
 * - - RecordDealTile
 * - - - RecordChiPengGang
 * - GameEnd
 * 
 * 注:
 * - 为必要流程
 * - - 为循环流程
 * - - - 为可选流程
 */
interface data {
    /** 本场数 */
    ben: number;
    /** 风场数 */
    chang: number;
    /** 宝牌指示器 */
    dora: string;
    /** 局数 */
    ju: number;
    /** 牌山剩下的牌数,一般为69 */
    left_tile_count: number;
    /** 立直棒数 */
    liqibang: number;
    /** 牌谱md5码 */
    md5: string;
    /** 牌山字符串 */
    paishan: string;
    /** 初始分数 */
    scores: number[];
    /** 庄家手牌,14张 */
    tiles0: string[];
    /** 闲家手牌,13张 */
    tiles1: string[];
    /** 闲家手牌,13张 */
    tiles2: string[];
    /** 闲家手牌,13张 */
    tiles3: string[];
}
//////////////////////////////////////////////////
/** 标识回放数据 */
interface RecordData { }
/** 标识回放开始 */
interface GameStart extends RecordData { }
/** 标识回放中 */
interface GamePlaying extends RecordData { }
/** 标识回放结束 */
interface GamePlayEnd extends RecordData { }
//////////////////////////////////////////////////
/** 开局数据 */
interface RecordNewRound extends GameStart {
    /** 本场数 */
    ben: number;
    /** 风场数 */
    chang: number;
    /** 宝牌指示器 */
    dora: string;
    /** 局数 */
    ju: number;
    /** 牌山剩下的牌数,一般为69 */
    left_tile_count: number;
    /** 立直棒数 */
    liqibang: number;
    /** 牌谱md5码 */
    md5: string;
    /** 牌山字符串 */
    paishan: string;
    /** 初始分数 */
    scores: number[];
    /** 庄家手牌,14张 */
    tiles0: string[];
    /** 闲家手牌,13张 */
    tiles1: string[];
    /** 闲家手牌,13张 */
    tiles2: string[];
    /** 闲家手牌,13张 */
    tiles3: string[];
}
/** 切牌数据 */
interface RecordDiscardTile extends GamePlaying {
    /** 是否立直 */
    is_liqi: boolean;
    /** 是否W立直 */
    is_wliqi: boolean;
    /** 是否摸切 */
    moqie: boolean;
    /** 座位号 */
    seat: number;
    /** 麻将牌 */
    tile: string;
}
/** 摸牌数据 */
interface RecordDealTile extends GamePlaying {
    doras: string[];
    /** 牌山剩余牌数 */
    left_tile_count: number;
    /** 座位号 */
    seat: number;
    /** 麻将牌 */
    tile: string;
}
/** 吃碰杠数据 */
interface RecordChiPengGang extends GamePlaying {
    /** 来源数据,副露每张麻将牌的来源 */
    froms: number[];
    /** 座位号 */
    seat: number;
    /** 副露牌字符串数组 */
    tiles: string;
    /** 副露种类,从 `mjcore.E_Ming` 中获取 */
    type: number;
}
/** 暗杠加杠数据 */
interface RecordAnGangAddGang extends GamePlaying {
    /** 座位号 */
    seat: number;
    /** 杠的牌 */
    tiles: string;
    /** 杠种类,从 `mjcore.E_Ming` 中获取,仅可能为2(杠)或3(暗杠) */
    type: number;
}
/** 拔北数据 */
interface RecordBaBei extends GamePlaying {
    /** 是否摸切 */
    moqie: boolean;
    /** 座位号 */
    seat: number
}
/** 特殊流局数据 */
interface RecordLiuJu extends GameEnd {
    /** 座位号 */
    seat: number
    /** 流局打出的最后一张牌 */
    tiles: string
    /** 流局方式 */
    type: number 
}
/** 和牌数据 */
interface RecordHule extends GameEnd {
    /** 番数 */
    count: number;
    /** 宝牌数组,**不是**指示牌 */
    doras: string[];
    /** 里宝牌数组 */
    lidoras: string[];
    /** 具体番种元素,不定长数组 */
    fans: {
        /** 番数或役满数 */
        val: number;
        /** 役种id,从 `cfg.fan.fan.rows_` 中查找 */
        id: number;
    }[];
    /** 符数 */
    fu: number;
    /** 手牌数组 */
    hand: string[];
    /** 和的牌 */
    hu_tile: string;
    /** 是否立直,为 `false` 时可以省略 `lidoras` 字段 */
    liqi: boolean;
    /**
     * 副露数组,需要遵循以下格式:
     * - `kezi(1z,1z,1z)`
     * - `shunzi(1z,1z,1z)`
     * - `angang(1z,1z,1z,1z)`
     * - `minggang(1z,1z,1z,1z)`
     */
    ming: string[];
    /** 和牌点数 */
    point_rong: number;
    /** 总共获得点数 */
    point_sum: number;
    /** 亲家付点 */
    point_zimo_qin: number;
    /** 闲家付点 */
    point_zimo_xian: number;
    /** 是否为亲家,为 `true` 时省略 `point_zimo_qin` 字段 */
    qinjia: boolean;
    /** 座位号 */
    seat: numberm;
    /** 役名,从 `mjcore.E_Dadian_Title` 中查找,6倍役满为10 */
    title_id: number;
    /** 是否为役满 */
    yiman: boolean;
    /** 是否为自摸 */
    zimo: boolean;
}
/** 荒牌流局数据 */
interface RecordNoTile extends GameEnd {
    /** 是否结束游戏 */
    gameend: boolean
    /** 是否有流局满贯 */
    liujumanguan: boolean
    /** 玩家 */
    players: string[]
    /** 分数 */
    scores: number[]
}

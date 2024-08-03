"""
    @file AccountDecode.py
    @author Chubbypig (chubbypig@qq.com)
    @date 2023-3-14 (last modified on 2024-7-12)
    @brief 雀魂麻将加好友的 friend_id, 牌谱屋的 account_id 以及 牌谱链接最后部分的 match_id 三者之间的转化
        Transformation of three ids `friend_id`, `account_id` and `match_id`
"""

# 下面四个是 friend_id 与 account_id 之间相关的常量
OFFSET = 1e7  # 与核心算法的结果偏移量
XOR_CODE = 6139246  # 异或加密的数据
ALPHABET = 67108863  # 取后26位二进制数的位运算辅助常量
EXCEEDED = ALPHABET + 1  # 超出26位的数据的位运算辅助常量

# 下面两个是 match_id 与 account_id 之间相关的常量
OFFSET_2 = [1117113, 1358437]  # 两个偏移量
XOR_CODE_2 = 86216345  # 异或加密的数据

# acc2friend 函数将 牌谱屋网址显示的 id (account_id) 转化为 游戏加好友的 id (friend_id)
'''
@brief

acc2friend 函数: 同理传入的 account_id 化为二进制, 如果长度没有超过26位,
那用小写字母 a-z 表示这26位, 即 a-z 表示0或1, 用大写字母 A-Z 表示 a-z 的反,
如果长度超出26位, 那超出的部分记录为 $（$ 是一段二进制串, 没有超出26位的话则 $ 为0）
则 account_id 可以表示为 $abcdefghijklmnopqrstuvwxyz
return 的值则为 $tuvWxYZAbCDeFgHIjKlMNoPQRs + 1e7
即涉及到运算的只有后26位
用数组表示映射关系的话那就是:
0   4    9    4    9    4
abcdefghijklmnopqrstuvwxyz  bb[26]
HiJKlMnOPqRsTUvWXYzabcDeFG  aa[26]
{
    aa[0]  = ~bb[7]
    aa[1]  =  bb[8]
    aa[2]  = ~bb[9]
    aa[3]  = ~bb[10]
    aa[4]  =  bb[11]
    aa[5]  = ~bb[12]
    aa[6]  =  bb[13]
    aa[7]  = ~bb[14]
    aa[8]  = ~bb[15]
    aa[9]  =  bb[16]
    aa[10] = ~bb[17]
    aa[11] =  bb[18]
    aa[12] = ~bb[19]
    aa[13] = ~bb[20]
    aa[14] =  bb[21]
    aa[15] = ~bb[22]
    aa[16] = ~bb[23]
    aa[18] = ~bb[24]
    aa[17] =  bb[25]
    aa[22] =  bb[0]
    aa[19] =  bb[1]
    aa[20] =  bb[2]
    aa[21] = ~bb[3]
    aa[23] =  bb[4]
    aa[24] = ~bb[5]
    aa[25] = ~bb[6]
}
'''


def acc2friend(account_id):
    data = account_id ^ XOR_CODE  # 因为 a ^ b ^ b = a, 所以再异或一次即可
    tmp = data & ALPHABET  # 二进制后26位

    # 从左向右数第7位分割, 524287 的二进制是19个1
    tmp = (tmp & 524287) << 7 | tmp >> 19

    # (data & EXCEEDED) 的意思是如果 data >= EXCEEDED, 则等于 EXCEEDED, 如果 data < EXCEEDED, 那么等于 0
    friend_id = int(tmp + (data & EXCEEDED) + OFFSET)  # 回加
    return friend_id


# fri2account 函数将 游戏加好友的 id (friend_id) 转化为 牌谱屋网址显示的 id (account_id)
'''
@brief

fri2account 函数: 传入的 friend_id 减去1e7之后化为二进制, 如果长度没有超过26位,
那用小写字母 a-z 表示这26位, 即 a-z 表示0或1, 用大写字母 A-Z 表示 a-z 的反,
如果长度超出26位, 那超出的部分记录为 $($ 是一段二进制串, 没有超出26位的话则 $ 为0)
则 friend_id-1e7 可以表示为 $abcdefghijklmnopqrstuvwxyz
return 的值则为 $tuvWxYZAbCDeFgHIjKlMNoPQRs
即涉及到运算的只有后26位
用数组表示映射关系的话那就是:
0   4    9    4    9    4
abcdefghijklmnopqrstuvwxyz  aa[26]
tuvWxYZAbCDeFgHIjKlMNoPQRs  bb[26]
{
    bb[0]  =  aa[19]
    bb[1]  =  aa[20]
    bb[2]  =  aa[21]
    bb[3]  = ~aa[22]
    bb[4]  =  aa[23]
    bb[5]  = ~aa[24]
    bb[6]  = ~aa[25]
    bb[7]  = ~aa[0]
    bb[8]  =  aa[1]
    bb[9]  = ~aa[2]
    bb[10] = ~aa[3]
    bb[11] =  aa[4]
    bb[12] = ~aa[5]
    bb[13] =  aa[6]
    bb[14] = ~aa[7]
    bb[15] = ~aa[8]
    bb[16] =  aa[9]
    bb[17] = ~aa[10]
    bb[18] =  aa[11]
    bb[19] = ~aa[12]
    bb[20] = ~aa[13]
    bb[21] =  aa[14]
    bb[22] = ~aa[15]
    bb[23] = ~aa[16]
    bb[24] = ~aa[17]
    bb[25] =  aa[18]
}
'''


def fri2account(friend_id):
    data = int(friend_id - OFFSET)  # 数据预处理
    tmp = data & ALPHABET  # 二进制后26位

    # 从左向右数第19位分割, 127 的二进制是7个1
    tmp = (tmp & 127) << 19 | tmp >> 7

    account_id = int((data & EXCEEDED) + tmp ^ XOR_CODE)
    return account_id


# acc2match 函数将 牌谱屋网址显示的 id (account_id) 转化为 牌谱链接最后部分的 id (match_id)
def acc2match(account_id):
    return int((7 * account_id + OFFSET_2[0] ^ XOR_CODE_2) + OFFSET_2[1])


# fri2match 函数将 牌谱链接最后部分的 id (match_id) 转化为 牌谱屋网址显示的 id (account_id)
def mat2account(match_id):
    return int(((match_id - OFFSET_2[1] ^ XOR_CODE_2) - OFFSET_2[0]) / 7)


# mat2friend 函数将 牌谱链接最后部分的 id (match_id) 转化为 游戏加好友的 id (friend_id)
def mat2friend(match_id):
    return acc2friend(mat2account(match_id))


# fri2match 函数将 游戏加好友的 id (friend_id) 转化为 牌谱链接最后部分的 id (match_id)
def fri2match(friend_id):
    return acc2match(fri2account(friend_id))


def main():
    # friend_id 为游戏加好友的 id, account_id 为牌谱屋网址显示的 id, match_id 为牌谱链接最后部分的 id
    # account_id = fri2account(friend_id)
    # friend_id = acc2friend(account_id)
    # friend_id = 42121878, account_id = 15628582, match_id = 63606719

    friend_id = int(42121878)
    account_id = int(15628582)
    match_id = int(63606719)
    # account_id = int(input())
    print(acc2friend(account_id))
    print(fri2account(friend_id))
    print(acc2match(account_id))
    print(mat2account(match_id))
    print(mat2friend(match_id))
    print(fri2match(friend_id))


if __name__ == "__main__":
    main()

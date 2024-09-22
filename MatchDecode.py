"""
    @file MatchDecode.py
    @author Chubbypig (chubbypig@qq.com)
    @date 2024-7-12
    @brief 雀魂匿名牌谱与普通牌谱链接之间的转换
        Transformation between anonymous match links and non-anonymous ones
"""
import re

LEN = 36  # 数字10位 + 小写字母26位
OFFSET = 17  # 编码偏移量的一部分
code_0 = ord('0')  # 四种字符的 ASCII 编码
code_9 = ord('9')
code_a = ord('a')
code_z = ord('z')

# encodeMatch 函数是 将普通牌谱转换为匿名牌谱 的核心函数
'''
encodeMatch 函数和 decodeMatch 函数的原理是一模一样的, 而且比较简单, 懂其中一个就行
加密的方式其实就是对数字0-9和小写字母a-z进行重新编码, 具体实现原理是:
1. 将字符映射到一个模中: 总共36种字符, 排列顺序按照0-9,a-z排列, 即 a 是第11个字符, z 是第36个字符
2. 循环偏移: 偏移量分为两部分, OFFSET(固定值) + 该字符所在 str 字符串下标(可变值)
3. 将该模根据下标映射回对应的字符
4. 其他字符(短横线"-")不做处理
'''


def encodeMatch(string):
    asc = []
    result = ''
    for char in string:  # str 字符串重新编码
        if code_0 <= ord(char) <= code_9:  # 将 字符0-9 映射到 下标0-9
            asc.append(ord(char) - code_0)
        elif code_a <= ord(char) <= code_z:  # 将 字符a-z 映射到 下标10-35, 减 10 是因为数字0-9排在字母a-z前面
            asc.append(ord(char) - code_a + 10)
        else:
            asc.append(ord(char))

    for i in range(0, len(asc)):
        if asc[i] != ord('-'):  # "-" 不处理
            asc[i] = int(asc[i] + OFFSET + i) % LEN  # 核心代码, 循环右移 OFFSET + i

    for data in asc:  # 返回映射
        if 0 <= data <= 9:
            result += chr(data + code_0)
        elif 10 <= data < LEN:
            result += chr(data + code_a - 10)
        else:
            result += chr(data)

    return result


# decodeMatch 函数是 将匿名牌谱转换为普通牌谱 的核心函数


def decodeMatch(string):
    asc = []
    result = ''
    for char in string:  # str 字符串重新编码
        if code_0 <= ord(char) <= code_9:  # 将 字符0-9 映射到 下标0-9
            asc.append(ord(char) - code_0)
        elif code_a <= ord(char) <= code_z:  # 将 字符a-z 映射到 下标10-35, 减 10 是因为数字0-9排在字母a-z前面
            asc.append(ord(char) - code_a + 10)
        else:
            asc.append(ord(char))

    for i in range(0, len(asc)):
        if asc[i] != ord('-'):
            # 核心代码, 循环左移 OFFSET + i
            # 又加上 2 * LEN 是因为前面的值可能会是负的, 而取模不会改变正负
            asc[i] = int(asc[i] - OFFSET - i + LEN * 2) % LEN

    for data in asc:
        if 0 <= data <= 9:
            result += chr(data + code_0)
        elif 10 <= data < LEN:
            result += chr(data + code_a - 10)
        else:
            result += chr(data)

    return result


def main(debug=1):
    """
    @brief
    雀魂牌谱的关键信息在链接 "?paipu=" 后面(毕竟前面都是一样的), 可以看到这部分的字符串有很多特征:
    0. 牌谱链接删去 "?paipu=" 及之前的部分仍然可以在游戏内查看
    1. 只由数字, 小写字母, 短横线"-", 下划线"_"组成
    2. 被一共5个"-"隔开, 普通牌谱后面还有个"_a"加一串数字, 而匿名牌谱在普通牌谱之上还加了"_2"
    3. 到"_a"部分为止, 被"-"隔开的部分长度都是相等的, 普通和匿名都一样, 长度分别是 6, 8, 4, 4, 4, 12
    4. 普通牌谱的第一个部分是牌谱生成日期(对局结束时), 比如 200515 就是 2020年5月15号
    5. "_a"后面的一串数字也是一个 id, 同一个玩家的牌谱这串数字相同, 无论是否匿名
    6. 同一场对局但不同玩家主视角的谱, 在"_a"前面的部分完全相同, 只有这后面的数字不同, 即这个数字是决定你查看牌谱时候的主视角
    7. 普通牌谱如果把后面"_a"及以后的部分删去(或者其他不相关的数字), 查看牌谱不会出错, 只不过会把主视角重置为东起的玩家
    """
    # 普通牌谱
    dec_url = "https://game.maj-soul.com/1/?paipu=200515-cfbe0120-c92c-44ad-bdfc-ebfef3a33a10_a89702544"
    # 匿名牌谱
    enc_url = "https://game.maj-soul.com/1/?paipu=jijpmr-0415suwv-971c-67ei-ilom-qottvksmnvnn_a89702544_2"

    dec = debug  # 由你修改: 0 表示普通牌谱转换为匿名牌谱, 1 表示匿名牌谱转换为普通牌谱
    # 匹配的正则表达式
    pattern = r"([a-z0-9]{6}\-[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12})_a(\d+)(_2)?"
    if dec == 0:  # 普通牌谱转换为匿名牌谱
        matches = re.search(pattern, dec_url)
        if not matches:
            print("Invalid Majsoul match url!")
            return
        '''
        正则匹配执行结果分析
        到这里 matches 就是个长度为 4 的数组, 下面匿名牌谱也类似, 对应内容分别是
        {
            matches[0]:  "200515-cfbe0120-c92c-44ad-bdfc-ebfef3a33a10_a89702544", (关键信息的整个部分)
            matches[1]:  "200515-cfbe0120-c92c-44ad-bdfc-ebfef3a33a10", ("_a"前面的部分)
            matches[2]:  "89702544", ("_a"后面不带"_2"的部分)
            matches[3]:  "" (普通牌谱) 或 "_2" (匿名牌谱)
        }
        所以区别匿名牌谱与普通牌谱的区别就通过 matches[3]
        '''
        if not matches[3]:  # 普通牌谱
            enmatch = encodeMatch(matches[1])  # 核心转换函数
            enc_url = dec_url.replace(matches[0], enmatch + '_a' + matches[2] + '_2')  # 替换
            print("The Anonymous url: " + enc_url)
        else:
            print("Already an Anonymous match link!")
    else:  # 匿名牌谱转换为普通牌谱
        matches = re.search(pattern, enc_url)
        if not matches:
            print("Invalid Majsoul match url!")
            return
        if matches[3]:  # 匿名牌谱
            dematch = decodeMatch(matches[1])  # 核心转换函数
            dec_url = enc_url.replace(matches[0], dematch + '_a' + matches[2])  # 替换
            print("The Non-Anonymous url: " + dec_url)
        else:
            print("Already a Non-Anonymous match link!")


if __name__ == "__main__":
    main()


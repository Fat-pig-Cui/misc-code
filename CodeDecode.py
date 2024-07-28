"""
    @file: CodeDecode.py
    @author: Chubbypig (chubbypig@qq.com)
    @date: 2024-7-24
    @brief:
Q: 什么是 code.js?
A: code.js 是雀魂的核心 JavaScript 文件, 几乎所有算法, 资源架构都可以在这里得到分析, 但该文件进行过 JavaScript 混淆,
   关键内容被统一存放在了开头一个庞大的全局数组(字典)里面, 没有可读性, 该 python 脚本即是解开该混淆使其更加容易阅读的,
   把引用字典的部分展开成字典对应的内容, 这样就很容易得到雀魂的一些算法的原理

总体思路 & 前置工作:
1. 电脑浏览器登录网页版雀魂, F12 打开控制台, 在 Network 界面或用 Console 找到 code.js 文件, 在调试器预览该文件,
如果没有格式化(所有内容挤在一行)就点下面的 {} 格式化, Ctrl + A 全选预览中的内容, 复制, 粘贴到本地一个空的 js 文件中(记为 code.js),
该文件非常大(10M 的文本文件), 相关操作会有点卡, 建议用适合开发的相关软件(Chrome, VSCode)进行操作
2. 打开 code.js, 选中非常长前三行剪切到另一个空的 js 文件中(记为 dict.js)
3. 这样就完成了基本前置工作, 此时 code.js 文件去掉了字典, 剩下的就是根据自身情况修改下面的含有 "path" 的变量名对应的路径内容
4. python 运行该文件, 则在 file_decode_path 中找到生成的文件, 即是解开 JavaScript 混淆的 code.js 文件
"""
import re  # 第二部分要用到正则表达式, 先放到最前面

'''
=============================================
                读取字典部分
=============================================
思路:
1. 逐行读取 dict.js 文件
2. 对于每一行, 跳过开头的变量, 直到到达中括号里面的元素
3. 每一个元素, 分为两部分:
    1) 是正则表达式(以正斜杠 / 开头)
    2) 不是正则表达式
    元素都以逗号结尾, 但有时逗号会在单引号中存在, 所以用 inBracket 判断是否在单引号中
    此外还要考虑反斜杠 \\ 转义的问题, 
4. 根据时机写入文件

难点: 元素结尾的确定
'''

# 动态变量命名
names = locals()

# code.js 文件版本, 以日期形式
code_version = "240728"

# 字典文件目录 和 规格化后的字典文件存放目录, 根据自身情况修改 "path"
file_dict_path = "./codejs/" + code_version + "/origin/dict.js"
file_format_path = "./codejs/" + code_version + "/output/dict_format.js"
dict_file = open(file_dict_path, "r")
format_file = open(file_format_path, "w")

# DATA 是三行字典的全体, 读取完成后再分发到三个变量里面
# NAME 是字典里面 3*3 总共 9 个变量的名称
DATA = [[], [], []]
NAME = [[], [], []]

line_num = 0  # 行数计数器, 0, 1, 2 分别对应前三行
for line in dict_file:
    variable_num = 0  # 该行第几个变量, 与 NAME 搭配

    flag = False  # 判断是否到了 [] 内
    index = 0  # line 字符串的下标
    while index < len(line):
        if not flag and line[index - 1] != '[':
            if line[index - 1] == '$' and variable_num < 3:
                # 由于变量名在最开头, 所以一定是在 '[' 前面, 读满 3 个之后该行停用
                NAME[line_num].append(line[index])
                variable_num += 1
            index += 1
            continue
        flag = True
        inBracket = False  # 是否在单引号中
        isRegular = False  # 是否是正则表达式, 即 /.*/ 这种形式
        if line[index] != ' ':
            if line[index] == '/':  # 以 / 开始, 则是正则表达式形式
                isRegular = True
            word = ""  # 存储元素的临时变量
            if not isRegular:  # 是普通字符串
                while index < len(line):
                    # 遇到了单引号, 则切换"是否在单引号中"这个状态, 还有 \\ 转义的问题
                    if line[index] == '\'' and not (line[index - 1] == '\\' and line[index - 2] != '\\'):
                        inBracket = not inBracket
                    # 遇到了逗号, 而且不在单引号中, 则说明该元素结束了
                    elif (line[index: index + 2] == ', ' or line[index] == ']') and not inBracket:
                        break
                    word += line[index]  # line 逐个字符赋值给 word
                    index += 1
            else:  # 是正则表达式
                word += line[index]  # 先写入正斜杠
                index += 1
                while index < len(line):
                    # 以 '/,' 结束
                    if line[index - 1: index + 1] == '/,':
                        break
                    # 以 '/g,' 或 '/i,' 结束
                    if line[index - 2: index + 1] == '/g,' or line[index - 2: index + 1] == '/i,':
                        break
                    # 以 '/gm,' 结束
                    if line[index - 3: index + 1] == '/gm,':
                        break
                    word += line[index]  # line 逐个字符赋值给 word
                    index += 1

            DATA[line_num].append(word)  # 将 word 赋值给 DATA
            if line[index] == ']':  # 碰到了 ']', 说明到了 [] 外, 到了行尾
                break
        index += 1
    # 写入到文件, 格式美观化
    if line_num == 0:
        format_file.write("$" + NAME[line_num][0] + " = $" + NAME[line_num][1] + " = $" + NAME[line_num][2] + " = [\n")
    elif line_num == 1 or line_num == 2:
        format_file.write("];" + '\n' * 10 + "// " + '=' * 60 + '\n' * 10)
        format_file.write("$" + NAME[line_num][0] + " = $" + NAME[line_num][1] + " = $" + NAME[line_num][2] + " = [\n")
    for data in DATA[line_num][:-1]:
        format_file.write(' ' * 4 + data + ", \n")
    format_file.write(' ' * 4 + DATA[line_num][-1] + "\n")  # 最后一个元素不需要逗号, 故单独拎出来
    if line_num == 2:
        format_file.write("];\n\nvar = $")
        for row in NAME:
            for i in row:
                if i != NAME[2][2]:
                    format_file.write(i + ', $')
        format_file.write(NAME[2][2] + ';\n')

    line_num += 1

dict_file.close()
format_file.close()

# DATA 分配给各变量
names[NAME[0][0]] = names[NAME[0][1]] = names[NAME[0][2]] = DATA[0]
names[NAME[1][0]] = names[NAME[1][1]] = names[NAME[1][2]] = DATA[1]
names[NAME[2][0]] = names[NAME[2][1]] = names[NAME[2][2]] = DATA[2]

# 输出三行字典的长度, 方便 debug
print(len(DATA[0]))
print(len(DATA[1]))
print(len(DATA[2]))
'''
2024年7月22号版本的 code.js 文件:
三行字典的长度分别为 [8517, 8581, 8534]
2024年7月24号版本的 code.js 文件:
三行字典的长度分别为 [8715, 8803, 8637]
2024年7月28号版本的 code.js 文件:
三行字典的长度分别为 [8720, 8631, 8804]
'''

# 以上是将字典读入到内存的代码

'''
========================================================================================
'''

# 以下是将上述的字典的内容展开到正文中的代码

'''
=============================================
                还原字典部分
=============================================
思路:
1. 先确定两种正则表达式:
    1) 正文中通过数组引用的方式的字符串
    2) 某些函数内部的再次混淆的字符串
2. 逐行读取 code.js 文件
3. 对于每一行, 分为两部分:
    1) 判断是不是 再次混淆, 若是根据混淆内容改编对应的值, 并设置一个变量表示该混淆的作用域
    2) 判断是否有数组引用, 若有则找出所有引用的子串, 并进行拆分, 根据拆分内容得知引用的是哪个数组和下标
       然后查字典的替换原行对应的内容
    如果数组对应的内容过长还要考虑截断, 即不还原(正常来说不会出现这种情况)

难点: 正则表达式的确定; 再次混淆的逻辑转换
'''

# 除去字典的 code.js 文件目录 和 解混淆后的文件存放目录, 根据自身情况修改 "path"
file_code_path = "./codejs/" + code_version + "/origin/code.js"
file_decode_path = "./codejs/" + code_version + "/output/code_decode.js"
code_file = open(file_code_path, "r")
decode_file = open(file_decode_path, "w")

'''
三个正则表达式, 第一个和第二个几乎一样, 不同在于第一个是为了找到一行所有匹配的子串, 而第二个对找到的子串进一步划分
匹配该项的例子: $d[4837]
第三个是局部混淆, 在某些函数内部还会进一步混淆, 但特征比较明显:
即混淆点都会放在函数的开头, 即用 
function.*\n\s+\$\w = \$\w = \$\w.*\n\s+\$\w = \$\w = \$\w.*\n\s+\$\w = \$\w = \$\w.*\n
就能匹配到所有的混淆点和对应的函数名, 而且数量固定是 3 个
匹配该项的例子: $2 = $s = $U
'''
pattern = re.compile(r"\$\w\[[0-9]+]")
pattern2 = r"\$(\w)\[([0-9]+)]"
pattern3 = r"\$(\w) = \$(\w) = \$(\w)"

# 等价左括号的个数, 用于上面的 pattern3 局部混淆
LBracket = -1
for line in code_file:
    swap = re.search(pattern3, line)  # swap 检查当前行是否在函数内部混淆, 若检查到了则接下来两行也都是混淆
    if swap:
        LBracket = 0  # LBracket 置0, 这里为参考点
        # 读取并匹配接下来两行
        line2 = code_file.readline()
        swap2 = re.search(pattern3, line2)
        line3 = code_file.readline()
        swap3 = re.search(pattern3, line3)
        # 因为不会修改这种行, 所以直接写入到文件
        decode_file.write(line + line2 + line3)
        '''
        根据名称来"分析"原来这三行对应的语句, 举例 code.js 文件中:
        $2 = $s = $U;
        $A = $x = $u;
        $Y = $b = $K;
        则这里 swap 系列都是长度为 4 的数组, swap, swap2, swap3 的值分别为:
        '$2 = $s = $U', '2', 's', 'U'
        '$A = $x = $u', 'A', 'x', 'u'
        '$Y = $b = $K', 'Y', 'b', 'K'
        第一项是全体, 后三项是对应的去掉 $ 的名称
        所以这里用动态变量名来"模拟"这三行表达式
        '''
        names[swap[1]] = names[swap[2]] = names[swap[3]]
        names[swap2[1]] = names[swap2[2]] = names[swap2[3]]
        names[swap3[1]] = names[swap3[2]] = names[swap3[3]]

    else:
        if LBracket >= 0:  # 如果 LBracket 不小于零, 则说明还在该函数混淆的范围内, 上述 swap 系列的转换还在生效
            LBracket += line.count('{') - line.count('}')  # 遇到一个 '{' 则+1, 遇到一个 '}' 则-1
            if LBracket < 0:  # 说明该行已经脱离了函数混淆的范围, 则将一开始的对应关系复原, 并用 -1 表示不在范围内, 不用考虑混淆的事情
                LBracket = -1
                names[NAME[0][0]] = names[NAME[0][1]] = names[NAME[0][2]] = DATA[0]
                names[NAME[1][0]] = names[NAME[1][1]] = names[NAME[1][2]] = DATA[1]
                names[NAME[2][0]] = names[NAME[2][1]] = names[NAME[2][2]] = DATA[2]

        result = pattern.findall(line)  # 找到该行所有匹配的子串
        for data in result:  # 遍历所有子串
            split_data = re.search(pattern2, data)  # 对某个匹配的子串进一步划分

            matches = split_data[0]  # matches 表示该子串
            name = split_data[1]  # name 表示变量名
            index = int(split_data[2])  # index 表示数组下标
            if len(names[name][index]) < 200:  # 防止内容过长, 内容过长则不替换
                # 一般不会出现这种情况, 出现了通常是因为字典读取错了或是引用错了, 即使没错该部分应该也不是什么重要的内容
                line = line.replace(matches, names[name][index])  # 将 line 原串中 matches 子串替换为字典中的部分
        # 写入
        decode_file.write(line)

code_file.close()
decode_file.close()

# End of CodeDecode.py

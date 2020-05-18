import Layout from '../component/Layout'
import { Affix } from 'antd'
import { CalendarFilled, EyeFilled } from '@ant-design/icons'

import '../static/style/pages/detail.css'

// markdown 解析
import marked from 'marked'
import hljs from 'highlight.js'

import 'highlight.js/styles/monokai-sublime.css'

const blog = {
    title: '济南 - 千佛山尽快尽快劳动纪律卡萨丁解散',
    type: {
        key: 'notes',
        lable: '日志'
    },
    // content: '## 加密方式\n\n' +
    //     ' >比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' ```{name:"zhou,age:17"}```\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' ![狮子](https://tvax1.sinaimg.cn/large/6f8a2832gy1gdrccpw1lij21z418g7o1.jpg)\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比巴布比比巴布比比布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比巴布比比巴布比比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
    //     ' ## 解密方式在纽约\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' ## 东北往事之干活不累\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比巴布比巴布比比巴布比比比巴布比比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴巴布比比巴布比比布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
    //     '```css\n\n' +
    //     'public static void main(String[] args){\n\n' +
    //     '   System.out.println("hellow world"); \n\n' +
    //     '} \n\n' +
    //     '```\n\n'

    content: "# 机器语言\n" +
    "\n" +
    "计算机出生时就注定是个傻子只认识0/1，所以最原始的程序员让傻子执行某些操作时就直接输入0/1，在输入的0101中，有些是CPU能识别、执行的机器指令，有些是数据。\n" +
    "\n" +
    "# 汇编语言\n" +
    "\n" +
    "用机器语言虽然能运行，但编出的代码可读性差，操作繁琐，还容易出错，有时编写程序花的时间比实际运行时间多几十倍、几百倍。所以人们发明了汇编语言来简化程序。\n" +
    "\n" +
    "汇编语言用与机器语言含义相似的英文、字母、数字来取代机器指令，但不能被计算机直接识别，需要先用汇编器把汇编程序翻译成0101的机器指令再执行。这样CPU识别的东西没变化还是0/1，但可比直接写二进制方便多了。由于不同cpu有不同而指令集，所以特定的汇编语言和特定机器指令集一一对应，不可以跨平台移植。\n" +
    "\n" +
    "# 高级语言\n" +
    "\n" +
    "随着人们的尿性，程序规模越来越大，计算任务越来越复杂，用汇编写还是很累、很繁琐。随后人们发明了高级语言，比如c语言，编译器会先将c语言编译成汇编语言后当汇编程序处理.。高级语言可读性更好、耗时更少地实现同样的功能。使用高级语言，程序代码量更短，更容易阅读。\n" +
    "\n" +
    "# 跨平台\n" +
    "\n" +
    "跨平台运行不是指.c文件的运行，因为.c文件没法运行，运行的是.c最后编译出的二进制文件。假如二进制代码是10110111，不同cpu中这段代码表示的意义也不同，不同平台下,甚至.c编译出的格式都不同，比如windows下编译是hello.exe，linux下编译是hello，而mac下是hello.out，所以c语言不能跨平台运行。\n" +
    "\n" +
    "如果将linux下编写的.c在windows下重新用IDE编译成.exe再运行不就可以了？也不行，因为不同环境下c语言标准不同。例如int类型，有的平台可能用16位表示，有的则是32位，不同环境下的同一个程序，可能会存在数据溢出之类的错误。\n" +
    "\n" +
    "现实生活中，女浴室规定只允许女性进入，那怎么办？很简单，去泰国变个性再进不就好了。跨平台也是一样，CPU指令集不同，编译结果的是格式都不同，那就在各平台运行虚拟的机器，然后规定虚拟机可执行的格式，再将程序都编译成这种格式，直接在虚拟机上运行不就ok了，这是就是java采取的方式。\n" +
    "\n" +
    "JAVA语言将源代码编译成特定的class文件，然后再在不同平台的JVM上运行，JVM会将.class文件转换为平台对应的机器码再去操作硬件，以此实现跨平台，所以JAVA也被称为中间件技术语言。而JVM也具有平台无关性和语言无关性两大特点。\n" +
    "\n" +
    "# 语言无关性\n" +
    "\n" +
    "JVM在执行class文件时，完全不关心class文件是哪跑来的，就像CPU在执行指令时，也不关心指令流是哪来的，所以除了Java、还有 Kotlin、Scala 等语言都可以生成.class后运行在JVM上，所以JAVA和JVM没啥关系，实际应该叫CLASSVM。\n" +
    "\n" +
    "编译器可以把JAVA源文件编译成.class，那自然也可以编译成其他格式。对高级语言来说，可以有各种方式编译它，所以JAVA语言的编译期其实是一段不确定的过程，因为可以使用不同的编译器编译出不同的结果。\n" +
    "\n" +
    "# JAVA常见编译器\n" +
    "\n" +
    "## 前端编译器\n" +
    "\n" +
    "前端编译器将.JAVA源文件编译成.class文件。如oracle javac,Eclipse JDT中的ECJ\n" +
    "\n" +
    "## 后端编译器/即时编译器\n" +
    "\n" +
    "通过JVM内置的JIT编译器在运行时把.class文件编译成本地机器码。如Hotspot的C1,C2编译器\n" +
    "\n" +
    "## AOT编译器\n" +
    "\n" +
    "程序运行前，直接把.JAVA源文件编译成本地机器码。如GMU Compiler for the JAVA,Ecelsior JET"

}

const renderer = new marked.Renderer()

marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    }
})


const detail = ({ title, type, content }) => {

    console.log(title)

    // const { title, typeStr, content } = blog


    return (
        <Layout
            selectedKeys={['/notes']}
            main={(
                <div className="detail">
                    <div>
                        <div className="title">{title}</div>
                        <div className="detail-meta">
                            <div><CalendarFilled /> 2020-02-10</div>
                            <div><EyeFilled /> 1553</div>
                        </div>
                    </div>
                    <div className="detail-content" >
                        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                    </div>

                </div>
            )}
        />
    )
}


detail.getInitialProps = async (context) => {


    console.log(context.query.id)


    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                title: blog.title,
                type: blog.type,
                content: blog.content
            })
        }, 1000)
    })
    return await promise

}



export default detail
import Layout from '../component/Layout'
import { Breadcrumb, Affix } from 'antd'
import { CalendarFilled, EyeFilled } from '@ant-design/icons'

import '../static/style/pages/detail.css'

// markdown 解析
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'

// 博客导航
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'

const blog = {
    title: '济南 - 千佛山尽快尽快劳动纪律卡萨丁解散',
    typeStr: '相册',
    content: '## 加密方式\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比巴布比比巴布比比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比巴布比比巴布比比布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比巴布比比巴布比比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
        ' ## 解密方式在纽约\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' ## 东北往事之干活不累\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比巴布比巴布比比巴布比比比巴布比比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比巴布比比巴布比比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴巴布比比巴布比比布比比巴巴布比比巴布比比布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n'

}


export default () => {

    const { title, typeStr, content } = blog
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
        highlight: (code) => {
            return hljs.highlightAuto(code).value
        }
    })

    const contentHTML = marked(content)

    const detail = (
        <div className="detail">
            <div className="crumb">
                <Breadcrumb>
                    <Breadcrumb.Item>HOME</Breadcrumb.Item>
                    <Breadcrumb.Item>{typeStr}</Breadcrumb.Item>
                    <Breadcrumb.Item>{title}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <div className="title">{title}</div>
                <div className="detail-meta">
                    <div><CalendarFilled /> 2020-02-10</div>
                    <div><EyeFilled /> 1553</div>
                </div>
            </div>

            <div className="detail-content" >

                <Affix>
                    <div className="detail-toc">
                        <MarkNav
                            source={content}
                            ordered={false}
                        />
                    </div>
                </Affix>
                <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>
            </div>
        </div>
    )

    return (<Layout main={detail} />)
}
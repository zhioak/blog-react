import { Breadcrumb, Affix } from 'antd'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import { CalendarFilled, EyeFilled } from '@ant-design/icons'


import '../static/style/pages/detail.css'
import 'markdown-navbar/dist/navbar.css'
const { Item } = Breadcrumb;




const blog = {
    title: '济南 - 千佛山尽快尽快劳动纪律卡萨丁解散',
    typeStr: '相册',
    content: '## 加密方式\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' ## 解密方式在纽约\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' ## 东北往事之干活不累\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n' +
        ' 比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n'

}







const Detail = () => {


    const { title, typeStr, content } = blog

    return (
        <>
            <div className="detail">
                <div className="crumb">
                    <Breadcrumb>
                        <Item>
                            HOME
                    </Item>
                        <Item>
                            {typeStr}
                        </Item>
                        <Item>{title}</Item>
                    </Breadcrumb>
                </div>
                <div>
                    <div className="title">{title}</div>
                    <div className="detail-meta">
                        <div><CalendarFilled /> 2020-02-10</div>
                        <div><EyeFilled /> 1553</div>
                    </div>
                </div>

                <div className="detail-content">
                    <Affix>
                        <div className="detail-toc">
                            <MarkNav
                                source={content}
                                ordered={false}
                            />
                        </div>
                    </Affix>
                    <ReactMarkdown
                        source={content}
                        escapeHtml={false}
                    />
                </div>
            </div>
        </>
    )

}

export default Detail
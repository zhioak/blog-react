
import { Breadcrumb, Result, Button } from 'antd'
import axios from 'axios'
import marked from 'marked'
import moment from 'moment'
import hljs from 'highlight.js'
import Layout from '../component/Layout'
import { DETAIL_URL, SUCCESS_CODE, DATE_FORMAT } from '../config/common'

import { CalendarFilled, EyeFilled ,LeftOutlined,RightOutlined} from '@ant-design/icons'

import '../static/style/pages/detail.css'
import 'highlight.js/styles/monokai-sublime.css'

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


const detail = ({ error, title, content, type, typeLabel, pv, gmtCreate, prev, next }) => {
    if (error) {
        return (
            <Result
                status="warning"
                title={error.code}
                subTitle={error.info}
                extra={<Button type="primary" onClick={() => { window.history.back() }} >Go Back</Button>}
            />
        )
    }

    let backPath = `/${type}`
    let main = (
        <div className="detail">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href={backPath}>{typeLabel}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="title">{title}</div>
                <div className="detail-meta">
                    <div><CalendarFilled />{moment(gmtCreate).format(DATE_FORMAT)}</div>
                    <div><EyeFilled />{pv}</div>
                </div>
            </div>
            <div className="detail-content" >
                <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
            </div>
            <div className="detail-nav">
                {prev && <a href={`?id=${prev.id}`}><LeftOutlined />{prev.title}</a>}
                {next && <a className="nav-next" href={`?id=${next.id}`}>{next.title}<RightOutlined/></a>}
            </div>
        </div>
    )

    return (
        <Layout
            selectedKeys={[backPath]}
            main={main}
        />
    )
}



detail.getInitialProps = async (context) => {
    const id = context.query.id
    const promise = new Promise((resolve) => {
        axios(DETAIL_URL + id).then(
            (res) => {
                const { code, info, data } = res.data

                if (code != SUCCESS_CODE) {
                    resolve({ error: { code, info } })
                    return
                }
                resolve(data)
            }
        )
    })
    return await promise
}

export default detail
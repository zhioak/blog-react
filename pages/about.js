
import moment from 'moment'
import { Affix } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import apiMap from '../config/apiMap'
import Layout from '../component/Layout'
import Comment from '../component/Comment'
import { httpPost } from '../component/util/httpUtil'
import Error from '../component/Error'
import marked, { Toc } from '../component/util/marked'

import '../static/style/pages/detail.css'

/**
 * 每次新建数组 导致更新
 */
const page = { blogId: 0, key: 'about' }
const menuKeys = [page.key]
const detail = ({ error, id, title, content, gmtModified }) => {

    if (error) return (<Error error={error} />)


    let toc
    const [spinning, setSpinning] = useState(false)

    useEffect(() => {
        spinning && setSpinning(false)
    }, [id])


    let main = useMemo(() => (
        <>
            <div className="detail-content">
                <div dangerouslySetInnerHTML={{ __html: marked(content, (toc = new Toc())) }}></div>
                <div className="content-footer">
                    <div className="content-end" data-text="完"></div>

                    <div className="content-declare">
                        <ExclamationCircleOutlined className="declare-icon" />
                        <div className="declare-list">
                            <div>本文修订更新于 {moment(gmtModified).format('YYYY-MM-DD A')}</div>
                        </div>

                    </div>
                </div>
            </div>
            <Comment blogId={id} setSpinning={setSpinning} />
        </>
    ), [id])


    let sticky = useMemo(() => (
        !toc.isEmpty() &&
        <Affix offsetTop={55}>
            <div className="detail-toc">{toc.render()}</div>
        </Affix>
    ), [id])


    return (
        <Layout
            title={title}
            main={main}
            sticky={sticky}
            menuKeys={menuKeys}
            spinning={spinning}
            setSpinning={setSpinning}
        />
    )
}


detail.getInitialProps = async ({ req: request, res: response }) => {

    const promise = new Promise(
        resolve => httpPost({
            url: apiMap.detail,
            data: { id: page.blogId },
            cb: data => resolve(data),
            fcb: res => resolve({ error: res }),
            request,
            response
        })
    )
    return await promise
}
export default detail
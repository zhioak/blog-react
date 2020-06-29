
import moment from 'moment'
import Link from 'next/link'
import { Affix, Breadcrumb } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import { ExclamationCircleOutlined, CalendarFilled } from '@ant-design/icons'

import apiMap from '../config/apiMap'
import Layout from '../component/Layout'
import Comment from '../component/Comment'
import { httpPost } from '../component/util/httpUtil'
import Error, { ERROR_ENUM } from '../component/Error'
import marked, { Toc } from '../component/util/marked'

import '../static/style/pages/detail.css'

/**
 * 每次新建数组 导致更新
 */
const menuKeys = []
const detail = ({ error, id, title, content, type, menu, gmtCreate, gmtModified, prev, next }) => {

    if (error) return (<Error error={error} />)

    console.log('detail render')

    let toc
    menuKeys[0] = type.key

    const [spinning, setSpinning] = useState(false)

    useEffect(() => {
        spinning && setSpinning(false)
    }, [id])


    let banner = useMemo(() => (
        <div className="detail-header">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link href='/'><a onClick={() => setSpinning(true)}>首页</a></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href={menu.path}><a onClick={() => setSpinning(true)}>{type.name}</a></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="detail-title">{title}</div>
                <div className="detail-meta">
                    <div><CalendarFilled /> {moment(gmtCreate).format('YYYY-MM-DD')}</div>
                </div>
            </div>
        </div>
    ), [id])


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
            {
                (prev || next) &&
                <div className="detail-nav">
                    {prev ?
                        <Link href={`?id=${prev.id}`}>
                            <a data-text="PREV" onClick={() => setSpinning(true)}>
                                {prev.title}
                            </a>
                        </Link>
                        : <div></div>
                    }
                    {next &&
                        <Link href={`?id=${next.id}`}>
                            <a data-text="NEXT" onClick={() => setSpinning(true)}>
                                {next.title}
                            </a>
                        </Link>
                    }
                </div>
            }
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
            banner={banner}
            sticky={sticky}
            menuKeys={menuKeys}
            spinning={spinning}
            setSpinning={setSpinning}
        />
    )
}


detail.getInitialProps = async ({ query, req: request, res: response }) => {

    let { id } = query
    if (!id) {
        return { error: ERROR_ENUM[404] }
    }

    const promise = new Promise(
        resolve => httpPost({
            url: apiMap.detail,
            data: { id },
            cb: data => resolve(data),
            fcb: res => resolve({ error: res }),
            request,
            response
        })
    )
    return await promise
}

export default detail
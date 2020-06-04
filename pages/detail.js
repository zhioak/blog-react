
import moment from 'moment'
import Link from 'next/link'
import { Affix, Breadcrumb } from 'antd'
import { useState, useMemo, useEffect } from 'react'

import apiMap from '../config/apiMap'
import Layout from '../component/Layout'
import Tocify from '../component/Tocify.tsx'
import marked from '../component/util/marked'
import { httpPost } from '../component/util/httpUtil'
import Error, { ERROR_ENUM } from '../component/Error'

import { CalendarFilled, EyeFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'
import '../static/style/pages/detail.css'

/**
 * 每次新建数组 导致更新
 */

const menuKeys = []
const detail = ({ error, id, title, content, type, typePath, typeName, pv, gmtCreate, prev, next }) => {

    if (error) return (<Error error={error} />)

    console.log('detail render')

    menuKeys[0] = type
    const [spinning, setSpinning] = useState(false)


    useEffect(() => {
        spinning && setSpinning(false)
    }, [id])

    let tocify
    let banner = useMemo(() => (
        <div className="detail-header">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link href='/'>
                        <a onClick={() => setSpinning(true)}>首页</a>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href={`/${type}` == typePath ? typePath : `${typePath}?key=${type}`}>
                        <a onClick={() => setSpinning(true)}>{typeName}</a>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="detail-title">{title}</div>
                <div className="detail-meta">
                    <div><CalendarFilled /> {moment(gmtCreate).format('YYYY-MM-DD')}</div>
                    <div><EyeFilled /> {pv}</div>
                </div>
            </div>
        </div>
    ), [id])

    let main = useMemo(() => (
        <>
            <div className="detail-content">
                <div dangerouslySetInnerHTML={{ __html: marked(content, (tocify = new Tocify())) }}></div>
            </div>
            <div className="detail-nav">
                {prev &&
                    <Link href={`?id=${prev.id}`}>
                        <a className="nav-prev" onClick={() => setSpinning(true)}>
                            <LeftOutlined />{prev.title}</a>
                    </Link>
                }
                {next &&
                    <Link href={`?id=${next.id}`}>
                        <a className="nav-next" onClick={() => setSpinning(true)}>{next.title}
                            <RightOutlined className="end" />
                        </a>
                    </Link>
                }
            </div>
        </>
    ), [id])


    let sticky = useMemo(() => (
        tocify.tocItems.length > 0 &&
        <Affix offsetTop={55}>
            <div className="detail-toc">
                {tocify.render()}
            </div>
        </Affix>
    ), [id])


    return (
        <Layout
            menuKeys={menuKeys}
            banner={banner}
            main={main}
            sticky={sticky}
            spinning={spinning}
        />
    )
}


detail.getInitialProps = async ({ query, asPath }) => {

    console.log(asPath)

    let { id } = query
    if (!id) {
        return { error: ERROR_ENUM[404] }
    }

    const promise = new Promise(resolve => {
        setTimeout(() => {
            httpPost(
                apiMap.detail + id,
                null,
                data => {
                    data.id = id
                    resolve(data)
                },
                res => resolve({ error: res })
            )
        }, 2000)
    })
    return await promise
}

export default detail
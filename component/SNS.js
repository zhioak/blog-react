import { useState, useMemo, useEffect } from 'react'
import { Avatar, Col, Row, Tooltip, Spin } from 'antd'
import { GithubFilled, MailFilled, WechatFilled } from '@ant-design/icons'

import apiMap from '../config/apiMap'
import { httpPost } from './util/httpUtil'

import '../static/style/component/social.css'


const size = 25,
    dictKey = 'zhou_sns',
    GRID = 'grid',
    placement = "bottom",
    trigger = ['click', 'hover']


var dataMap
const Sns = ({ mode }) => {
    const [spinning, setSpinning] = useState(!dataMap)
    useEffect(() => {
        // if (!dataMap) {
        //     httpPost({
        //         url: apiMap.dictDataMap,
        //         data: { dictKey },
        //         cb: data => {
        //             dataMap = data
        //             setSpinning(false)
        //         }
        //     })
        // }
    }, [])

    const email = useMemo(() => (
        dataMap &&
            <Tooltip trigger={trigger} placement={placement} title={dataMap.email.label}  >
                <Avatar size={size} icon={<MailFilled />} className="sns-email" />
            </Tooltip>
    ), [spinning])

    const wechat = useMemo(() => (
        dataMap &&
            <Tooltip trigger={trigger} placement={placement} title={(<img src={dataMap.wechat.label} />)} overlayStyle={{ width: 200 }} >
                <Avatar size={size} icon={<WechatFilled />} className="sns-wechat" />
            </Tooltip>
    ), [spinning])

    const github = useMemo(() => (
        dataMap &&
            <Tooltip title={dataMap.github.label} placement={placement}>
                <a href={dataMap.github.label} target="_blank">
                    <Avatar size={size} icon={<GithubFilled />} className="sns-github" />
                </a>
            </Tooltip>
    ), [spinning])


    return (
        <div className='sns'>
            <Spin
                spinning={spinning}
            >
                {
                    GRID == mode ?
                        <Row className="grid" justify="end">
                            <Col xs={0} sm={0} md={0} lg={5}>{email}</Col>
                            <Col xs={0} sm={0} md={8} lg={5}>{wechat}</Col>
                            <Col xs={24} sm={24} md={8} lg={5} > {github}</Col>
                        </Row>
                        :
                        <>
                            {email}
                            {wechat}
                            {github}
                        </>
                }
            </Spin>
        </div>
    )
}

export default Sns
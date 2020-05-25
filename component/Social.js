import { GithubFilled, MailFilled, WechatFilled } from '@ant-design/icons'
import { Avatar, Col, Row, Tooltip } from 'antd'
import '../static/style/component/social.css'
import { useMemo } from 'react'


const zhou = {
    email: 'flyingnoob@qq.com',
    wechat: 'https://zhousb.cn/resource/wechatQR.png',
    github: 'https://github.com/er222er'
}

const size = 25,
    trigger = ['click', 'hover']

const GRID = 'grid'

const placement = "bottom"

const Social = ({ mode }) => {

    const email = useMemo(() => (
        <Tooltip trigger={trigger} placement={placement} title={zhou.email}  >
            <Avatar size={size} icon={<MailFilled />} className="social-email" />
        </Tooltip>
    ), [])
    const wechat = useMemo(() => (
        <Tooltip trigger={trigger} placement={placement} title={(<img src={zhou.wechat} />)} overlayStyle={{ width: 200 }} >
            <Avatar size={size} icon={<WechatFilled />} className="social-wechat" />
        </Tooltip>
    ), [])
    const github = useMemo(() => (
        <Tooltip title={zhou.github} placement={placement}>
            <a href={zhou.github} target="_blank">
                <Avatar size={size} icon={<GithubFilled />} className="social-github" />
            </a>
        </Tooltip>
    ), [])


    if (GRID == mode) {
        return (
            <Row className='social' justify="end">
                <Col xs={0} sm={0} md={0} lg={5}>
                    {email}
                </Col>
                <Col xs={0} sm={0} md={8} lg={5}>
                    {wechat}
                </Col>
                <Col xs={24} sm={24} md={8} lg={5} >
                    {github}
                </Col>
            </Row>
        )
    }

    return (
        <div className='social'>
            {email}
            {wechat}
            {github}
        </div>
    )
}

export default Social
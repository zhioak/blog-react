import { GithubFilled, MailFilled, WechatFilled } from '@ant-design/icons'
import { Avatar, Col, Row, Tooltip } from 'antd'
import '../static/style/component/social.css'


const data = {

    email: 'flyingnoob@qq.com',
    wechatQR: 'https://zhousb.cn/resource/wechatQR.png',
    github: 'https://github.com/er222er'
}

const size = 25,
    trigger = ['click', 'hover']

const placement="bottom"

const Social = () => {

    const { email, wechatQR, github } = data

    return (
        <Row className='social'>
            <Col xs={0} sm={0} md={0} lg={5}>
                <Tooltip title={email} trigger={trigger} placement={placement}>
                    <Avatar size={size} icon={<MailFilled />} className="social-email"/>
                </Tooltip>
            </Col>
            <Col xs={0} sm={0} md={8} lg={5}>
                <Tooltip trigger={trigger} title={(<img src={wechatQR} />)} placement={placement} overlayStyle={{ width: 200 }} >
                    <Avatar size={size} icon={<WechatFilled />} className="social-wechat"/>
                </Tooltip>
            </Col>
            <Col xs={24} sm={24} md={8} lg={5}>
                <Tooltip title={github} placement={placement}>
                    <a href={github} target="_blank">
                        <Avatar size={size} icon={<GithubFilled />} className="social-github"/>
                    </a>
                </Tooltip>
            </Col>
        </Row>
    )
}

export default Social
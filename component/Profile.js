import { Avatar, Tooltip } from 'antd'
import { MailFilled, GithubFilled, WechatFilled } from '@ant-design/icons'

import '../static/style/component/profile.css'


const profile = {
    name: 'zhou',
    avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2292059386,809594845&fm=26&gp=0.jpg',
    email: 'flyingnoob@qq.com',
    wechatQR: 'https://zhousb.cn/blog/wechatQR.png',
    github: 'https://github.com/er222er'
}

const size = 25,
    trigger = ['click','hover' ]

const Profile = () => {
    const { name, avatar, email, wechatQR, github } = profile


    return (
        <div className="profile">
            <div>
                <Avatar shape="square" size={128} src={avatar} />
            </div>
            <div className="name">{name}</div>
            <div className='contacts'>
                <Tooltip title={email} trigger={trigger}>
                    <Avatar size={size} icon={<MailFilled />} className="contact" />
                </Tooltip>
                <Tooltip trigger={trigger} title={(<img src={wechatQR} />)} placement="bottom" overlayStyle={{ width: 200 }} >
                    <Avatar size={size} icon={<WechatFilled />} className="contact" />
                </Tooltip>
                
                <Tooltip title={github}>
                    <a href={github} target="_blank">
                        <Avatar size={size} icon={<GithubFilled />} className="contact" />
                    </a>
                </Tooltip>
            </div>
        </div>
    )
}

export default Profile
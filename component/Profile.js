import { Avatar, Tooltip } from 'antd'
import { MailFilled, GithubFilled, WechatFilled } from '@ant-design/icons'

import '../static/style/component/profile.css'


const profile = {
    name: 'zhou',
    avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2292059386,809594845&fm=26&gp=0.jpg',
    email: 'flyingnoob@qq.com',
    wechatQR: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588935630069&di=179719079f753f776094898837506514&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3381390367%2C3810581293%26fm%3D214%26gp%3D0.jpg',
    github: 'https://github.com/er222er'
}

const size = 25,
    trigger = ['hover', 'click']

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
                <Tooltip trigger={trigger} title={(<img width='200px' src={wechatQR} />)} >
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
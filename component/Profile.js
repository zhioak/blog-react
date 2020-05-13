import { Avatar,Tooltip } from 'antd'
import { MailFilled, GithubFilled, WechatFilled } from '@ant-design/icons'

import '../static/style/component/profile.css'


const size = 25
const Profile = () => {
    return (
        <div className="profile">
            <div>
                <Avatar
                    shape="square"
                    size={128}
                    src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2292059386,809594845&fm=26&gp=0.jpg"
                />
            </div>
            <div className="name">zhou</div>
            <div className='contacts'>
                <Tooltip title="flyingnoob@qq.com">
                    <Avatar size={size} icon={<MailFilled />} className="contact" />
                </Tooltip>
                <Tooltip title={(<img width='200px' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588935630069&di=179719079f753f776094898837506514&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3381390367%2C3810581293%26fm%3D214%26gp%3D0.jpg' />)}>
                    <Avatar size={size} icon={<WechatFilled />} className="contact" />
                </Tooltip>
                <Tooltip title="https://github.com/er222er">
                    <a href="https://github.com/er222er" target="_blank">
                        <Avatar size={size} icon={<GithubFilled />} className="contact" />
                    </a>
                </Tooltip>
            </div>
        </div>
    )
}

export default Profile
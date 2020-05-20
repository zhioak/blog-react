import { Avatar, Tooltip } from 'antd'
import Social from './Social'
import { MailFilled, GithubFilled, WechatFilled } from '@ant-design/icons'

import '../static/style/component/profile.css'


const name='zhou',
    avatar= 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2292059386,809594845&fm=26&gp=0.jpg'

const Profile = () => {


    console.log('profile render')

    return (
        <div className="profile">
            <div>
                <Avatar shape="square" size={128} src={avatar} />
                <div className="name">{name}</div>
            </div>
            <Social />
        </div>
    )
}

export default Profile
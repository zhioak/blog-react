
import { Avatar, Drawer } from 'antd'
import { useMemo, useContext } from 'react'

import Menu from './Menu'
import Social from './Social'
import { layoutContext } from './Layout'

import '../static/style/component/sider.css'

const name = 'zhou',
    avatar = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2292059386,809594845&fm=26&gp=0.jpg'

const Profile = ()=>(
    <div className="profile">
        <div>
            <Avatar shape="square" size={128} src={avatar} />
            <div className="name">{name}</div>
        </div>
    </div>
)
/**
 * 小屏侧栏
 */
const Sider = ({ className, menuKeys }) => {

    console.log('sider render')

    const { siderVisible, setSiderVisible } = useContext(layoutContext)

    const menu = useMemo(() => (<Menu menuKeys={menuKeys} />), [])

    const social = useMemo(() => (<Social />), [])

    const profile = useMemo(() => (<Profile />), [])

    return (
        <Drawer
            className={className}
            placement="left"
            width={200}
            closable={false}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={() => setSiderVisible(false)}
            visible={siderVisible}
        >
            {profile}
            {menu}
            {social}
        </Drawer>
    )
}

export default Sider
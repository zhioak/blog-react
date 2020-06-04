
import { Avatar, Drawer } from 'antd'
import { useMemo, useContext } from 'react'
import Link from 'next/link'

import Menu from './Menu'
import Sns from './Sns'
import { layoutContext } from './Layout'

import '../static/style/component/sider.css'

const name = 'zhou',
    avatar = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2292059386,809594845&fm=26&gp=0.jpg'

const Profile = () => (
    <div className="profile">
        <div>
            <Link href="/">
                <a>
                    <Avatar shape="square" size={128} src={avatar} />
                </a>
            </Link>
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

    const closeSider = () => { setSiderVisible(false) }

    const menu = useMemo(() => (<Menu menuKeys={menuKeys} closeSider={closeSider} />), [menuKeys])

    const sns = useMemo(() => (<Sns />), [])

    const profile = useMemo(() => (<Profile />), [])

    return (
        <Drawer
            className={className}
            placement="left"
            width={225}
            closable={false}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={closeSider}
            visible={siderVisible}
        >
            {profile}
            {menu}
            {sns}
        </Drawer>
    )
}

export default Sider
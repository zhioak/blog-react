
import { useMemo } from 'react'
import { Avatar, Drawer } from 'antd'

import Sns from './Sns'
import Menu from './Menu'

import '../static/style/component/sider.css'

const name = 'zhioak',
    avatar = 'https://s.gravatar.com/avatar/f4ca98d8768ec3ac3e761335e3f94d1d?s=458&r=g'

/**
 * 小屏侧栏
 */
const Sider = ({ className, menuKeys, visible, onClose, openSpin }) => {

    const menu = useMemo(() => (
        <div>
            <Menu
                menuKeys={menuKeys}
                closeSider={onClose}
                openSpin={openSpin}
            />
        </div>
    ), [menuKeys, openSpin])

    const sns = useMemo(() => (<Sns />), [])

    const profile = useMemo(() => (
        <div className="profile">
            <Avatar shape="square" size={128} src={avatar} />
            <div className="name">{name}</div>
        </div>
    ), [])

    return (
        <Drawer
            className={className}
            placement="left"
            width={225}
            closable={false}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={onClose}
            visible={visible}
        >
            {profile}
            {menu}
            <div className="sider-footer">{sns}</div>
        </Drawer>
    )
}

export default Sider
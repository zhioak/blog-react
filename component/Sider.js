
import { Drawer } from 'antd'
import { useMemo, useContext } from 'react'

import Menu from '../component/Menu'
import Profile from '../component/Profile'

import { siderContext } from './Layout'

/**
 * 小屏侧栏
 */
const Sider = ({ className, menuKeys }) => {

    console.log('sider render')

    const { siderVisible, setSiderVisible } = useContext(siderContext)

    const menu = useMemo(() => (<Menu selectedKeys={menuKeys} />), [])
    const profile = useMemo(() => (<Profile />), [])

    return (
        <Drawer
            className={className}
            placement="left"
            width={200}
            closable={false}
            maskStyle={{backgroundColor:'transparent'}}
            onClose={() => setSiderVisible(false)}
            visible={siderVisible}
        >
            {profile}
            {menu}
        </Drawer>
    )
}

export default Sider
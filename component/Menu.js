import * as icons from '@ant-design/icons'
import { Menu, Spin } from 'antd'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import apiMap from '../config/apiMap'
import { httpPost } from './util/httpUtil'
import localUtil from './util/localUtil'




const { SubMenu, Item } = Menu
const menus = list => (
    list.map(({ key, path, type, icon, name, childList }) => (
        0 === type ?
            (<SubMenu key={key} title={name} icon={React.createElement(icons[icon])}>{menus(childList)}</SubMenu>)
            :
            (<Item key={key} path={path} icon={React.createElement(icons[icon])} >{name}</Item>)
    ))
)

var menuList
export default ({ menuKeys, mode = "inline", closeSider }) => {

    console.log('menu render')
    const [spinning, setSpinning] = useState(!menuList)
    const [selectedKeys, setSelectedKeys] = useState(menuKeys)


    useEffect(() => {
        if (!(menuList = localUtil.getObj('menuList'))) {
            httpPost({
                url: apiMap.menuList,
                cb: data => {
                    localUtil.setObj('menuList', menuList = data)
                    setSpinning(false)
                }
            })
        }
    }, [])

    const handleClick = ({ item, key }) => {

        if (!selectedKeys || !selectedKeys.includes(key)) {
            let { path } = item.props

            Router.route != path.substr(0, path.indexOf('?')) ? setSpinning(true) : closeSider && closeSider()
            setSelectedKeys([key])
            Router.push(path)
        }
    }

    return (
        <Spin spinning={spinning}>
            {
                menuList &&
                <Menu
                    mode={mode}
                    onClick={handleClick}
                    selectedKeys={selectedKeys}
                    style={{ border: 'none' }}
                >
                    {menus(menuList)}
                </Menu>
            }
        </Spin>
    )
}



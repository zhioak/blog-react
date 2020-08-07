import Router from 'next/router'
import { Menu, Spin } from 'antd'
import * as icons from '@ant-design/icons'
import { useEffect, useState } from 'react'

import apiMap from '../config/apiMap'
import localUtil from './util/localUtil'
import { httpPost } from './util/httpUtil'


const { SubMenu, Item } = Menu
const menus = list => (
    list.map(({ key, path, type, icon, name, childList }) => {
        icon = icons[icon] ? icons[icon] : icons['CoffeeOutlined']
        return (0 === type ?
            <SubMenu key={key} title={name} icon={React.createElement(icon)}>{menus(childList)}</SubMenu> :
            <Item key={key} path={path} icon={React.createElement(icon)} >{name}</Item>
        )
    })
)

var menuList
const localKey = 'menuList'
export default ({ menuKeys, mode = 'inline', closeSider, openSpin }) => {

    const [loading, setLoading] = useState(!menuList)
    const [selectedKeys, setSelectedKeys] = useState(menuKeys)

    useEffect(() => {
        (menuList = localUtil.getObj(localKey)) ?
            loading && setLoading(false) :
            httpPost({
                url: apiMap.menuList,
                cb: data => {
                    localUtil.setObj(localKey, menuList = data)
                    loading && setLoading(false)
                }
            })
    }, [])

    const handleClick = ({ item, key }) => {
        
        if (selectedKeys && selectedKeys.includes(key)) return

        let { path } = item.props
        path.startsWith(Router.route) ? closeSider && closeSider() : openSpin()
        setSelectedKeys([key])
        Router.push(path)
    }

    return (
        <Spin spinning={loading}>
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



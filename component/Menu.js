import Router from 'next/router'
import { Menu, Spin } from 'antd'
import { useState, useEffect } from 'react'

import apiMap from '../config/apiMap'
import { httpPost } from './util/httpUtil'

import * as icons from '@ant-design/icons'



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
        if (!menuList) {
            httpPost(
                apiMap.menuList,
                null,
                data => {
                    menuList = data
                    setSpinning(false)
                }
            )
        }
    }, [])




    // 默认使用key作为跳转路径,
    // pathname存在时则作为跳转页面，key变为参数传递
    const handleClick = ({ item, key }) => {

        if (!selectedKeys || !selectedKeys.includes(key)) {

            let { path: pathname } = item.props

            pathname != Router.route ? setSpinning(true) : closeSider && closeSider()
            setSelectedKeys([key])

            let query = `/${key}` == pathname ? null : { key }
            Router.push({ pathname, query })
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



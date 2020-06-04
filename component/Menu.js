import Router from 'next/router'
import { useState, useEffect } from 'react'
import { Menu, Spin } from 'antd'
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
    const [spinning, setSpinning] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(menuKeys)


    // 默认使用key作为跳转路径,
    // pathname存在时则作为跳转页面，key变为参数传递
    if (!menuList) {
        menuList = [
            {
                key: ' ',
                name: '首页',
                type: 1,
                icon: 'HomeOutlined',
                path: '/ '
            },
            {
                key: 'notes',
                name: '日志',
                type: 1,
                icon: 'ReadOutlined',
                path: '/list'
            },
            {
                key: 'album',
                name: '相册',
                type: 1,
                icon: 'PictureOutlined',
                path: '/album'
            },
            {
                key: 'java',
                name: 'JAVA',
                type: 1,
                icon: 'CoffeeOutlined',
                path: '/list'
            }, {
                key: 'about',
                name: '关于',
                type: 1,
                icon: 'UserOutlined',
                path: '/ablout'
            }
        ]
    }

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
            <Menu
                mode={mode}
                onClick={handleClick}
                selectedKeys={selectedKeys}
                style={{ border: 'none' }}
            >
                {menus(menuList)}
            </Menu>
        </Spin>
    )
}



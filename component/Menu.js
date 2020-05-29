import Router from 'next/router'
import { useState, useEffect } from 'react'
import { Menu, Spin } from 'antd'
import * as icons from '@ant-design/icons'


var menus

export default ({ menuKeys, mode = "inline", closeSider }) => {

    console.log('menu render')
    const [spinning, setSpinning] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(menuKeys)


    // 默认使用key作为跳转路径,
    // pathname存在时则作为跳转页面，key变为参数传递
    if (!menus) {
        menus = [
            {
                key: ' ',
                name: '首页',
                icon: 'HomeOutlined',
                path: '/ '
            },
            {
                key: 'notes',
                name: '日志',
                icon: 'ReadOutlined',
                path: '/list'
            },
            {
                key: 'album',
                name: '相册',
                icon: 'PictureOutlined',
                path: '/album'
            },
            {
                key: 'java',
                name: 'JAVA',
                icon: 'CoffeeOutlined',
                path: '/list'
            }, {
                key: 'about',
                name: '关于',
                icon: 'UserOutlined',
                path: '/ablout'
            },
        ]
        console.log('menu init')
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
                {
                    menus.map(({ key, path, icon, name }) => (
                        <Menu.Item
                            key={key}
                            path={path}
                            icon={React.createElement(icons[icon])}
                        >
                            {name}
                        </Menu.Item>
                    ))
                }
            </Menu>
        </Spin>
    )
}
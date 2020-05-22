import { Menu, Spin } from 'antd'
import Router from 'next/router'
import { useState } from 'react'
import { HomeOutlined, PictureOutlined, ReadOutlined, CoffeeOutlined, UserOutlined } from '@ant-design/icons'

const { Item } = Menu

export default ({ menuKeys, mode = "vertical", closeSider }) => {

    console.log('menu render')

    const [spinning, setSpinning] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(menuKeys)


    const handleClick = ({ item, key }) => {

        if (!selectedKeys || !selectedKeys.includes(key)) {

            let { pathname = key } = item.props

            pathname != Router.route ? setSpinning(true) : closeSider()
            setSelectedKeys([key])

            let query = pathname == key ? null : { key }
            Router.push({ pathname, query })
        }
    }

    return (
        <Spin spinning={spinning}>
            <Menu
                mode={mode}
                onClick={handleClick}
                selectedKeys={selectedKeys}
                style={{ border: "none" }}
            >
                <Item key="/" icon={<HomeOutlined />}>首页</Item>
                <Item key="notes" pathname="/list" icon={<ReadOutlined />}>日志</Item>
                <Item key="/album" icon={<PictureOutlined />} >相册</Item>
                <Item key="java" pathname="/list" icon={<CoffeeOutlined />}>JAVA</Item>
                <Item key="/about" icon={<UserOutlined />} disabled >关于</Item>
            </Menu>
        </Spin>
    )
}
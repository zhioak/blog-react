import { Menu, Spin } from 'antd'
import Router from 'next/router'
import { useState } from 'react'
import { HomeOutlined, PictureOutlined, ReadOutlined, CoffeeOutlined, UserOutlined } from '@ant-design/icons'

const { Item } = Menu






export default ({ menuKeys, mode = "vertical" }) => {

    console.log('menu render')

    const [spinning, setSpinning] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(menuKeys)


    const handleClick = ({ item, key }) => {

        if (!selectedKeys || !selectedKeys.includes(key)) {
            setSpinning(true)
            setSelectedKeys([key])

            let page = item.props.page
            Router.push({
                pathname: page ? page : key,
                query: { key: key }
            }, page ? page + '/' + key : key)
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
                <Item key="notes" page="/list" icon={<ReadOutlined />}>日志</Item>
                <Item key="/album" icon={<PictureOutlined />} >相册</Item>
                <Item key="java" page="/list" icon={<CoffeeOutlined />}>JAVA</Item>
                <Item key="/about" icon={<UserOutlined />} disabled >关于</Item>
            </Menu>
        </Spin>
    )
}
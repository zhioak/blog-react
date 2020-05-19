import { Menu, Spin } from 'antd'
import Router from 'next/router'
import { useState } from 'react'
import { HomeOutlined, PictureOutlined, ReadOutlined, CoffeeOutlined, UserOutlined } from '@ant-design/icons'

import { ICON_LOAD } from '../config/common'

const { Item } = Menu


export default ({ selectedKeys }) => {

    const [spinning, setSpinning] = useState(false)

    const handleClick = ({ key }) => {

        if (!selectedKeys.includes(key)) {
            setSpinning(true)
            Router.push(key)
        }

    }

    return (
        <Spin indicator={ICON_LOAD} spinning={spinning}>
            <Menu
                onClick={handleClick}
                mode="inline"
                selectedKeys={selectedKeys}
                style={{ border: "none" }}
            >
                <Item key="/" icon={<HomeOutlined />}>首页</Item>
                <Item key="/notes" icon={<ReadOutlined />}>日志</Item>
                <Item key="/album" icon={<PictureOutlined />} >相册</Item>
                <Item key="/java" icon={<CoffeeOutlined />} disabled>AVA</Item>
                <Item key="/about" icon={<UserOutlined />} disabled >关于</Item>
            </Menu>
        </Spin>
    )
}
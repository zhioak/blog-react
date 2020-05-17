import { Menu } from 'antd'
import Router from 'next/router'
import { HomeOutlined, PictureOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons'

const { Item } = Menu


const handleClick = ({ key }) => {
    Router.push(key)
}

export default ({ selectedKeys }) => {
    
    console.log('menu render')

    return (
        <Menu
            onClick={handleClick}
            mode="inline"
            selectedKeys={selectedKeys}
            style={{ border: "none" }}
        >
            <Item key="/" icon={<HomeOutlined />}> 首页</Item>
            <Item key="/notes" icon={<ReadOutlined />}> 日志</Item>
            <Item key="/album" icon={<PictureOutlined />} > 相册</Item>
            <Item key="/about" icon={<UserOutlined />} disabled > 关于</Item>
        </Menu>
    )
}
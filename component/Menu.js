import { Menu } from 'antd'
import Router from 'next/router'
import { PictureOutlined, ReadOutlined } from '@ant-design/icons'

const { Item } = Menu


const handleClick = ({ key }) => {

    console.log(key)
    Router.push(`/${key}`)
}

export default () => {
    return (
        <Menu
            onClick={handleClick}
            mode="inline"
            style={{ border: "none" }}
        >
            <Item key="notes" icon={<ReadOutlined />}>日志</Item>
            <Item key="album" icon={<PictureOutlined />} > 相册</Item>
        </Menu>
    )
}
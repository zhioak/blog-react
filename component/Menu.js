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
        <>
            <Menu
                onClick={handleClick}
                mode="inline"
                style={{ border: "none" }}
            >
                <Item key="list?type=1" icon={<ReadOutlined />}>
                    日志
                </Item>
                <Item key="list?type=2" icon={<PictureOutlined />} >
                    相册
                </Item>
            </Menu>
        </>
    )
}
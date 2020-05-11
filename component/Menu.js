import { Menu } from 'antd';

import { PictureOutlined, ReadOutlined } from '@ant-design/icons';


const { SubMenu, ItemGroup, Item } = Menu


const handleClick = e => {
    console.log('click ', e)
}

const Sider = () => {
    return (
        <>
            <Menu
                onClick={handleClick}
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                style={{ border: "none" }}
            >
                <Item
                    key="5"
                    icon={<ReadOutlined />}
                    disabled={true}
                >
                    日志
                </Item>
                <Item
                    key="6"
                    icon={<PictureOutlined />}
                >
                    相册
                </Item>
            </Menu>
        </>
    )
}

export default Sider
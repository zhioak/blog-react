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
            >
                <SubMenu
                    key="sub2"
                    icon={<ReadOutlined />}
                    title="日志"
                    disabled={true}
                >
                    <Item key="5">自己跳</Item>
                    <Item key="6">梦境</Item>
                </SubMenu>
                <SubMenu
                    key="phont"
                    icon={<PictureOutlined />}
                    title="相册"
                >
                    <ItemGroup key="g1" title="2018">
                        <Item key="1000">济南 - 千佛山</Item>
                        <Item key="1002">济南 - 泰山</Item>
                    </ItemGroup>

                    <ItemGroup key="g2" title="2019">
                        <Item key="1003">蓟县 - 盘山</Item>
                        <Item key="1004">蓟县 - 滑雪场</Item>
                    </ItemGroup>
                </SubMenu>

            </Menu>
        </>
    )
}

export default Sider
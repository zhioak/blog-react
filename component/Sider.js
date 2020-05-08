import { Menu } from 'antd'
import Blogger from './Blogger'
import { PictureOutlined, ReadOutlined } from '@ant-design/icons'

const { SubMenu } = Menu

const handleClick = e => {
    console.log('click ', e);
}

const Sider = () => {
    return (
        <>
        
        <Blogger />
            <Menu
                onClick={handleClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >

                <SubMenu
                    key="sub1"
                    icon={<PictureOutlined />}
                    title="PHOTO"
                >
                    <Menu.ItemGroup key="g1" title="2018">
                        <Menu.Item key="1">济南 - 千佛山</Menu.Item>
                        <Menu.Item key="2">济南 - 泰山</Menu.Item>
                    </Menu.ItemGroup>

                    <Menu.ItemGroup key="g2" title="2019">
                        <Menu.Item key="3">蓟县 - 盘山</Menu.Item>
                        <Menu.Item key="4">蓟县 - 滑雪场</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

                <SubMenu
                    key="sub2"
                    icon={<ReadOutlined />}
                    title="STORY"
                >
                    <Menu.Item key="5">自己跳</Menu.Item>
                    <Menu.Item key="6">梦境</Menu.Item>
                </SubMenu>

            </Menu>
        </>
    )
}



export default Sider
import { Row, Col, Affix, BackTop, Drawer } from 'antd'
import { useState } from 'react'
import Profile from '../component/Profile'
import Menu from '../component/Menu'
import Footer from '../component/Footer'

import '../static/style/component/layout.css'

// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600

export default ({ main,selectedKeys }) => {

    
    console.log('layout render')


    const [drawerVisible, setDrawerVisible] = useState(false)

    const sider = (
        <>
            <Profile />
            <Menu 
                selectedKeys={selectedKeys}
            />
        </>
    )

    const drawerTrigger = (
        <div onClick={() => setDrawerVisible(!drawerVisible)} className={`drawer-tigger`}>
            <i className="drawer-tigger-icon"></i>
        </div>
    )

    return (
        <>
            <Row id="react-content">
                <Col xs={0} sm={0} md={6} lg={5} xl={4} xxl={3}>
                    <Affix >
                        <div className="zsider">
                            {sider}
                        </div>
                    </Affix>
                </Col>
                <Col xs={24} sm={24} md={18} lg={19} xl={20} xxl={21} className={`zmain ${drawerVisible ? 'drawer-open' : ''}`}>
                    {main}
                    <Footer />
                    <BackTop />
                </Col>
            </Row>

            <Drawer
                className="zdrawer"
                placement="left"
                width={200}
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                handler={drawerTrigger}
            >
                {sider}
            </Drawer>
        </>
    )
}
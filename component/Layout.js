import { Row, Col, Affix, BackTop, Drawer } from 'antd'
import { useState, useMemo, createContext } from 'react'

import Profile from '../component/Profile'
import Sider from '../component/Sider'
import Menu from '../component/Menu'
import Footer from '../component/Footer'

import '../static/style/component/layout.css'

// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600

export const siderVisibleContext = createContext()

export default ({ main, selectedKeys }) => {

    const [siderVisible, setSiderVisible] = useState(false)

    console.log('layout render')


    const profile = useMemo(() => (<Profile />), [])

    const menu = useMemo(() => (<Menu selectedKeys={selectedKeys} />), [selectedKeys])

    const footer = useMemo(() => (<Footer />), [])

    return (
        <>
            <Row id="react-content">
                <Col xs={0} sm={0} md={6} lg={5} xl={4} xxl={3}>
                    <Affix >
                        <siderVisibleContext.Provider value={{ siderVisible, setSiderVisible }}>
                            <Sider
                                render={(
                                    <>
                                        {profile}
                                        {menu}
                                    </>
                                )}
                            />
                        </siderVisibleContext.Provider>
                    </Affix>
                </Col>
                <Col xs={24} sm={24} md={18} lg={19} xl={20} xxl={21} className={`zmain ${siderVisible ? 'drawer-open' : ''}`}>
                    {main}
                    {footer}
                    <BackTop />
                </Col>
            </Row>
        </>
    )
}
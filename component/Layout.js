import { Row, Col, BackTop, Spin } from 'antd'
import { useState, useMemo } from 'react'
import Head from './Head'
import Header from './Header'
import Sider from './Sider'
import Footer from './Footer'

import { LoadingOutlined } from '@ant-design/icons'

import '../static/style/component/layout.css'
// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} />)

/**
 * 公用布局
 */
const Layout = ({ title, banner, main, sticky, menuKeys, spinning = false, setSpinning = () => console.log('empty setSpinning') }) => {

    const [siderVisible, setSiderVisible] = useState(false)

    const head = useMemo(() => (<Head title={title} />), [title])
    const header = useMemo(() => (
        <Header
            className="lose-retinue"
            menuKeys={menuKeys}
            setSpinning={setSpinning}
            setSiderVisible={setSiderVisible}
        />
    ), [menuKeys, setSpinning])

    const sider = useMemo(() => (
        <Sider
            className="sider"
            menuKeys={menuKeys}
            setSpinning={setSpinning}
            siderVisible={siderVisible}
            setSiderVisible={setSiderVisible}
        />
    ), [siderVisible, menuKeys, setSpinning])

    const topstory = useMemo(() => (
        <div id="topstory">
            <Row>
                {main && sticky ?
                    <>
                        <Col id="main" xs={24} sm={24} md={24} lg={18}>
                            {main}
                        </Col>
                        <Col id="sticky" xs={0} sm={0} md={0} lg={6}>
                            {sticky}
                        </Col>
                    </>
                    :
                    <Col id="main" xs={24} sm={24} md={24}>
                        {main}
                    </Col>
                }
            </Row>
        </div>
    ), [main, sticky])

    const footer = useMemo(() => (<Footer />), [])

    const backTop = useMemo(() => (
        <BackTop >
            <div className="backTop">
                <svg t="1592182843875" className="icon" viewBox="0 0 1752 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1150">
                    <path d="M876.173472 463.203709L359.815239 979.415913A146.028912 146.028912 0 1 1 153.330358 772.931031L772.931031 153.330358a146.028912 146.028912 0 0 1 206.484882 0l619.600674 619.600673a146.028912 146.028912 0 1 1-206.484882 206.484882L876.173472 463.203709z" p-id="1151" ></path>
                </svg>
            </div>
        </BackTop>
    ), [])

    return (
        <>   <Spin spinning={spinning} className="spin-full">
            {head}
            <div id="root" className={`${siderVisible ? 'root-lose' : ''}`}>
                {header}
                    <div className="lose-retinue">
                        {banner}
                        {topstory}
                        {footer}
                        {!spinning && backTop}
                    </div>
            </div>
            {sider}
                </Spin>
        </>
    )
}

export default Layout
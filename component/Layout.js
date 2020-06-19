import { Row, Col, Affix, BackTop, Spin } from 'antd'
import { useState, useMemo, createContext } from 'react'
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


export const layoutContext = createContext()

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} />)



/**
 * 公用布局
 */
const Layout = ({ banner, main, sticky, menuKeys, spinning = false }) => {

    const [siderVisible, setSiderVisible] = useState(false)

    const header = useMemo(() => (
        <layoutContext.Provider value={{ setSiderVisible }}>
            <Header className="lose-retinue" menuKeys={menuKeys} />
        </layoutContext.Provider>
    ), [menuKeys])

    const sider = useMemo(() => (
        <layoutContext.Provider value={{ siderVisible, setSiderVisible }}>
            <Sider
                className="sider"
                menuKeys={menuKeys}
            />
        </layoutContext.Provider>
    ), [siderVisible, menuKeys])

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
        <>
            <div id="root" className={`${siderVisible ? 'root-lose' : ''}`}>
                <Affix offsetTop={0}>
                    {header}
                </Affix>
                <Spin spinning={spinning} className="spin-full">
                    <div className="lose-retinue">
                        {banner}
                        {topstory}
                        {footer}
                        {!spinning && backTop}
                    </div>
                </Spin>
            </div>
            {sider}
        </>
    )
}

export default Layout
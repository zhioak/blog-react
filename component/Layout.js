import { Row, Col, BackTop, Spin } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import Head from './Head'
import Header from './Header'
import Sider from './Sider'
import Footer from './Footer'
import {modifyVars} from './util/themeUtil'

import { LoadingOutlined } from '@ant-design/icons'

import '../static/style/component/layout.css'


Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} />)

// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600
/**
 * 公用布局
 * 
 * @param {ReactNode} banner 头部内容
 * @param {ReactNode} main 主内容
 * @param {string[]} menuKeys 菜单选择的key数组
 * @param {string} title 标题
 * @param {ReactNode} sticky 告示栏内容
 * @param {boolean} spinning 全局加载
 * @param {function} setSpinning 设置全局加载
 */
const Layout = ({
    banner,
    main,
    menuKeys,
    title,
    sticky,
    spinning = false,
    setSpinning = () => console.log('empty setSpinning') }) => {

    const [siderVisible, setSiderVisible] = useState(false)
    const openSider = () => setSiderVisible(true),
        closeSider = () => setSiderVisible(false),
        openSpin = () => setSpinning(true)

    useEffect(() => {

        // 禁止移动端滑动
        document.body.style.overflow = spinning ? 'hidden' : 'visible'

        return () => document.body.style.overflow = 'visible'
    }, [spinning])

    const head = useMemo(() => (<Head title={title} />), [title])

    const header = useMemo(() => (
        <Header
            className="lose-retinue"
            menuKeys={menuKeys}
            openSpin={openSpin}
            openSider={openSider}
        />
    ), [menuKeys, setSpinning])

    const sider = useMemo(() => (
        <Sider
            className="sider"
            menuKeys={menuKeys}
            openSpin={openSpin}
            onClose={closeSider}
            visible={siderVisible}
        />
    ), [siderVisible, menuKeys, setSpinning])

    const topstory = useMemo(() => (
        <div id="topstory">
            <Row>
                {main && sticky ?
                    <>
                        <Col id="main" xs={24} sm={24} md={24} lg={18}>{main}</Col>
                        <Col id="sticky" xs={0} sm={0} md={0} lg={6}>{sticky}</Col>
                    </>
                    :
                    <Col id="main" xs={24} sm={24} md={24}>{main}</Col>
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
            {head}
            <div id="root" className={`${siderVisible && 'lose'}`}>
                <Spin spinning={spinning} className="spin-full">
                    {header}
                    <button onClick={()=>{
                        console.log('change')
                        modifyVars({'@primary-color':'blue'})
                    }}>
                        Change
                    </button>
                    <div className="lose-retinue">
                        {banner}
                        {topstory}
                        {footer}
                        {!spinning && backTop}
                    </div>
                    {sider}
                </Spin>
            </div>
        </>
    )
}

export default Layout
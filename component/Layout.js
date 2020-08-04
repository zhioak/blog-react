import { Row, Col, BackTop, Spin } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import Head from './Head'
import Header from './Header'
import Sider from './Sider'
import Footer from './Footer'
import localUtil from './util/localUtil'
import { themeEnum, modifyTheme } from './util/themeUtil'

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

const themeState = {
    localKey: 'current-theme',
    isModify: false
}
const Layout = ({
    banner,
    main,
    menuKeys,
    title,
    sticky,
    spinning = false,
    setSpinning = () => console.log('empty setSpinning') }) => {

    const [siderVisible, setSiderVisible] = useState(false)
    const [theme, setTheme] = useState(themeEnum.default)
    const openSider = () => setSiderVisible(true),
        closeSider = () => setSiderVisible(false),
        openSpin = () => setSpinning(true)

    useEffect(() => {

        // 使用缓存主题
        let localTheme = localUtil.get(themeState.localKey)
        if (localTheme && localTheme != themeEnum.default) {
            modifyTheme(localTheme)
            setTheme(localTheme)
        }
    }, [])

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

    const auxGroup = useMemo(() => (
        <div className="aux-group">

            <BackTop >
                <div className="aux-item backtop">
                    <svg t="1592182843875" viewBox="0 0 1752 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1150">
                        <path d="M876.173472 463.203709L359.815239 979.415913A146.028912 146.028912 0 1 1 153.330358 772.931031L772.931031 153.330358a146.028912 146.028912 0 0 1 206.484882 0l619.600674 619.600673a146.028912 146.028912 0 1 1-206.484882 206.484882L876.173472 463.203709z"></path>
                    </svg>
                </div>
            </BackTop>
            <div className="aux-item theme-change" onClick={() => {

                if (themeState.isModify) return
                themeState.isModify = true
                let tagetTheme = theme === themeEnum.default ? themeEnum.dark : themeEnum.default
                modifyTheme(tagetTheme, () => {
                    setTheme(tagetTheme)
                    localUtil.set(themeState.localKey, tagetTheme)
                    setTimeout(() => themeState.isModify = false, 300)
                })
            }}>
                {
                    theme === themeEnum.default ?
                        <svg t="1596100483773" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M524.8 938.666667h-4.266667a439.893333 439.893333 0 0 1-313.173333-134.4 446.293333 446.293333 0 0 1-11.093333-597.333334 432.213333 432.213333 0 0 1 170.666666-116.906666 42.666667 42.666667 0 0 1 45.226667 9.386666 42.666667 42.666667 0 0 1 10.24 42.666667 358.4 358.4 0 0 0 82.773333 375.893333 361.386667 361.386667 0 0 0 376.746667 82.773334 42.666667 42.666667 0 0 1 54.186667 55.04A433.493333 433.493333 0 0 1 836.266667 810.666667a438.613333 438.613333 0 0 1-311.466667 128z" p-id="8050"></path>
                        </svg>
                        :
                        <svg t="1596097160690" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M512 170.682c-11.782 0-21.312-9.562-21.312-21.342V21.344C490.688 9.562 500.22 0.016 512 0.016c11.812 0 21.344 9.546 21.344 21.328V149.34c0 11.78-9.532 21.342-21.344 21.342zM512 1023.984s0.032 0 0 0c-11.75 0-21.312-9.562-21.312-21.312v-127.994c0-11.812 9.562-21.376 21.344-21.376 11.782 0 21.312 9.562 21.312 21.376v127.994c0 11.75-9.532 21.312-21.344 21.312z" fill="#F6BB42" p-id="7523"></path><path d="M270.664 270.648c-8.344 8.328-21.844 8.328-30.156 0L149.98 180.136c-8.312-8.328-8.312-21.828 0-30.156a21.332 21.332 0 0 1 30.188 0l90.496 90.496c8.344 8.328 8.344 21.844 0 30.172zM874.052 874.022a21.332 21.332 0 0 1-30.188 0l-90.498-90.5c-8.344-8.344-8.344-21.842 0-30.154a21.332 21.332 0 0 1 30.188 0l90.498 90.498c8.312 8.312 8.312 21.812 0 30.156z" fill="#FFCE54" p-id="7524"></path><path d="M170.7 512c0 11.782-9.562 21.328-21.344 21.328H21.36C9.578 533.328 0.048 523.782 0.016 512c0-11.782 9.562-21.328 21.344-21.328h127.996c11.78 0 21.344 9.546 21.344 21.328zM1023.984 512c0 11.782-9.532 21.328-21.312 21.328h-127.994c-11.782 0-21.344-9.546-21.344-21.328s9.562-21.328 21.344-21.328h127.994c11.782 0 21.312 9.546 21.312 21.328z" fill="#F6BB42" p-id="7525"></path><path d="M270.664 753.368c8.344 8.312 8.344 21.81 0 30.154l-90.496 90.5a21.332 21.332 0 0 1-30.188 0c-8.312-8.344-8.312-21.844 0-30.156l90.528-90.498c8.312-8.344 21.812-8.344 30.156 0zM874.052 149.964c0 0.016 0 0 0 0 8.31 8.342 8.31 21.842 0 30.17l-90.53 90.512c-8.312 8.328-21.812 8.328-30.156 0-8.344-8.328-8.344-21.844 0-30.172l90.498-90.512c8.344-8.326 21.844-8.326 30.188 0.002z" fill="#FFCE54" p-id="7526"></path><path d="M512 789.302c-152.9 0-277.302-124.372-277.302-277.302 0-152.916 124.402-277.32 277.302-277.32 152.934 0 277.336 124.404 277.336 277.32 0 152.932-124.402 277.302-277.336 277.302z" fill="#FFCE54" p-id="7527"></path><path d="M512 213.338c-164.932 0-298.646 133.714-298.646 298.662 0 164.932 133.714 298.678 298.646 298.678 164.964 0 298.68-133.746 298.68-298.678 0-164.948-133.716-298.662-298.68-298.662z m181.026 479.656c-48.342 48.374-112.622 74.996-181.026 74.996-68.374 0-132.652-26.624-180.994-74.996-48.342-48.31-74.998-112.622-74.998-180.994s26.656-132.668 74.998-181.01c48.342-48.356 112.622-74.982 180.994-74.982 68.404 0 132.684 26.626 181.026 74.982 48.342 48.342 74.966 112.638 74.966 181.01 0 68.374-26.624 132.684-74.966 180.994z" p-id="7528"></path>
                        </svg>
                }
            </div>
        </div>
    ), [theme])

    return (
        <>
            {head}
            <div id="root" className={`${siderVisible && 'lose'}`}>
                <Spin spinning={spinning} className="spin-full">
                    {header}
                    <div className="lose-retinue">
                        {banner}
                        {topstory}
                        {footer}
                        {auxGroup}
                    </div>
                    {sider}
                </Spin>
            </div>
        </>
    )
}

export default Layout
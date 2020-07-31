import Link from 'next/link'
import { Row, Col } from 'antd'
import { useState, useEffect, useMemo } from 'react'

import Sns from './Sns'
import Menu from './Menu'

import '../static/style/component/header.css'

let lastTop = 0

/**
 * 公用头部
 * @param {string} className 类名
 * @param {string[]} menuKeys 菜单选择的key数组
 * @param {function} openSider 开启侧栏的方法
 * @param {function} openSpin 开启全局等待
 */
const Header = ({ className, menuKeys, openSpin, openSider }) => {

    const [pin, setPin] = useState(true)

    useEffect(() => {
        const onScroll = () => {

            let top = window.pageYOffset || document.documentElement.scrollTop
            if (window.innerWidth >= 768 || top <= 0) {
                // ios 边缘弹性
                return !pin && setPin(true)
            }
            !pin && top < lastTop && setPin(true)
            pin && top > lastTop && setPin(false)
            lastTop = top
        }
        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [pin])

    const menu = useMemo(() => (<Menu mode="horizontal" menuKeys={menuKeys} openSpin={openSpin} />), [menuKeys, openSpin])

    const sns = useMemo(() => (<Sns mode="grid" />), [])

    const siderTrigger = useMemo(() => (
        <div className="tigger-wrap">
            <div onClick={openSider} className={`sider-tigger`}>
                <i className="sider-tigger-icon"></i>
            </div>
        </div>
    ), [])

    return (
        <div id="header" className={`${!pin && 'unpin'} ${className}`}>
            <div className="header-holder">
                <Row justify="center">
                    <Col xs={16} sm={16} md={4} >
                        <Row>
                            <Col xs={12} sm={12} md={0}>{siderTrigger}</Col>
                            <Col xs={12} sm={12} md={24}>
                                <Link href="/" ><a className="logo">ZHOU</a></Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} md={16}>{menu}</Col>
                    <Col className="header-right" xs={8} sm={8} md={4} >{sns}</Col>
                </Row>
            </div>
        </div>
    )
}

export default Header

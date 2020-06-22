import Menu from './Menu'
import Link from 'next/link'
import Sns from './Sns'
import { Row, Col } from 'antd'
import { layoutContext } from './Layout'
import { useState, useEffect, useContext, useMemo } from 'react'

import '../static/style/component/header.css'

let latestTop = 0
const Header = ({ className, menuKeys }) => {

    console.log('header render')

    const [pin, setPin] = useState(true)
    const { setSiderVisible } = useContext(layoutContext)

    useEffect(() => {
        const onScroll = () => {
            let top = window.pageYOffset || document.documentElement.scrollTop
            if (pin && top > latestTop) {
                setPin(false)
            } else if (!pin && top < latestTop) {
                setPin(true)
            }
            latestTop = top
        }
        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener("scroll", onScroll);
    }, [pin])


    const menu = useMemo(() => (<Menu mode="horizontal" menuKeys={menuKeys} />), [menuKeys])

    const sns = useMemo(() => (<Sns mode="grid" />), [])

    const siderTrigger = useMemo(() => (
        <div className="tigger-wrap">
            <div onClick={() => setSiderVisible(true)} className={`sider-tigger`}>
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
                            <Col xs={12} sm={12} md={0}>
                                {siderTrigger}
                            </Col>
                            <Col xs={12} sm={12} md={24}>
                                <Link href="/" >
                                    <a className="logo">ZHOU</a>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} md={16}>
                        {menu}
                    </Col>
                    <Col className="header-right" xs={8} sm={8} md={4} >
                        {sns}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Header

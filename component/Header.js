import Menu from './Menu'
import Link from 'next/link'
import Social from './Social'
import { Row, Col } from 'antd'
import { layoutContext } from './Layout'
import { useContext, useMemo } from 'react'

import '../static/style/component/header.css'

const Header = ({ className, menuKeys }) => {

    console.log('header render')

    const { setSiderVisible } = useContext(layoutContext)

    const menu = useMemo(() => (<Menu mode="horizontal" menuKeys={menuKeys} />), [menuKeys])

    const social = useMemo(() => (<Social mode="grid" />), [])

    return (
        <div className={`header ${className}`}>
            <div className="header-holder">
                <Row justify="center">
                    <Col xs={16} sm={16} md={4} >
                        <Row>
                            <Col xs={12} sm={12} md={0}>
                                <div className="tigger-wrap">
                                    <div onClick={() => setSiderVisible(true)} className={`sider-tigger`}>
                                        <i className="sider-tigger-icon"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={24}>
                                <Link href="/" >
                                    <a className="logo">ZHOU</a>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="header-menu" xs={0} sm={0} md={16}  >
                        {menu}
                    </Col>
                    <Col className="header-right" xs={8} sm={8} md={4} >
                        {social}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Header

import { Row, Col } from 'antd'
import { useContext, useMemo } from 'react'
import { GithubOutlined } from '@ant-design/icons'

import Menu from './Menu'
import { siderContext } from './Layout'

import '../static/style/component/header.css'

const Header = ({ menuKeys }) => {

    console.log('header render')

    const { setSiderVisible } = useContext(siderContext)

    const menu = useMemo(() => (<Menu mode="horizontal" selectedKeys={menuKeys}/>), [])

    return (
        <div className="header">
            <div className="header-wrap">
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
                                <a className="logo">ZHOU</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="header-menu" xs={0} sm={0} md={16}  >
                        {menu}
                    </Col>
                    <Col className="header-right" xs={8} sm={8} md={4} >
                        <a>GitHub <GithubOutlined /></a>
                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default Header

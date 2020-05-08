import { Col, Row } from 'antd'
import Head from 'next/head'
import Sider from '../component/Sider'

// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600


const Home = () => {
  return (<>
    <Head>
      <title>zhou</title>
    </Head>

    <Row>
      <Col xs={0} sm={8} md={7} lg={5} xl={4} xxl={3}>
        <Sider />
      </Col>
      <Col xs={24} sm={16} md={17} lg={19} xl={20} xxl={21}>
        主内容
      </Col>
    </Row>
  </>)
}

export default Home
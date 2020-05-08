import { Layout } from 'antd'


import Menu from '../component/Menu'
import Blogger from '../component/Blogger'

const { Sider } = Layout

// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600

export default () => {

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
      >
        <Blogger/>
        <Menu />
      </Sider>
      <Layout>
        主内容
    </Layout>
    </Layout>
  )
}
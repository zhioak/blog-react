


import { Layout ,BackTop} from 'antd'
import Profile from '../component/Profile'
import Menu from '../component/Menu'
import Detail from '../pages/detail'
import List from '../pages/list'

import '../static/style/pages/index.css'
import Footer from '../component/Footer'


const { Sider } = Layout

// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600

const zwts = {
  right: '-35px',
  boxShadow: '6px 0 9px -3px rgba(0, 0, 0, .1)'
}

const handleCollapse = collapsed => {
  console.log(collapsed)
}

export default () => {

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
        className="zsider"
        onCollapse={handleCollapse}
        zeroWidthTriggerStyle={zwts}
      >
        <Profile />
        <Menu />
      </Sider>
      <div className="zmain">
        <List />
        <Footer />
        <BackTop/>
      </div>
    </Layout>
  )
}
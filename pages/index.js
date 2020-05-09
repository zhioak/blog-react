import { Layout } from 'antd'

import Blogger from '../component/Blogger'
import Menu from '../component/Menu'
import Detail from '../pages/detail'

const { Sider } = Layout

// xs: <576
// sm：≥576
// md: ≥768
// lg: ≥992
// xl: ≥1200
// xxl: ≥1600


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
        onCollapse={handleCollapse}
        trigger={(<div>12313</div>)}
      // zeroWidthTriggerStyle={{backgroundColor:'red'}}
      >
        <Blogger />
        <Menu />
      </Sider>
      <Layout className="zmain">
        <Detail/>
      </Layout>
    </Layout>
  )
}
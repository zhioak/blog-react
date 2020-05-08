import { Layout, Breadcrumb } from 'antd'

import Blogger from '../component/Blogger'
import Menu from '../component/Menu'
import Footer from '../component/Footer'

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
        trigger={()=>{return (<span>sdff</span>)}}
        // zeroWidthTriggerStyle={{backgroundColor:'red'}}
      >
        <Blogger />
        <Menu />
      </Sider>
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">PHOTO</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>济南 - 千佛山</Breadcrumb.Item>
        </Breadcrumb>
        <Footer/>
      </Layout>
    </Layout>
  )
}
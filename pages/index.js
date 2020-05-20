import Layout from '../component/Layout'

import Banner from '../component/Banner'

import { LineChartOutlined, RightOutlined } from '@ant-design/icons'
import '../static/style/pages/index.css'

// https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kJM2Q6uPXCAAAAAAAAAAAABkARQnAQ



const banner = (
  <Banner
    bg={'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kJM2Q6uPXCAAAAAAAAAAAABkARQnAQ'}
    title="记录生活,分享技术"
    desc={<p>用于构建用户界面的 JavaScript 库</p>}
  />
)

const index = () => (
  <Layout
    banner={banner}
    menuKeys={['/']}
  />
)

export default index
import Layout from '../component/Layout'

import Banner from '../component/Banner'
import '../static/style/pages/index.css'

const banner = (
  <Banner
    bg={'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kJM2Q6uPXCAAAAAAAAAAAABkARQnAQ'}
    title="记录生活 分享技术"
    desc={<p>编程是一门艺术，生活亦是如此</p>}
  />
)

const index = () => (
  <Layout
    banner={banner}
    menuKeys={['/']}
  />
)

export default index
import Layout from '../component/Layout'

import Banner from '../component/Banner'


const index = () => (
  <Layout
    banner={<Banner title="记录生活 分享技术" desc="编程是一门艺术，生活亦是如此"/>}
    menuKeys={['/']}
  />
)

export default index
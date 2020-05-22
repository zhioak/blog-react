import Layout from '../component/Layout'

import Banner from '../component/Banner'


const index = () => (
  <Layout
    banner={<Banner/>}
    menuKeys={['/']}
  />
)

export default index
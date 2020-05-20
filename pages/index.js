import Layout from '../component/Layout'

import { LineChartOutlined, RightOutlined } from '@ant-design/icons'
import '../static/style/pages/index.css'


const hairs = (
  <div className="hair-record">
    <div className="title"><LineChartOutlined /> 发量年记</div>
    <div className="img-row">
      <div>
        <span className="title">2016</span>
      </div>
      <div>
        <img src="https://zhousb.cn/resource/hair_2018.png" />
      </div>

      <div>
        <RightOutlined className="arrow" /><span className="title">2017</span>
      </div>
      <div>
        <img src="https://zhousb.cn/resource/hair_2018.png" />
      </div>
      <div>
        <RightOutlined className="arrow" /><span className="title">2018</span>
      </div>
      <div>
        <img src="https://zhousb.cn/resource/hair_2018.png" />
      </div>
      <div>
        <RightOutlined className="arrow" /><span className="title">2019</span>
      </div>
      <div>
        <img src="https://zhousb.cn/resource/hair_2018.png" />
      </div>

      <div>
        <RightOutlined className="arrow" /><span className="title">END</span>
      </div>
    </div>
  </div>
)


const index = () => (
  <Layout
    main={hairs}
    selectedKeys={['/']}
  />
)

export default index
import Layout from '../component/Layout'

import { RightOutlined } from '@ant-design/icons'
import '../static/style/pages/index.css'

const hairs = (
  <div className="imgs-wrap">
    <div>
      <img src="https://zhousb.cn/resource/hair_2018.png" />
    </div>
    <div>
      <RightOutlined className="arrow" /><span className="title">2016</span>
    </div>
    <div>
      <img src="https://zhousb.cn/resource/hair_2018.png" />
    </div>
    <div>
      <RightOutlined className="arrow" /><span className="title">2016</span>
    </div>
    <div>
      <img src="https://zhousb.cn/resource/hair_2018.png" />
    </div>
    <div>
      <RightOutlined className="arrow" /><span className="title">2016</span>
    </div>
    <div>
      <img src="https://zhousb.cn/resource/hair_2018.png" />
    </div>
    <div>
      <RightOutlined className="arrow" /><span className="title">2016</span>
    </div>
    <div>
    </div>
  </div>
)


export default () => (
  <Layout
    main={hairs}
  />
)
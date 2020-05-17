import { List, Skeleton } from 'antd'
import AutoList from '../component/AutoList'
import Layout from '../component/Layout'
import '../static/style/pages/list.css'

const result = {
  hasMore: true, data: [
    { url: 'https://tvax1.sinaimg.cn/large/6f8a2832gy1gdrccpw1lij21z418g7o1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://tvax1.sinaimg.cn/large/6f8a2832gy1gdrccpw1lij21z418g7o1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://tvax1.sinaimg.cn/large/6f8a2832gy1gdrccpw1lij21z418g7o1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://zhousb.cn/upload/jagsaw/1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://zhousb.cn/upload/jagsaw/1.jpg', title: '游千佛山', place: '济南' }
  ]
}

var i = 0

const
  height = 300,
  preNum = 2,
  
  getData = cb => {

    if (++i > 2) {
      result.hasMore = false
    }

    setTimeout(() => {
      cb(result)
    }, 3000)
  },


  render = item => (
    <div className="list-item">
      <div className="item-img-wrap">

        <div className="item-img"
          style={{
            backgroundImage: `url(${item.url})`
          }}
        >
          <div className="item-img-cover">
            <div className="item-img-meta">
              <div className="title">{item.title}</div>
              <div>
                <span>{item.place}</span>
                <span> · </span>
                <span>2019-05-01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  seat = (
    <List
      itemLayout="horizontal"
      dataSource={[...Array(preNum).keys()]}
      renderItem={() => (

        <List.Item className="seat">
          <div className="list-item">
            <div className="item-img-wrap">
              <Skeleton.Input active />
            </div>
          </div>
        </List.Item>
      )}
    />
  ),

  list = (
    <AutoList
      className="list"
      getData={getData}
      itemHeight={height}
      itemRender={render}
      itemSeat={seat}
    />
  )

export default () => (
  <Layout
    main={list}
    selectedKeys={['/album']}
  />
)

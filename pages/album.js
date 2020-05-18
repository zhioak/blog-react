import { List, Skeleton,Spin } from 'antd'
import { useState } from 'react'
import Router from 'next/router'

import AutoList from '../component/AutoList'
import Layout from '../component/Layout'
import { ICON_LOAD } from '../config/common'

import '../static/style/pages/album.css'

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
  preview = 2,

  getData = cb => {

    if (++i > 2) {
      result.hasMore = false
    }

    setTimeout(() => {
      cb(result)
    }, 3000)
  },

  seatRender = (
    <List
      itemLayout="horizontal"
      dataSource={[...Array(preview).keys()]}
      renderItem={() => (

        <List.Item className="seat">
          <div className="list-item">
            <div className="album-img-wrap">
              <Skeleton.Input active />
            </div>
          </div>
        </List.Item>
      )}
    />
  )

export default () => {

  const [spinning, setSpinning] = useState(false)

  const viewDetail = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
  }

  const render = item=> (
    <div className="list-item">
      <div className="album-img-wrap">
        <div className="album-img" 
          style={{
            backgroundImage: `url(${item.url})`
          }}
          onClick={() => viewDetail(item.id)}
        >
          <div className="album-cover">
            <div className="album-meta">
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
  )

  const list = (
    <Spin indicator={ICON_LOAD} spinning={spinning}>
      <AutoList
        className="list"
        getData={getData}
        itemHeight={height}
        itemRender={render}
        itemSeatRender={seatRender}
      />

    </Spin>
  )

  return (
    <Layout
      main={list}
      selectedKeys={['/album']}
    />
  )
}


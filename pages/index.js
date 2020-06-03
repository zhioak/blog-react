
import { Skeleton, Typography } from 'antd'

import moment from 'moment'
import Router from 'next/router'
import { useMemo, useState } from 'react'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import apiMap from '../config/apiMap'
import { httpPost } from '../component/util/httpUtil'

import '../static/style/pages/list.css'



const { Title, Paragraph } = Typography


const seatRender = (
  <div className="seat">
    <div className="list-item">
      <Skeleton
        title={{ width: '40%' }}
        paragraph={{ width: ['22%', '100%', '55%'] }}
        active
      />
    </div>
  </div>
)


const index = () => {

  console.log('index')

  const [spinning, setSpinning] = useState(false)

  const jump = path => {
    setSpinning(true)
    Router.push(path)
  }

  const getData = (page, cb) => httpPost(apiMap.list, { page }, data => cb(data))

  const render = ({ id, title, type, typePath, typeName, pv, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Title
        className="list-title"
        level={4}
        ellipsis={{ rows: 2 }}
        onClick={() => jump(`/detail?id=${id}`)}
      >
        {title}
      </Title>
      <div className="list-meta">
        <span
          className="list-type"
          onClick={() => jump(`/${type}` == typePath ? typePath : `${typePath}?key=${type}`)}
        >
          {typeName}
        </span>
        <span className="cut" />
        <span>{moment(gmtCreate).format('YYYY-MM-DD')}</span>
      </div>
      {
        previewImg &&
        <div className="list-img-holder" onClick={() => jump(`/detail?id=${id}`)}>
          <div className="list-img" style={{ backgroundImage: `url(${previewImg})` }}></div>
        </div>
      }
      {
        preview &&
        <Paragraph
          className="list-preview"
          ellipsis={{ rows: previewImg ? 2 : 3, expandable: false }}
          onClick={() => jump(`/detail?id=${id}`)}
        >
          {preview}
        </Paragraph>
      }
    </div>
  )

  const banner = useMemo(() => (
    <Banner
      title="记录生活 分享技术"
      desc="编程是一门艺术，生活亦是如此"
    />
  ), [])


  const list = useMemo(() => (
    <LoadMoreList
      className="list"
      cacheKey="index"
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [])


  return (
    <Layout
      spinning={spinning}
      banner={banner}
      main={list}
      menuKeys={[' ']}
    />
  )
}


export default index
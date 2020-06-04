
import moment from 'moment'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Skeleton, Typography } from 'antd'

import apiMap from '../config/apiMap'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
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

  const getData = (page, cb) => httpPost(apiMap.list, { page }, data => cb(data))

  const render = ({ id, title, type, typePath, typeName, pv, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Link href={`/detail?id=${id}`}>
        <a onClick={() => setSpinning(true)}>
          <Title
            className="list-title"
            level={4}
            ellipsis={{ rows: 2 }}
          >
            {title}
          </Title>
        </a>
      </Link>

      <div className="list-meta">
        <Link href={`/${type}` == typePath ? typePath : `${typePath}?key=${type}`}>
          <a className="list-type" onClick={() => setSpinning(true)}>
            {typeName}
          </a>
        </Link>
        <span className="cut" />
        <span>{moment(gmtCreate).format('YYYY-MM-DD')}</span>
      </div>
      {
        previewImg &&
        <Link href={`/detail?id=${id}`}>
          <a onClick={() => setSpinning(true)}>
            <div className="list-img-holder">
              <div className="list-img" style={{ backgroundImage: `url(${previewImg})` }}></div>
            </div>
          </a>
        </Link>

      }
      {
        preview &&
        <Link href={`/detail?id=${id}`}>
          <a onClick={() => setSpinning(true)}>
            <Paragraph
              className="list-preview"
              ellipsis={{ rows: previewImg ? 2 : 3, expandable: false }}
            >
              {preview}
            </Paragraph>
          </a>
        </Link>
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
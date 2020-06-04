import moment from 'moment'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Skeleton, Typography } from 'antd'


import apiMap from '../config/apiMap'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { httpPost } from '../component/util/httpUtil'
import Error, { ERROR_ENUM } from '../component/Error'

import '../static/style/pages/list.css'


const menuKeys = []
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

const list = ({ error, type, title, desc, bg }) => {

  if (error) return (<Error error={error} />)


  menuKeys[0] = type
  const [spinning, setSpinning] = useState(false)

  const getData = (page, cb) => {
    httpPost(
      apiMap.list,
      {
        page,
        'type.key': type
      },
      data => cb(data)
    )
  }

  const render = ({ id, title, preview, previewImg, gmtCreate }) => (
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
  
  const banner = useMemo(() => (bg || title || desc) && <Banner bg={bg} title={title} desc={desc} />, [type])

  const list = useMemo(() => (
    <LoadMoreList
      className="list"
      cacheKey={type}
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [type])


  return (
    <Layout
      spinning={spinning}
      banner={banner}
      main={list}
      menuKeys={menuKeys}
    />
  )
}


const pool = {}
list.getInitialProps = async ({ query }) => {

  let { type } = query
  if (!type) {
    return { error: ERROR_ENUM[404] }
  } else if (pool[type]) {
    return pool[type]
  }

  const promise = new Promise(
    resolve => {
      httpPost(
        apiMap.type,
        {
          key: type
        },
        data => {
          // next 不解析key
          data.type = type
          pool[type] = data
          resolve(data)
        },
        res => resolve({ error: res })
      )
    }
  )
  return await promise
}
export default list
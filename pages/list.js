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

const list = ({ error, listKey, title, desc, bg }) => {

  if (error) return (<Error error={error} />)

  
  menuKeys[0] = listKey
  const [spinning, setSpinning] = useState(false)

  const getData = (page, cb) => {
    httpPost(
      apiMap.list,
      { page: page++, type: listKey },
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

  const banner = useMemo(() => (
    <Banner
      bg={bg}
      title={title}
      desc={desc}
    />
  ), [listKey])


  const list = useMemo(() => (
    <LoadMoreList
      className="list"
      cacheKey={listKey}
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [listKey])


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
list.getInitialProps = async (context) => {

  let { key } = context.query
  if (!key) {
    return { error: ERROR_ENUM[404] }
  } else if (pool[key]) {
    return pool[key]
  }

  const promise = new Promise(
    resolve => {
      httpPost(
        apiMap.type + key,
        null,
        data => {
          data.listKey = key
          pool[key] = data
          resolve(data)
        },
        res => resolve({ error: res })
      )
    }
  )
  return await promise
}
export default list
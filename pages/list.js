import moment from 'moment'
import Router from 'next/router'
import { useMemo, useState } from 'react'
import { Skeleton, Typography } from 'antd'


import apiMap from '../config/apiMap'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { httpPost } from '../component/util/httpUtil'
import Error, { ERROR_ENUM } from '../component/Error'

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


const list = ({ error, listKey, title, desc, bg }) => {

  if (error) return (<Error error={error} />)

  const [spinning, setSpinning] = useState(false)
  const jump = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
  }

  const getData = (page, cb) => {
    httpPost(
      apiMap.list,
      { page: page++, type: listKey },
      data => cb(data)
    )
  }

  const render = ({ id, title, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Title
        className="list-title"
        level={4}
        ellipsis={{ rows: 2 }}
        onClick={() => jump(id)}
      >
        {title}
      </Title>
      <div className="list-meta">
        <span>{moment(gmtCreate).format('YYYY-MM-DD')}</span>
      </div>
      {
        previewImg &&
        <div className="list-img-holder" onClick={() => jump(id)}>
          <div className="list-img" style={{ backgroundImage: `url(${previewImg})` }}></div>
        </div>
      }
      {
        preview &&
        <Paragraph
          className="list-preview"
          ellipsis={{ rows: previewImg ? 2 : 3, expandable: false }}
          onClick={() => jump(id)}
        >
          {preview}
        </Paragraph>
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
      menuKeys={[listKey]}
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
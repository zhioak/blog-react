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
const { Title, Paragraph } = Typography


const menuKeys = []
const seatRender = (
  <div className="seat">
    <div className="list-item">
      <Skeleton
        active
        title={{ width: '40%' }}
        paragraph={{ width: ['22%', '100%', '55%'] }}
      />
    </div>
  </div>
)

const list = ({ error, type, title, desc, bg }) => {

  if (error) return (<Error error={error} />)


  menuKeys[0] = type
  const [spinning, setSpinning] = useState(false)

  const getData = (page, cb) => {
    httpPost({
      url: apiMap.list,
      data: { page, 'type.key': type },
      cb: data => cb(data)
    })
  }

  const render = ({ id, title, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Link href={'/detail?id=' + id}>
        <a onClick={() => setSpinning(true)}>
          <Title
            level={4}
            ellipsis={{ rows: 2 }}
            className="list-title"
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
        <Link href={'/detail?id=' + id}>
          <a onClick={() => setSpinning(true)}>
            <div className="list-img-holder">
              <div className="list-img" style={{ backgroundImage: `url(${previewImg})` }}></div>
            </div>
          </a>
        </Link>
      }
      {
        preview &&
        <Link href={'/detail?id=' + id}>
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
      cacheKey={type}
      className="list"
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
list.getInitialProps = async ({ query, req: request, res: response }) => {

  let { type } = query
  if (!type) {
    return { error: ERROR_ENUM[404] }
  } else if (pool[type]) {
    return pool[type]
  }

  const promise = new Promise(
    resolve => httpPost({
      url: apiMap.type,
      data: { key: type },
      cb: data => {
        // next 不解析key
        data.type = type
        pool[type] = data
        resolve(data)
      },
      fcb: res => resolve({ error: res }),
      request,
      response
    })
  )
  return await promise
}

export default list
import moment from 'moment'
import Link from 'next/link'
import { Skeleton } from 'antd'
import { useMemo, useState } from 'react'

import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { httpPost } from '../component/util/httpUtil'
import Error, { ERROR_ENUM } from '../component/Error'

import apiMap from '../config/apiMap'
import '../static/style/pages/list.css'


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
      cb
    })
  }

  const render = ({ id, title, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Link href={'/detail?id=' + id}>
        <a className="list-title" onClick={() => setSpinning(true)}>
          {title}
        </a>
      </Link>

      <div className="list-meta">
        <span>{moment(gmtCreate).format('YYYY-MM-DD')}</span>
      </div>
      {
        previewImg &&
        <div className="list-img-holder">
          <Link href={'/detail?id=' + id}>
            <a onClick={() => setSpinning(true)}>
              <div className="list-img" style={{ backgroundImage: `url(${previewImg})` }}></div>
            </a>
          </Link>
        </div>
      }
      {
        preview &&
        <Link href={'/detail?id=' + id}>
          <a className="list-preview" onClick={() => setSpinning(true)}>
            {preview}
          </a>
        </Link>
      }
    </div>
  )

  const banner = useMemo(() => (bg || title || desc) && <Banner bg={bg} title={title} desc={desc} />, [type])

  const list = useMemo(() => (
    <LoadMoreList
      listkey={type}
      className="list"
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [type])


  return (
    <Layout
      spinning={spinning}
      setSpinning={setSpinning}
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
  } else if (!request && pool[type]) {
    return pool[type]
  }

  const promise = new Promise(
    resolve => httpPost({
      url: apiMap.type,
      data: { key: type },
      cb: data => {
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
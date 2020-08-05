
import moment from 'moment'
import Link from 'next/link'
import { Skeleton } from 'antd'
import { useMemo, useState } from 'react'

import Error from '../component/Error'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { httpPost } from '../component/util/httpUtil'

import apiMap from '../config/apiMap'
import '../static/style/pages/list.css'

const page = { key: '/' }
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


const menuKeys = [page.key]
const index = ({ error, title, desc, bg }) => {

  if (error) return (<Error error={error} />)

  const [spinning, setSpinning] = useState(false)

  const getData = (page, cb) => {
    httpPost({
      url: apiMap.list,
      data: { page },
      cb
    })
  }

  const render = ({ id, title, type, menu, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Link href={'/detail?id=' + id}>
        <a className="list-title" onClick={() => setSpinning(true)}>
          {title}
        </a>
      </Link>

      <div className="list-meta">
        <Link href={menu.path}>
          <a className="list-type" onClick={() => setSpinning(true)}>
            {type.name}
          </a>
        </Link>
        <span className="cut" />
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
        <Link href={'/detail?id=' + id} >
          <a className={`list-preview ${!previewImg && 'line-3'}`} onClick={() => setSpinning(true)}>
            {preview}
          </a>
        </Link>
      }
    </div>
  )

  const banner = useMemo(() => (bg || title || desc) && <Banner bg={bg} title={title} desc={desc} />, [])

  const list = useMemo(() => (
    <LoadMoreList
      listkey="index"
      className="list"
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [])

  return (
    <Layout
      main={list}
      banner={banner}
      spinning={spinning}
      setSpinning={setSpinning}
      menuKeys={menuKeys}
    />
  )

}
index.getInitialProps = async ({ req: request, res: response }) => {

  if (!request && page.cache) return page.cache

  const promise = new Promise(
    resolve => httpPost({
      url: apiMap.type,
      data: { key: page.key },
      cb: data => {
        page.cache = data
        resolve(data)
      },
      fcb: res => resolve({ error: res }),
      request,
      response
    })
  )
  return await promise
}

export default index
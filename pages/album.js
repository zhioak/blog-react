
import Link from 'next/link'
import { List, Skeleton } from 'antd'
import { useState, useMemo } from 'react'

import apiMap from '../config/apiMap'
import Error from '../component/Error'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import AutoList from '../component/AutoList'
import { httpPost } from '../component/util/httpUtil'

import '../static/style/pages/album.css'


const page = { key: 'album' },
  height = 300,
  preview = 2,
  menuKeys = [page.key]

const getData = (p, cb) => httpPost({ url: apiMap.list, data: { page: p, 'type.key': page.key }, cb })

const seatRender = (
  <List
    dataSource={[...Array(preview).keys()]}
    renderItem={() => (
      <List.Item style={{ height }}>
        <div className="album-item">
          <Skeleton.Input active />
        </div>
      </List.Item>
    )}
  />
)

const album = ({ error, title, desc, bg }) => {

  if (error) return (<Error error={error} />)

  const [spinning, setSpinning] = useState(false)

  const render = ({ id, title, preview, previewImg }) => (
    <Link href={'/detail?id=' + id}>
      <a
        className="album-item done"
        onClick={() => setSpinning(true)}
      >
        <div
          className="album-img"
          style={{ backgroundImage: `url(${previewImg})` }}
        >
          <div className="album-cover">
            <div className="album-meta">
              <div className="title">{title}</div>
              <div>{preview}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )


  const banner = useMemo(() => (bg || title || desc) && <Banner bg={bg} title={title} desc={desc} />, [])

  const list = useMemo(() => (
    <AutoList
      cacheKey={page.key}
      className="list"
      getData={getData}
      itemHeight={height}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [])

  return (
    <Layout
      main={list}
      banner={banner}
      menuKeys={menuKeys}
      spinning={spinning}
      setSpinning={setSpinning}
    />
  )

}


album.getInitialProps = async ({ req: request, res: response }) => {

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

export default album


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

const getData = (p, cb) => {
  httpPost(
    apiMap.list,
    {
      page: p,
      'type.key': page.key
    },
    data => cb(data)
  )
}

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

  console.log('album render')
  const [spinning, setSpinning] = useState(false)

  const render = ({ id, title, preview, previewImg }) => (
    <Link href={`detail?id=${id}`}>
      <a onClick={() => setSpinning(true)} className="album-item done">
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
      className="list"
      getData={getData}
      itemHeight={height}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [])

  return (
    <Layout
      banner={banner}
      main={list}
      menuKeys={menuKeys}
      spinning={spinning}
    />
  )
}


album.getInitialProps = async () => {
  if (page.cache) return page.cache

  const promise = new Promise(
    resolve => {
      httpPost(
        apiMap.type,
        { key: page.key },
        data => {
          page.cache = data
          resolve(data)
        },
        res => resolve({ error: res })
      )
    }
  )
  return await promise
}


export default album

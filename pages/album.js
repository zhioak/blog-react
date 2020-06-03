import Router from 'next/router'
import { List, Skeleton } from 'antd'
import { useState, useMemo } from 'react'

import Banner from '../component/Banner'
import Layout from '../component/Layout'
import AutoList from '../component/AutoList'
import { httpPost } from '../component/util/httpUtil'
import apiMap from '../config/apiMap'

import '../static/style/pages/album.css'


const
  height = 300,
  preview = 2,
  type = 'album'

const getData = (page, cb) => {
  httpPost(
    apiMap.list,
    { page: page++, type },
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

const album = () => {

  console.log('album render')
  const [spinning, setSpinning] = useState(false)

  const jump = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
  }

  const render = ({ id, title, preview, previewImg }) => (
    <div className="album-item done">
      <div
        className="album-img"
        style={{ backgroundImage: `url(${previewImg})` }}
        onClick={() => jump(id)}
      >
        <div className="album-cover">
          <div className="album-meta">
            <div className="title">{title}</div>
            <div>
              {preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

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
      banner={<Banner />}
      main={list}
      menuKeys={['album']}
      spinning={spinning}
    />
  )
}

export default album

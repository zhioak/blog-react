import axios from 'axios'
import moment from 'moment'
import Router from 'next/router'
import { useState, useMemo } from 'react'
import { List, Skeleton, message } from 'antd'

import Banner from '../component/Banner'
import Layout from '../component/Layout'
import AutoList from '../component/AutoList'
import { LIST_URL, SUCCESS_CODE, DATE_FORMAT } from '../config/common'

import '../static/style/pages/album.css'


const
  height = 300,
  preview = 2,
  type = 'album'

const getData = (page, cb) => {
  let form = new FormData()
  form.append('page', page)
  form.append('type', type)
  axios.post(LIST_URL, form).then(
    (res) => {
      const { code, info, data } = res.data
      if (code != SUCCESS_CODE) {
        return message.warning(info)
      }
      cb(data)
    }
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

  const viewDetail = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
  }

  const render = item => (
    <div className="album-item done">
      <div
        className="album-img"
        style={{ backgroundImage: `url(${item.preview})` }}
        onClick={() => viewDetail(item.id)}
      >
        <div className="album-cover">
          <div className="album-meta">
            <div className="title">{item.title}</div>
            <div>
              <span>{item.remark}</span>
              <span> · </span>
              <span>{moment(item.gmtCreate).format(DATE_FORMAT)}</span>
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
      menuKeys={['/album']}
      spinning={spinning}
    />
  )
}

export default album

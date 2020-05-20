import axios from 'axios'
import { useState } from 'react'

import moment from 'moment'
import Router from 'next/router'
import { List, Skeleton, Spin, message } from 'antd'

import Layout from '../component/Layout'
import AutoList from '../component/AutoList'
import { ICON_LOAD, LIST_URL, SUCCESS_CODE, DATE_FORMAT } from '../config/common'

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
      <List.Item className="seat">
        <div className="list-item">
          <div className="album-img-wrap">
            <Skeleton.Input active />
          </div>
        </div>
      </List.Item>
    )}
  />
)

const album = () => {
  const [spinning, setSpinning] = useState(false)

  console.log('album render')



  const viewDetail = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
  }

  const render = item => (
    <div className="list-item">
      <div className="album-img-wrap">
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
    </div>
  )

  const list = (
    <Spin indicator={ICON_LOAD} spinning={spinning}>
      <AutoList
        className="list"
        getData={getData}
        itemHeight={height}
        itemRender={render}
        itemSeatRender={seatRender}
      />
    </Spin>
  )

  return (
    <Layout
      main={list}
      menuKeys={['/album']}
    />
  )
}

export default album

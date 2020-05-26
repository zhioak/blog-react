import Layout from '../component/Layout'
import axios from 'axios'
import { useMemo, useState } from 'react'
import { DATE_FORMAT, ERROR_ENUM, ERROR_RESULT, LIST_URL, SUCCESS_CODE, TYPE_URL } from '../config/common'
import { List, message, Skeleton, Typography } from 'antd'
// import Banner from '../component/Banner'

import moment from 'moment'
const { Title, Paragraph } = Typography

import '../static/style/pages/list.css'
import LoadMoreList from '../component/LoadMoreList'

const preview = 3,
  rows = 3

const seatRender = (

  <List
    dataSource={[...Array(preview).keys()]}
    renderItem={() => (
      <List.Item className="seat">
        <div className="list-item">
          <Skeleton
            title={{ width: '50%' }}
            paragraph={{ rows: 1, width: '10%' }}
            active
          />
          <div className="list-img-holder" >
            <Skeleton.Input active />
          </div>
          {/* <Skeleton
            paragraph={{ rows: rows }}
            active
          /> */}
        </div>
      </List.Item>)}
  />
)


const list = () => {

  const type = "notes"

  const getData = (page, cb) => {
    let form = new FormData()
    form.append('page', page++)
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

  const render = item => (
    <div className="list-item">
      <Title
        className="list-title"
        level={4}
        ellipsis={true}
        onClick={() => viewDetail(item.id)}
      >
        {item.title}
      </Title>
      <div className="list-meta">
        <span>{moment(item.gmtCreate).format(DATE_FORMAT)}</span>
        <span> · </span>
        <span>{item.pv} views</span>
      </div>
      <div className="list-img-holder">
        <div className="list-img">
        </div>
      </div>
      <Paragraph
        className="list-preview"
        ellipsis={{ rows: rows, expandable: false }}
        onClick={() => viewDetail(item.id)}
      >
        {item.preview}
      </Paragraph>
    </div>
  )


  const list = useMemo(() => (


    <LoadMoreList

      className="list"
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}

    />
  ), [])

  return (
    <Layout
      // banner={<Banner title="记录生活 分享技术" desc="编程是一门艺术，生活亦是如此"/>}
      main={list}
      menuKeys={['/']}
    />
  )

}

export default list
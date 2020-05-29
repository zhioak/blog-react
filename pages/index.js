import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import Router from 'next/router'
import { useMemo, useState } from 'react'
import { message, Skeleton, Typography } from 'antd'


import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { DATE_FORMAT, LIST_URL, SUCCESS_CODE } from '../config/common'

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


const index = ({ title, desc, bg }) => {

  const [spinning, setSpinning] = useState(false)

  const viewDetail = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
  }

  const getData = (page, cb) => {
    let form = new FormData()
    form.append('page', page++)
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

  const render = ({ id, title, type, typePath, typeName, pv, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Title
        className="list-title"
        level={4}
        ellipsis={{ rows: 2 }}
        onClick={() => viewDetail(id)}
      >
        {title}
      </Title>
      <div className="list-meta">
        <Link href={`/${type}` == typePath ? typePath : `${typePath}?key=${type}`}>
          <span className="list-type">{typeName}</span>
        </Link>
        <span className="cut" />
        <span>{moment(gmtCreate).format(DATE_FORMAT)}</span>
        <span className="cut" />
        <span>{pv} views</span>
      </div>
      {
        previewImg &&
        <div className="list-img-holder" onClick={() => viewDetail(id)}>
          <div className="list-img" style={{ backgroundImage: `url(${previewImg})` }}></div>
        </div>
      }
      {
        preview &&
        <Paragraph
          className="list-preview"
          ellipsis={{ rows: previewImg ? 2 : 3, expandable: false }}
          onClick={() => viewDetail(id)}
        >
          {preview}
        </Paragraph>
      }
    </div>
  )

  const banner = useMemo(() => (
    <Banner
      title="记录生活 分享技术"
      desc="编程是一门艺术，生活亦是如此"
    />
  ), [])


  const list = useMemo(() => (
    <LoadMoreList
      className="list"
      cacheKey="index"
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [])


  return (
    <Layout
      spinning={spinning}
      banner={banner}
      main={list}
      menuKeys={[' ']}
    />
  )
}


export default index
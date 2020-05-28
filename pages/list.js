import axios from 'axios'
import moment from 'moment'
import Router from 'next/router'
import { useMemo, useState } from 'react'
import { message, Skeleton, Typography } from 'antd'


import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { DATE_FORMAT, ERROR_ENUM, ERROR_RESULT, LIST_URL, SUCCESS_CODE, TYPE_URL } from '../config/common'

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


const list = ({ error, type, title, desc, bg }) => {
  if (error) {
    return (<ERROR_RESULT error={error} />)
  }

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

  const render = ({ id, title, pv, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Title
        className="list-title"
        level={4}
        ellipsis={true}
        onClick={() => viewDetail(id)}
      >
        {title}
      </Title>
      <div className="list-meta">
        <span>{moment(gmtCreate).format(DATE_FORMAT)}</span>
        <span> · </span>
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
      bg={bg}
      title={title}
      desc={desc}
    />
  ), [type])


  const list = useMemo(() => (
    <LoadMoreList
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
      menuKeys={[type]}
    />
  )
}


list.getInitialProps = async (context) => {

  let { key } = context.query
  if (!key) {
    return { error: ERROR_ENUM[404] }
  }

  const promise = new Promise(
    resolve => {
      axios(TYPE_URL + key).then(
        (res) => {
          const { code, info, data } = res.data
          if (code != SUCCESS_CODE) {
            resolve({ error: { code, info } })
            return
          }
          data.type = key
          resolve(data)
        }
      )
    }
  )
  return await promise
}

export default list
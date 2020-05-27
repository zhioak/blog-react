import { List, message, Skeleton, Typography } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useMemo, useState } from 'react'


import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { DATE_FORMAT, ERROR_ENUM, ERROR_RESULT, LIST_URL, SUCCESS_CODE, TYPE_URL } from '../config/common'

import '../static/style/pages/list.css'
// import Banner from '../component/Banner'

const { Title, Paragraph } = Typography


const seatRender = (

  <div className="seat">
    <div className="list-item">
      <Skeleton
        title={{ width: '40%' }}
        paragraph={{ width: ['22%', '100%', '55%'] }}
        active
      />
      {/* <Skeleton
            paragraph={{ rows: rows }}
            active
          /> */}
    </div>
  </div>
)


const list = () => {

  const type = "notes"

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
        setTimeout(() => cb(data), 1000)
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
      {/* <div className="list-img-holder">
        <div className="list-img">
        </div>
      </div> */}
      <Paragraph
        className="list-preview"
        ellipsis={{ rows: 2, expandable: false }}
        onClick={() => viewDetail(item.id)}
      >
        杀菌灯卡拉胶打开了三大是冷酷的as考虑对加快了是搭建卡螺丝刀进来看待进来看待家是冷酷的贾克斯了多久爱上了肯德基爱上了肯德基爱上了打卡就死定了卡时间段里卡时间段来看讲道理看讲道理看多久啊卡螺丝刀了
        {/* {item.preview} */}

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
      spinning={spinning}
      main={list}
      menuKeys={['/']}
    />
  )

}

export default list
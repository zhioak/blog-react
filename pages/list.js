import { List, message, Skeleton, Typography } from 'antd'
import axios from 'axios'
import moment from 'moment'
import Router from 'next/router'
import { useMemo, useState } from 'react'
import AutoList from '../component/AutoList'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import { DATE_FORMAT, ERROR_ENUM, ERROR_RESULT, LIST_URL, SUCCESS_CODE, TYPE_URL } from '../config/common'
import '../static/style/pages/list.css'





const { Title, Paragraph } = Typography

const
  rows = 3,
  height = 150,
  preview = 2


const seatRender = (

  <List
    dataSource={[...Array(preview).keys()]}
    renderItem={() => (
      <List.Item className="seat">
        <div className="list-item">
          <Skeleton
            title={{ width: '50%' }}
            paragraph={{ rows: rows }}
            active
          />

          <div className="list-meta">
            <Skeleton.Button
              size="small"
              active />
          </div>
        </div>
      </List.Item>)}
  />
)



const list = ({ error, type, title, desc, bg }) => {


  console.log('list render')

  if (error) {
    return (<ERROR_RESULT error={error} />)
  }

  const [spinning, setSpinning] = useState(false)


  // 获取数据
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

  const viewDetail = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
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
      <Paragraph
        className="list-preview"
        ellipsis={{ rows: rows, expandable: false }}
        onClick={() => viewDetail(item.id)}
      >
        {item.preview}
      </Paragraph>
      <div className="list-meta">
        <div>{moment(item.gmtCreate).format(DATE_FORMAT)}</div>
      </div>
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
    <AutoList
      className="list"
      getData={getData}
      itemHeight={height}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [type])

  return (
    <Layout
      banner={banner}
      main={list}
      spinning={spinning}
      menuKeys={[type]}
    />
  )
}


list.getInitialProps = async (context) => {

  let { key } = context.query
  if (!key) {
    return { error: ERROR_ENUM[404] }
  }

  const promise = new Promise((resolve) => {
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
  })


  return await promise
}

export default list

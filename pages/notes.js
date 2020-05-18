import { Typography, List, Spin, Skeleton } from 'antd'

import { useState } from 'react'

import Router from 'next/router'
import AutoList from '../component/AutoList'
import Layout from '../component/Layout'

import { LoadingOutlined } from '@ant-design/icons'


import '../static/style/pages/list.css'

const { Title, Paragraph } = Typography
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />




const
  height = 150,
  rows = 3,
  preview = 3

// 获取数据

var i = 0
const getData = cb => {

  console.log('getData')

  if (++i > 2) {
    result.hasMore = false
  }

  setTimeout(() => {
    cb(result)
  }, 100)
}


const seatRender = (
  <List
    itemLayout="horizontal"
    dataSource={[...Array(preview).keys()]}
    renderItem={() => (<List.Item className="seat">
      <div className="list-item">
        <Skeleton
          title={{ width: '50%' }}
          paragraph={{ rows: rows }}
          active
        />
      </div>
      <div className="notes-meta">
        <Skeleton.Button size="small" active />
      </div>
    </List.Item>)}
  />
)



export default () => {

  const [spinning, setSpinning] = useState(false)

  const viewDetail = id => {
    setSpinning(true)
    Router.push({
      pathname: '/detail',
      query: { id }
    })
  }

  
  const render = item => (
    <div className="list-item">
      <Title className="notes-title" level={4} ellipsis={true} onClick={() => viewDetail(item.id)}> {item.title} </Title>
      <Paragraph className="notes-preview" ellipsis={{ rows: rows, expandable: false }} onClick={() => viewDetail(item.id)} >
        {item.content}
      </Paragraph>
      <div className="notes-meta">
        <div>{item.gmtCreate}</div>
      </div>
    </div>
  )

  const list = (
    <Spin indicator={loadIcon} spinning={spinning}>
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
      selectedKeys={['/notes']}
    />
  )
}



// 临时数据
const result = {
  hasMore: true, data: [
    { id: 1, title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少', gmtCreate: '2020-05-13' },
    { id: 2, title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '加密方式比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布{name:"zhou,age:17"}比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布', gmtCreate: '2020-05-13' },
    { id: 3, title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '加密方式  比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布  {name:"zhou,age:17"}  比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布  ', gmtCreate: '2020-05-13' },
    { id: 4, title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
    { id: 5, title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
    { id: 6, title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '## 加密方式\n\n>比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n ```{name:"zhou,age:17"}```比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n', gmtCreate: '2020-05-13' }
  ]
}
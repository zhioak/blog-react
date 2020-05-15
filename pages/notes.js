import { Typography, List, Skeleton } from 'antd'
import AutoList from '../component/AutoList'
import Layout from '../component/Layout'

// markdown 解析
import marked from 'marked'

import '../static/style/pages/list.css'

const { Title, Paragraph } = Typography

const result = {
  hasMore: true, data: [
    { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少', gmtCreate: '2020-05-13' },
    { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
    { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
    { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
    { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
    { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '## 加密方式\n\n>比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n ```{name:"zhou,age:17"}```比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布比比巴布\n\n', gmtCreate: '2020-05-13' }
  ]
}

const renderer = new marked.Renderer()

marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
})



var i = 0

const
  height = 150,
  rows = 3,
  preNum = 4,

  getData = cb => {
    if (++i > 2) {
      result.hasMore = false
    }
    setTimeout(() => {
      cb(result)
    }, 3000)
  },

  render = item => (
    <div className="list-item">
      <Title level={4} ellipsis={true}> {item.title} </Title>
      <Paragraph ellipsis={{ rows: rows, expandable: false }}  >
        <div dangerouslySetInnerHTML={{ __html: marked(item.content) }}></div>
      </Paragraph>
      <div className="item-meta">
        <div>{item.gmtCreate}</div>
      </div>
    </div>
  ),

  seat = (
    <List
      itemLayout="horizontal"
      dataSource={[...Array(preNum).keys()]}
      renderItem={() => (<List.Item className="seat">
        <div className="list-item">
          <Skeleton
            title={{ width: '50%' }}
            paragraph={{ rows: rows }}
            active
          />
        </div>
        <Skeleton.Button className="item-meta" size="small" active />
      </List.Item>)}
    />
  ),

  list = (
    <AutoList
      className="list"
      getData={getData}
      itemHeight={height}
      itemRender={render}
      itemSeat={seat}
    />
  )


export default () => (
  <Layout main={list} />
)
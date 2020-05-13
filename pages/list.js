import { Typography, List, Skeleton } from 'antd';
import AutoList from '../component/AutoList';
import '../static/style/pages/list.css';

const { Title, Paragraph } = Typography;


const result = {
  hasMore: true, data: [
    { url: 'https://tvax1.sinaimg.cn/large/6f8a2832gy1gdrccpw1lij21z418g7o1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://tvax1.sinaimg.cn/large/6f8a2832gy1gdrccpw1lij21z418g7o1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://tvax1.sinaimg.cn/large/6f8a2832gy1gdrccpw1lij21z418g7o1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://zhousb.cn/upload/jagsaw/1.jpg', title: '游千佛山', place: '济南' },
    { url: 'https://zhousb.cn/upload/jagsaw/1.jpg', title: '游千佛山', place: '济南' }
  ]
}
// const result = {
//   hasMore: true, data: [
//     { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少', gmtCreate: '2020-05-13' },
//     { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
//     { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
//     { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
//     { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' },
//     { title: '作为计算机专业学生，最应该学习的课程前五位是什么？', content: '程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉', gmtCreate: '2020-05-13' }
//   ]
// }



export default ({ type = 2 }) => {

  const ellipsis = {
    rows: 3,
    expandable: false
  }

  const height = 1 == type ? 150 : 300



  var i = 0
  const getData = cb => {

    if (++i > 2) {
      result.hasMore = false
    }

    setTimeout(() => {
      cb(result)
    }, 3000)

  }

  const itemRender = item => (
    <div className="list-item">

      <div className="item-img"
        style={{
          height: 300 - 35,
          backgroundImage: `url(${item.url})`
        }}
      >
        <div className="item-img-cover">
          <div className="item-img-meta">
            <div className="title">{item.title}</div>
            <div>
              <span>{item.place}</span>
              <span> · </span>
              <span>2019-05-01</span>
            </div>
          </div>
        </div>
      </div>

      {/* <Title level={4} ellipsis={true}>
        {item.title}
      </Title>
      <Paragraph ellipsis={ellipsis}>
        {item.content}
      </Paragraph>
      <div className="item-meta">
        <div>{item.gmtCreate}</div>
      </div> */}
    </div>
  )

  // 占位
  const seat = (
    <List
      itemLayout="horizontal"
      dataSource={[...Array(3).keys()]}
      renderItem={() => (

        <List.Item className="seat">


          <Skeleton.Input style={{ width: '100%', height: 300 - 35 }} active />

          {/* <div className="list-item">
            <Skeleton
              title={{ width: '50%' }}
              paragraph={{ rows: 3 }}
              active />
          </div>
          <Skeleton.Button className="item-meta" size="small" active /> */}
        </List.Item>
      )}
    />
  )

  return (
    <AutoList
      getData={getData}
      itemRender={itemRender}
      itemHeight={height}
      itemSeat={seat}
    >
    </AutoList>
  )

}
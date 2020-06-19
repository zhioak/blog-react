
import moment from 'moment'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Anchor, Input, Select, Avatar, Tooltip, Skeleton } from 'antd'
import { UserOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons'

import LoadMoreList from './LoadMoreList'
import { httpPost } from './util/httpUtil'
import apiMap from '../config/apiMap'
import '../static/style/component/comment.css'

const { Option } = Select
const { TextArea } = Input

const seatRender = (
    <Skeleton className="comment-item" avatar={{ shape: 'square' }} active paragraph={{ rows: 1 }} />
)


export default ({ blogId }) => {

    const [replier, setReplier] = useState()

    const getData = (page, cb) => {
        httpPost({
            cb,
            url: apiMap.commentList,
            data: {
                blogId,
                page
            }
        })
    }

    const form = useMemo(() => (
        <div className="comment">
            {
                replier &&
                <div className="comment-bar">
                    <svg t="1592546976790" class="comment-close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2107" onClick={() => setReplier(null)}>
                        <path d="M512 359.08213712L817.83393817 53.24819899c43.69061365-43.69061365 109.22671292-43.69061365 152.9173266 0s43.69061365 109.22671292 0 152.91732657L664.91786288 512l305.83393813 305.83393817c43.69061365 43.69061365 43.69061365 109.22671292 0 152.9173266s-109.22671292 43.69061365-152.91732657 0L512 664.91786288 206.16606183 970.75180101c-43.69061365 43.69061365-109.22671292 43.69061365-152.9173266 0-43.69061365-43.69061365-43.69061365-109.22671292 0-152.91732657L359.08213712 512 53.24819899 206.16606183C9.55687026 162.47473313 9.55687026 96.93952767 53.24819899 53.24819899c43.69061365-43.69061365 109.22671292-43.69061365 152.91732657 0L512 359.08213712Z" p-id="2108"></path>
                    </svg>
                </div>
            }
            <div className="visitor-info">
                <Input type="text" placeholder="昵称*" prefix={<UserOutlined />} />
                <Input type="email" placeholder="邮箱" prefix={<MailOutlined />} />
                <Input type="text" placeholder="网址" prefix={<LinkOutlined />} />
            </div>
            <div>
                <TextArea className="content" placeholder="这里可以随便比比点什么（如果你想收到回复提醒或使用Gravatar，就给老子把邮箱写上）" autoSize={{ minRows: 3 }} />
            </div>
            <div className="comment-footer">
                <div></div>
                <div>
                    <div className="comment-submit">提交</div>
                </div>
            </div>
        </div>
    ), [replier])

    const render = ({ id, repliedId, fromVisitor, toVisitor, content, gmtCreate, replyCount, replyList }) => {

        // const anchor = 'comment-' + id
        // const replyAnchor = repliedId && 'comment-' + repliedId

        const getReplyList = (page, cb) => {
            httpPost({
                cb,
                url: apiMap.replyList,
                data: { topicId: id, page }
            })
        }
        const author = (
            <span className="comment-author">
                {
                    fromVisitor.website ?
                        <a href={fromVisitor.website} target="_blank" >{fromVisitor.nickname}</a> :
                        fromVisitor.nickname
                }
            </span>
        )


        return (
            <div className="comment-item">
                <div className={`comment-body ${replier && id == replier.id && 'reply-active'}`}>
                    <div>
                        <Avatar
                            shape="square"
                            className="comment-avatar"
                            alt={fromVisitor.nickname + ' avatar'}
                            src={fromVisitor.avatar}
                        />
                    </div>
                    <div className="comment-main">
                        <div className="comment-header">
                            <div className="header-left">
                                {author}
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span className="comment-time">{moment(gmtCreate).fromNow()}</span>
                                </Tooltip>
                            </div>
                            <div>
                                <svg t="1592355504028" className="comment-reply" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7501" onClick={() => setReplier({ id })}>
                                    <path d="M16.6275 379.672L368.6355 75.702C399.4475 49.092 448.0095 70.694 448.0095 112.03v160.106c321.258 3.678 576 68.064 576 372.516 0 122.882-79.162 244.618-166.666 308.264-27.306 19.862-66.222-5.066-56.154-37.262 90.688-290.024-43.014-367.02-353.18-371.484V720c0 41.4-48.6 62.906-79.374 36.328l-352.008-304c-22.142-19.124-22.172-53.506 0-72.656z" p-id="7502">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <div className="comment-content">
                            {/* <Anchor affix={false}>
                                <Anchor.Link href="#test" title="test"/>
                            </Anchor> */}
                            {/* {repliedId && <Link href={'#comment-' + repliedId}><a>@{toVisitor.nickname}</a></Link>} */}
                            {content}
                        </div>
                    </div>
                </div>
                {replier && id == replier.id && form}
                {
                    replyList.length > 0 &&
                    <LoadMoreList
                        split={false}
                        rawData={replyList}
                        itemRender={render}
                        className="reply-list"
                        getData={getReplyList}
                        cacheKey={'reply' + id}
                        itemSeatRender={seatRender}
                        rawHasMore={0 < replyCount - replyList.length}
                        loadMore={(<div className="reply-spread" >  <span className="tips">还有{replyCount - replyList.length}条评论</span>，点击展开</div>)}
                    />
                }
            </div>
        )
    }

    const list = useMemo(() => (
        <LoadMoreList
            split={false}
            getData={getData}
            itemRender={render}
            className="comment-list"
            itemSeatRender={seatRender}
            cacheKey={'comment' + blogId}
            locale={{ emptyText: '暂无评论' }}
        />
    ), [replier])

    return (
        <>
            {!replier && form}
            {list}
            <a id="test"></a>
        </>
    )
} 

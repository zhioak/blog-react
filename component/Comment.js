import moment from 'moment'

import { useMemo } from 'react'
import { Comment, Avatar, Tooltip, Skeleton } from 'antd'

import LoadMoreList from './LoadMoreList'
import { httpPost } from './util/httpUtil'
import apiMap from '../config/apiMap'

import '../static/style/component/comment.css'


const seatRender = () => (
    <Skeleton avatar paragraph={{ rows: 2 }} />
)

export default ({ blogId }) => {

    const getData = (page, cb) => {
        httpPost({
            url: apiMap.commentList,
            data: {
                blogId: 1,
                page
            },
            cb: data => cb(data)
        })
    }



    const render = ({ id, fromVisitor, content, gmtCreate, replyList }) => (
        <Comment
            className="comment-item"
            author={
                fromVisitor.website ?
                    <a href={fromVisitor.website} target="_blank">{fromVisitor.nickname}</a> :
                    fromVisitor.nickname
            }
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt={fromVisitor.nickname + ' avatar'}
                    shape="square"
                    className="comment-avatar"
                />
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(gmtCreate).fromNow()}</span>
                </Tooltip>
            }
            content={
                <>
                    {content}
                    <div className="comment-reply">
                        <svg t="1592355504028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7501">
                            <path d="M16.6275 379.672L368.6355 75.702C399.4475 49.092 448.0095 70.694 448.0095 112.03v160.106c321.258 3.678 576 68.064 576 372.516 0 122.882-79.162 244.618-166.666 308.264-27.306 19.862-66.222-5.066-56.154-37.262 90.688-290.024-43.014-367.02-353.18-371.484V720c0 41.4-48.6 62.906-79.374 36.328l-352.008-304c-22.142-19.124-22.172-53.506 0-72.656z" p-id="7502">
                            </path>
                        </svg>
                    </div>
                </>
            }
        >
            {
                replyList.length != 0 &&
                <div className="reply-list">
                    {replyList.map(render)}
                    <div>展开</div>
                </div>
            }
        </Comment>
    )


    const list = useMemo(() => (
        <LoadMoreList
            className="comment-list"
            split={false}
            cacheKey="blogId"
            getData={getData}
            itemRender={render}
            itemSeatRender={seatRender}
        />
    ), [])


    const comment = useMemo(() => (
        <div className="comment">
            <input type="text"/>
        </div>
    ), [])

    return (
        <>
            {/* {comment} */}
            {list}
        </>
    )
} 

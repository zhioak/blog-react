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

    const render = ({ id, fromVisitor, content, gmtCreate }) => (
        <Comment
            className="comment"
            author={fromVisitor.website ?
                <a href={fromVisitor.website}>{fromVisitor.nickname}</a> :
                fromVisitor.nickname
            }
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                    className="comment-avatar"
                />
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(gmtCreate).fromNow()}</span>
                </Tooltip>
            }
            content={content}
        >
        </Comment>
    )


    const list = useMemo(() => (
        <LoadMoreList
            cacheKey="blogId"
            getData={getData}
            itemRender={render}
            itemSeatRender={seatRender}
        />
    ), [])


    return list
} 

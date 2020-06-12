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
            url: apiMap.list,
            data: { page },
            cb: data => cb(data)
        })
    }

    const render = () => (
        <Comment
            className="comment"
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>我是你的爸爸</a>}
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                    className="comment-avatar"
                />
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment([2019, 5, 5]).fromNow()}</span>
                </Tooltip>
            }
            content={
                <p>天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情天道酬勤啊，卧槽无情</p>
            }
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

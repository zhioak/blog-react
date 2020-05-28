import { List, Button } from 'antd'
import { useEffect, useState } from 'react'


var page, hasMore

const LoadMoreList = ({ className, getData, itemRender, itemSeatRender }) => {

    const [data, setData] = useState(),
        [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setData(null)
        }
        page = 1
        hasMore = true
        getData(page, r => {
            hasMore = r.hasMore
            setData(r.list)
        })
    }, [])

    // 未获取到数据使用seat占位
    if (!data) return itemSeatRender

    const onLoadMore = () => {
        if (!hasMore) return
        setLoading(true)
        getData(++page, r => {
            hasMore = r.hasMore
            setLoading(false)
            setData(data.concat(r.list))
            window.dispatchEvent(new Event('resize'))
        })
    }

    const loadMore = (
        <Button className="loadMore" onClick={onLoadMore}>加载更多</Button>
    )

    return (
        <List
            className={className}
            dataSource={data}
            loadMore={hasMore && !loading ? loadMore : null}
            renderItem={item => (<List.Item key={item.id}>{itemRender(item)}</List.Item>)}
        >
            {loading && itemSeatRender}
        </List>
    )

}
export default LoadMoreList
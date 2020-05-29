import { List, Button } from 'antd'
import { useEffect, useState } from 'react'


const pool = {}
var page, hasMore

const LoadMoreList = ({ cacheKey, className, getData, itemRender, itemSeatRender }) => {

    const [data, setData] = useState(),
        [loading, setLoading] = useState(false)

    useEffect(() => {
        let {
            data: cData = [],
            page: cPage = 0,
            hasMore: cMore = true
        } = pool[cacheKey] ? pool[cacheKey] : {}
        page = cPage
        hasMore = cMore
        hasMore ?
            getData(++page, r => {
                hasMore = r.hasMore
                let tData = cData.concat(r.list)
                pool[cacheKey] = { hasMore, page, data: tData }
                setData(tData)
            })
            : setData(cData)

    }, [cacheKey])

    const onLoadMore = () => {
        if (!hasMore) return
        setLoading(true)
        getData(++page, r => {
            hasMore = r.hasMore
            let tData = data.concat(r.list)
            pool[cacheKey] = { hasMore, page, data: tData }
            setLoading(false)
            setData(tData)
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
            loadMore={data && hasMore && !loading && loadMore}
            renderItem={item => (<List.Item key={item.id}>{itemRender(item)}</List.Item>)}
        >
            {(!data || loading) && itemSeatRender}
        </List>
    )

}
export default LoadMoreList
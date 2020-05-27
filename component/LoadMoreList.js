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
    if (!data) {
        return itemSeatRender
    }

    const onLoadMore = () => {
        setLoading(true)
        getData(++page, r => {
            setData(data.concat(r.list))
            setLoading(false)
            hasMore = r.hasMore
            window.dispatchEvent(new Event('resize'))
        })
    }

    const loadMore = hasMore && !loading ? (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button onClick={onLoadMore}>loading more</Button>
        </div>
    ) : null

    return (
        <List
            className={className}
            loadMore={loadMore}
            dataSource={data}
            renderItem={(item) => {
                return (
                    <List.Item key={item.id}>
                        {
                            itemRender(item)
                        }
                    </List.Item>
                )
            }}
        >
            {/* {loading && itemSeatRender} */}
            {itemSeatRender}
        </List>
    )

}
export default LoadMoreList
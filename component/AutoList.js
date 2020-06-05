import { List } from 'antd'
import { useState, useEffect } from 'react'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import VList from 'react-virtualized/dist/commonjs/List'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'



var tasks = 0, // 任务数 可能会并发请求
  page,
  hasMore

const pool = {}

/**
* 无限滚动列表
* getData 获取数据的方式,返回数据为 {data:DATA,hasMore:HASMORE}
* itemRender 单元素渲染
* itemSeatRender   加载时的占位
*/
const AutoList = ({ className, getData, itemRender, itemHeight = 150, itemSeatRender, cacheKey }) => {

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



  // 未获取到数据使用seat占位
  if (!data) {
    return itemSeatRender
  }

  var loadedRowsMap = {}
  const loadMoreRows = ({ startIndex, stopIndex }) => {
    if (!hasMore) return

    setLoading(true)
    for (let i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = 1
    }

    ++tasks
    getData(++page, r => {
      hasMore = r.hasMore
      let tData = data.concat(r.list)
      pool[cacheKey] = { hasMore, page, data: tData }
      setData(tData)
      --tasks <= 0 && setLoading(false)
    })
  }

  const
    renderItem = ({ index, key, style }) => (
      <List.Item key={key} style={style}>
        {
          itemRender(data[index])
        }
      </List.Item>
    )
    ,
    vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={itemHeight}
        rowRenderer={renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    ),
    autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width,
          })
        }
      </AutoSizer>
    )

  const
    isRowLoaded = ({ index }) => !!loadedRowsMap[index],
    infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={data.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
          })
        }
      </InfiniteLoader>
    )

  return (
    <List className={className} >
      {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
      {loading && itemSeatRender}
    </List>
  )
}
export default AutoList
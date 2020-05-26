import { List } from 'antd'
import { useState, useEffect } from 'react'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import VList from 'react-virtualized/dist/commonjs/List'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'



var tasks = 0, // 任务数

  page,
  hasMore

/**
* 无限滚动列表
* getData 获取数据的方式,返回数据为 {data:DATA,hasMore:HASMORE}
* itemRender 单元素渲染
* itemSeatRender   加载时的占位
*/
const AutoList = ({ className, getData, itemRender, itemHeight = 150, itemSeatRender }) => {

  console.log(`autolist render`)

  const [data, setData] = useState(),
    [loading, setLoading] = useState(false)

  useEffect(() => {
    // 重复使用组件
    if(data){
      setData(null)
    }
    page = 1
    hasMore = true
    
    getData(page, r => {
      hasMore = r.hasMore
      setData(r.list)
    })
  }, [getData])

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
      setData(data.concat(r.list))
      --tasks <= 0 && setLoading(false)
      hasMore = r.hasMore
    })
  }

  const
    renderItem = ({ index, key, style }) => {
      return (
        <List.Item key={key} style={style}>
          {
            itemRender(data[index])
          }
        </List.Item>
      )
    },
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
import { List } from 'antd'
import { useState, useEffect } from 'react'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import VList from 'react-virtualized/dist/commonjs/List'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'

var tasks = 0 // 任务数 
const AutoList = ({ className, getData, itemRender, itemHeight = 150, itemSeat }) => {

  const
    [data, setData] = useState([]),
    [hasMore, setHasMore] = useState(true),
    [loading, setLoading] = useState(true)

  // 初始化
  useEffect(() => {
    handleData()
  }, [])

  var loadedRowsMap = {}

  const handleData = () => {

    ++tasks

    getData(r => {
      setData(data.concat(r.data))
      --tasks <= 0 && setLoading(false)
      !r.hasMore && setHasMore(false)
    })
  }

  const loadMoreRows = ({ startIndex, stopIndex }) => {

    if (!hasMore) return

    setLoading(true)
    for (let i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = 1
    }

    handleData()
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
    <List className={className}>
      {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
      {loading && itemSeat}
    </List>
  )
}
export default AutoList
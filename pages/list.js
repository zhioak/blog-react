import { List, message, Spin } from 'antd'
import { useState, useEffect } from 'react'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import VList from 'react-virtualized/dist/commonjs/List'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'

const result = { hasMore: true, data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] }

const AutoList = () => {

  const
    [data, setData] = useState([]),
    [hasMore, setHasMore] = useState(true),
    [loading, setLoading] = useState(false)

  var loadedRowsMap = {}


  // 初始化
  useEffect(() => {
    fetchData(r => {
      setData(r.data)
    })
  }, [])

  const fetchData = cb => {
    setTimeout(() => {
      console.log('fetch')
      if (data.length > 19) {
        result.hasMore = false
      }

      if (!result.hasMore) {
        message.warning('已加载全部数据')
        setLoading(false)
        setHasMore(false)
        return
      }

      cb(result)

    }, 1)

  }



  const loadMoreRows = ({ startIndex, stopIndex }) => {
    if (!hasMore) {
      return
    }

    setLoading(true)
    for (let i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = 1
    }

    fetchData(r => {
      setData(data.concat(r.data))
      setLoading(false)
    })
  }

  const isRowLoaded = ({ index }) => !!loadedRowsMap[index]

  const renderItem = ({ index, key, style }) => {
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <div>
          <div className="title">
            作为计算机专业学生，最应该学习的课程前五位是什么？
          </div>
          <div className="content">
            程序员吴师兄： 不知不觉自己的程序员生涯已经有 6 年。变秃了，也变强了。 如果让我回到大学生涯，我一定会认认真真的学习下面的课程，起码我的头发可以少掉
            </div>
        </div>
      </List.Item>
    )
  }

  const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
    <VList
      autoHeight
      height={height}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      overscanRowCount={2}
      rowCount={data.length}
      rowHeight={150}
      rowRenderer={renderItem}
      onRowsRendered={onRowsRendered}
      scrollTop={scrollTop}
      width={width}
    />
  )

  const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
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

  const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
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
    <List>
      {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
      {loading && <Spin />}
    </List>
  )
}
export default AutoList
import moment from 'moment'
import Link from 'next/link'
import { Skeleton } from 'antd'
import { useMemo, useState } from 'react'

import Error from '../component/Error'
import Banner from '../component/Banner'
import Layout from '../component/Layout'
import LoadMoreList from '../component/LoadMoreList'
import { httpPost } from '../component/util/httpUtil'

import apiMap from '../config/apiMap'
import '../static/style/pages/list.css'


const indexKey = '/'
const menuKeys = []

const list = ({ error, type, title, desc, bg }) => {

  if (error) return (<Error error={error} />)


  menuKeys[0] = type ? type : indexKey
  const [spinning, setSpinning] = useState(false)

  const getData = (page, cb) => {
    httpPost({
      url: apiMap.list,
      data: { page, 'type.key': type },
      cb
    })
  }



  const render = ({ id, title, type: itemType, menu, preview, previewImg, gmtCreate }) => (
    <div className="list-item">
      <Link href={'/detail?id=' + id}>
        <a className="list-title" onClick={() => setSpinning(true)}>
          {title}
        </a>
      </Link>

      <div className="list-meta">
        {
          !type &&
          <>
            <Link href={menu.path}>
              <a className="list-type" onClick={() => setSpinning(true)}>
                {itemType.name}
              </a>
            </Link>
            <span className="cut" />
          </>
        }
        <span>{moment(gmtCreate).format('YYYY-MM-DD')}</span>
      </div>
      {
        previewImg &&
        <div className="list-img-holder">
          <Link href={'/detail?id=' + id}>
            <a onClick={() => setSpinning(true)}>
              <div className="list-img" style={{ backgroundImage: `url(${previewImg})` }}></div>
            </a>
          </Link>
        </div>
      }
      {
        preview &&
        <Link href={'/detail?id=' + id}>
          <a className="list-preview" onClick={() => setSpinning(true)}>
            {preview}
          </a>
        </Link>
      }
    </div>
  )

  const seatRender = useMemo(() => (

    <div className="seat">
      <div className="list-item">
        <Skeleton
          active
          title={{ width: '40%' }}
          paragraph={{ width: ['22%', '100%', '55%'] }}
        />
      </div>
    </div>
  ), [])

  const banner = useMemo(() => (bg || title || desc) && <Banner bg={bg} title={title} desc={desc} />, [type])

  const list = useMemo(() => (
    <LoadMoreList
      listkey={type}
      className="list"
      getData={getData}
      itemRender={render}
      itemSeatRender={seatRender}
    />
  ), [type])




  return (
    <Layout
      spinning={spinning}
      setSpinning={setSpinning}
      banner={banner}
      main={list}
      menuKeys={menuKeys}
    />
  )
}



const pool = {}
list.getInitialProps = async ({ query, req: request, res: response }) => {

  let { type = indexKey } = query
  return !request && pool[type] ? pool[type] : await new Promise(
    resolve => httpPost({
      url: apiMap.type,
      data: { key: type },
      cb: data => resolve(pool[type] = indexKey === type ? data : { ...data, type }),
      fcb: res => resolve({ error: res }),
      request,
      response
    })
  )
}
export default list

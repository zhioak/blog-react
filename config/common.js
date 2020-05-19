import { LoadingOutlined } from '@ant-design/icons'


// const gate = 'https://www.zhousb.cn/api/'
const gate = 'http://127.0.0.1:8080/'

export const DETAIL_URL  = gate + 'blog/get/'

export const LIST_URL = gate + 'blog/list'

export const SUCCESS_CODE = '0000'

/**
 * 加载样式
 */
export const ICON_LOAD = <LoadingOutlined style={{ fontSize: 24 }} />
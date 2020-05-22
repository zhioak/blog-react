

import { Button, Result } from 'antd'


// const gate = 'https://www.zhousb.cn/api/'
const gate = 'http://127.0.0.1:8080/'

export const DETAIL_URL = gate + 'blog/get/'

export const LIST_URL = gate + 'blog/list'

export const SUCCESS_CODE = '0000'

export const DATE_FORMAT = 'YYYY-MM-DD'



export const ERROR_RESULT = ({ error }) => {
    let { state = 'warning', code, info } = error
    return (

        <Result
            status={state}
            title={code}
            subTitle={info}
            extra={<Button type="primary" onClick={() => { window.history.back() }} >Go Back</Button>}
        />
    )
}



export const ERROR_ENUM = {
    404: {
        state: 404,
        code: '404',
        info: 'Sorry, the page you visited does not exist.'
    }
}
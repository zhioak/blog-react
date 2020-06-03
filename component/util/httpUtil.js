import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'

export const httpPost = (url, data, cb, fcb) => {
    data = qs.stringify(data)
    axios.post(url, data)
        .then(
            res => {
                let { code, info, data } = res.data
                if (code != '0000') {
                    return fcb ? fcb(res.data) : message.warning(info)
                }
                cb(data)
            }
        ).catch(err => {
            console.log(err)
            message.warning('请求出错咯~')
        })
}
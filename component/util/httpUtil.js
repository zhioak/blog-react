import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'

/**
 * 
 * 封装post请求
 * 
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @param {fucntion} cb 成功回调
 * @param {function} fcb 失败回调 默认使用消息提示
 */
export const httpPost = ({ url, data, cb, fcb }) => {
    data = qs.stringify(data)
    axios.post(url, data)
        .then(
            res => {
                let { code, info, data } = res.data
                code === '0000' ? cb && cb(data) : fcb ? fcb(res.data) : message.warning(info)
            }
        ).catch(err => {
            console.log(err)
            message.warning('请求出错咯~')
        })
}
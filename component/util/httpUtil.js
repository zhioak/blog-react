import { message } from 'antd'
import axios from 'axios'
import qs from 'qs'
import localUtil from './localUtil'


/**
 * cookie携带
 */
axios.defaults.withCredentials = true


/**
 * 
 * 服务器端post请求，
 * 默认携带浏览器的请求头，设置cookie响应头
 * 
 */
export const ssHttpPost = ({ url, data, cb, fcb, request, response }) => {

    let { headers } = request
    headers['zhousb-server-side'] = true
    console.log(headers)

    axios.post(url, qs.stringify(data), { headers })
        .then(
            res => {
                let cookie = res.headers['zhousb-blog-token']
                cookie && response.setHeader('Set-Cookie', cookie)
                success(res, cb, fcb)
            }
        ).catch(e => error(e, fcb))
}


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
    axios.post(url, qs.stringify(data))
        .then(
            res => {
                if ('0200' === res.data.code) {
                    res.data.code = '0000'
                    localUtil.remove('menuList', 'snsMap')
                }
                success(res, cb, fcb)
            }
        ).catch(e => error(e, fcb))
}

/**
 * 调用成功的处理
 */
const success = ({ data: vo }, cb, fcb) => {
    let { code, info, data } = vo
    '0000' === code ? cb && cb(data) : fcb ? fcb(vo) : message.warning(info)
}

/**
 * 调用失败
 */
const error = (e, fcb) => {
    console.log(e)
    fcb ? fcb({ code: '400', info: '请求出错咯' }) : message.warning('请求出错咯~')
}


/**
 * 将cookie字符串转换为对象
 * 
 * @param {string} cookieStr cookie字符串
 */
export const cookied = cookieStr => {
    if (cookieStr) {
        let cookie = {}
        for (let item of cookieStr.split(';')) {
            let parts = item.split('=').join().trim().split(',');
            cookie[parts[0]] = parts[1]
        }
        return cookie
    }
}
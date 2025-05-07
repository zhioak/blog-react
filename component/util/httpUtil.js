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
 * 封装post请求,
 * 服务端请求默认携带浏览器的请求头，设置cookie响应头
 * 
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @param {fucntion} cb 成功回调
 * @param {function} fcb 失败回调 默认使用消息提示
 * @param {IncomingMessage} request 浏览器请求
 * @param {ServerResponse} response 浏览器响应
 */
export const httpPost = ({ url, data, cb, fcb, request, response }) => {
    let headers
    if (request) {
        headers = request.headers
        headers['zhioak-server-side'] = true
    }
    axios.post(url, qs.stringify(data, { allowDots: true }), headers && { headers })
        .then(
            res => {
                if (response) {
                    let cookie = res.headers['zhioak-blog-token']
                    cookie && response.setHeader('Set-Cookie', cookie)
                } else if ('0200' === res.data.code) {
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
    fcb ? fcb({ code: '400', info: '请求出错咯' }) : message.error('请求出错咯~')
}

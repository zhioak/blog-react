import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import localUtil from './localUtil'


/**
 * cookie携带
 */
axios.defaults.withCredentials = true

/**
 * 
 * 封装post请求
 * 
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @param {boolean} ssr 是否在服务器端渲染
 * @param {object} headers 请求头
 * @param {fucntion} cb 成功回调
 * @param {function} fcb 失败回调 默认使用消息提示
 */
export const httpPost = ({ url, data, ssr = false, headers, cb, fcb }) => {

    ssr && data ? data.ssr = ssr : data = { ssr }
    axios.post(url, qs.stringify(data), headers && { headers })
        .then(
            res => {
                console.log(res.headers['content-type'])
                let { code, info, data } = res.data
                switch (code) {
                    case '0200':
                        !ssr && localUtil.remove('menuList', 'snsMap')
                    case '0000':
                        cb && cb(data)
                        break
                    default:
                        fcb ? fcb(res.data) : message.warning(info)
                }
            }
        ).catch(err => {
            console.log(err)
            fcb ? fcb({ code: '400', info: '请求出错咯' }) : message.warning('请求出错咯~')
        })
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
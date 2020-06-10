import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import apiMap from '../../config/apiMap'



export const initPost = (options) => {
    if (!options.data) {
        options.data = {}
    }
    let cookie = cookied(options.cookie)
    if (cookie && cookie.token) {
        options.data.token = cookie.token
        httpPost(options)
        return
    }

    httpPost({
        url: apiMap.init,
        cb: idata => {
            options.data.token = idata.token
            let ocb = options.cb
            options.cb = data => {
                console.log('a')
                data.outsider = idata
                ocb(data)
            }
            httpPost(options)
        },
        fcb: res => resolve({ error: res })
    })
}


export const tokenPost = (options) => {
    if (!options.data) {
        op
        tions.data = {}
    }
    const storage = window.localStorage
    if (!storage) {
        return console.log('in server side or disable localStorage')
    }
    options.data.token = storage.getItem('token')
    httpPost(options)
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
    data = qs.stringify(data)
    axios.post(url, data)
        .then(
            res => {
                let { code, info, data } = res.data
                code === '0000' ? cb && cb(data) : fcb ? fcb(res.data) : message.warning(info)
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
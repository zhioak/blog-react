/**
 * localStorage 封装工具
 * 
 * 只有在客户端渲染时才有效
 */
const localUtil = {

    get: key => window.localStorage.getItem(key),

    getObj: key => JSON.parse(localUtil.get(key)),

    set: (key, value) => {
        
        window.localStorage.setItem(key, value)
        console.log('保存local')
    },

    setObj: (key, value) => localUtil.set(key, JSON.stringify(value)),

    remove: (...keys) => {
        for (let key of keys) {
            window.localStorage.removeItem(key)
        }
    }
}


export default localUtil



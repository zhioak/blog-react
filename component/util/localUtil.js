/**
 * localStorage 封装工具
 * 
 * 只有在客户端渲染时才有效
 */
const localUtil = {

    get: key => window.localStorage.getItem(key),

    getObj: key => JSON.parse(localUtil.get(key)),

    set: (key, value) => window.localStorage.setItem(key, value),

    setObj: (key, value) => localUtil.set(key, JSON.stringify(value)),

    /**
     * 将对象的属性独立存储
     */
    setEach: outsider => {
        for (let k in outsider) {
            let v = outsider[k]
            typeof v === 'object' ? localUtil.setObj(k, v) : localUtil.set(k, v)
        }
    }
}


export default localUtil



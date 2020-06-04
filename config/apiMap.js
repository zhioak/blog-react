const gate = 'http://192.168.1.50:8080/'

const apiMap = {
    detail: gate + 'blog/get',
    type: gate + 'blog/type/get',
    list: gate + 'blog/list',
    menuList: gate + 'menu/list',
    dictData: gate + 'dict/dataList'
}

export default apiMap

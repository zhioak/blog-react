const gate = 'http://192.168.1.80:8080/'

const apiMap = {
    init: gate + 'init',
    detail: gate + 'blog/get',
    type: gate + 'blog/type/get',
    list: gate + 'blog/list',
    menuList: gate + 'menu/list',
    dictDataList: gate + 'dict/dataList',
    dictDataMap: gate + 'dict/dataMap',
}

export default apiMap

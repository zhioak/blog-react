const gate = 'http://192.168.1.80:8080/'

const apiMap = {
    detail: gate + 'blog/get',
    type: gate + 'blog/type/get',
    list: gate + 'blog/list',
    commentList: gate + 'comment/list',
    menuList: gate + 'menu/list',
    snsMap: gate + 'dict/snsMap',
}

export default apiMap

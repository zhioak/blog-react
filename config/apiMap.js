const gate = 'http://192.168.1.80:8080/'
// const gate = 'http://192.168.199.9:8080/'

const apiMap = {
    detail: gate + 'blog/get',
    type: gate + 'blog/type/get',
    list: gate + 'blog/list',
    menuList: gate + 'menu/list',
    snsMap: gate + 'dict/snsMap',
    commentList: gate + 'comment/list',
    replyList: gate + 'comment/reply/list',
}

export default apiMap

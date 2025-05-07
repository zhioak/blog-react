// const gate = 'https://zhioak.blog/blog-service/'
// const gate = 'http://192.168.3.68:8081/'
const gate = 'http://127.0.0.1:8081/'

const apiMap = {
    list: gate + 'blog/list',
    detail: gate + 'blog/get',
    type: gate + 'blog/type/get',
    menuList: gate + 'menu/list',
    snsMap: gate + 'dict/snsMap',
    getVisitor: gate + 'visitor/get',
    saveComment: gate + 'comment/save',
    commentList: gate + 'comment/list',
    replyList: gate + 'comment/reply/list'
}

export default apiMap

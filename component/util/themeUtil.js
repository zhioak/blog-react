import less from 'less'


export const modifyVars = (vars) => {
    !less.options.javascriptEnabled && loadSheet()
    less.modifyVars(vars)
        .catch(e => console.log('切换主题失败', e))
}

function loadSheet() {
    const link = document.createElement('link')
    Object.assign(link, {
        rel: 'stylesheet/less',
        type: 'text/css',
        href: '/_next/static/theme.less'
    })
    less.sheets = [link]
    less.options.javascriptEnabled = true
}
import less from 'less'
import nextConfig from 'next/config'
const { themes, sheetURI } = nextConfig().publicRuntimeConfig.dynamicTheme

export const modifyVars = (vars) => {
    !less.options.javascriptEnabled && loadSheet()
    less.modifyVars(vars)
        .catch(e => console.log('主题切换失败', e))
}

export const changeTheme = (name) => {
    let theme = themes[name]
    theme ? modifyVars({ ...themes.default, ...theme }) : console.log(`未找到 ${name} 主题`)
}

function loadSheet() {
    const link = document.createElement('link')
    Object.assign(link, {
        rel: 'stylesheet/less',
        type: 'text/css',
        href: sheetURI
    })
    less.options.javascriptEnabled = true
    less.sheets = [link]
}
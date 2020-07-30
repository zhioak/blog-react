import less from 'less'
import nextConfig from 'next/config'
const { themes, sheetURI } = nextConfig().publicRuntimeConfig.liveTheme

export const localThemeKey = 'current-theme'

export const presetTheme = {
    default: 'default',
    dark: 'dark'
}

export const modifyVars = (vars, cb) => {
    !less.options.javascriptEnabled && loadSheet()
    less.modifyVars(vars)
        .then(() => cb && cb())
        .catch(e => console.log('主题切换失败', e))
}

export const changeTheme = (name, cb) => {
    let theme = themes[name]
    theme ? modifyVars(theme === themes.default ? theme.default : { ...themes.default, ...theme }, cb) : console.log(`未找到 ${name} 主题`)
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
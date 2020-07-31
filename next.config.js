const path = require('path')
const withCss = require('@zeit/next-css')
const withAntd = require('./config/next-antd.config')
const withLiveTheme = require('./config/live-theme.config')

if (typeof require !== 'undefined') {
    require.extensions['.less'] = () => { }
    require.extensions['.css'] = file => { }
}

// 获取自定义主题
const fs = require('fs')
const lessToJS = require('less-vars-to-js')
const vars = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './static/style/vars.less'), 'utf8')
)

module.exports = withCss(withAntd(withLiveTheme({
    liveTheme: {
        stylesDir: path.join(__dirname, './static/style'),
        antDir: path.join(__dirname, './node_modules/antd'),
        customDir:path.join(__dirname,'./static/theme'),
        varFile: path.join(__dirname, './static/style/vars.less')
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: vars,
    }
})))
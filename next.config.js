const path = require('path')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withDynamicTheme = require('./dynamic-theme')
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

module.exports = withCss(withLess(withDynamicTheme({
    dynamicTheme: {
        stylesDir: path.join(__dirname, './static/style'),
        antDir: path.join(__dirname, './node_modules/antd'),
        varFile: path.join(__dirname, './static/style/vars.less'),
        mainLessFile: path.join(__dirname, './static/style/main.less')
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: vars,
    },
    webpack(config) {
        if (config.externals) {
            const includes = [/antd/]
            config.externals = config.externals.map(external => {
                if (typeof external !== 'function') return external
                return (ctx, req, cb) => {
                    return includes.find(include =>
                        req.startsWith('.')
                            ? include.test(path.resolve(ctx, req))
                            : include.test(req)
                    )
                        ? cb()
                        : external(ctx, req, cb)
                }
            })
        }
        return config;
    }
})))

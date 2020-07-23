const fs = require('fs')
const path = require('path')
const { generateTheme } = require('antd-theme-generator')

module.exports = (nextConfig = {}) => Object.assign({}, nextConfig, {
    webpack(config) {
        config.plugins.push({
            apply: (compiler) => {
                compiler.hooks.emit.tapAsync('initTheme', async (compilation, cb) => {
                    let options = nextConfig.dynamicTheme
                    options.outputFilePath = __dirname + '/.next/static/theme.less'
                    const dir = path.dirname(options.outputFilePath)
                    !(await fs.existsSync(dir)) && await fs.mkdirSync(dir)
                    generateTheme(options)
                    cb()
                })
            }
        })
        return config
    }
})
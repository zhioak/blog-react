const fs = require('fs')
const path = require('path')
const { generateTheme, getLessVars } = require('antd-theme-generator')


const sheetURI = '/_next/static/theme.less',
    sheetPath = path.join(__dirname, '../.next/static/theme.less')

module.exports = (nextConfig = {}) => {
    const {
        antDir,
        themeVariable = {}
    } = nextConfig.dynamicTheme

    // 获取主题
    const themes = {}
    let themeDir = path.join(antDir, 'lib/style/themes')
    fs.readdirSync(themeDir).map(theme => {
        let res = /(.*)\.less/.exec(theme)
        res && res[1] !== 'index' && (themes[res[1]] = getLessVars(path.join(themeDir, theme)))
    })

    return Object.assign({}, nextConfig, {
        publicRuntimeConfig: {
            ...nextConfig.publicRuntimeConfig,
            dynamicTheme: {
                themes,
                sheetURI
            }
        },
        webpack(config) {
            config.plugins.push({
                apply: (compiler) => {
                    compiler.hooks.afterCompile.tapAsync('generateTheme', async (compilation, cb) => {
                        // 生成主题
                        let dir = path.dirname(sheetPath)
                        !(await fs.existsSync(dir)) && await fs.mkdirSync(dir)
                        generateTheme({
                            ...nextConfig.dynamicTheme,
                            outputFilePath: sheetPath,
                            themeVariables: Array.from(
                                new Set(Object.keys(themes.dark)
                                    .concat(Object.keys(themes.default))
                                    .concat(Object.keys(themeVariable))
                                ))
                        })
                        cb()
                    })
                }
            })
            return config
        }
    })
}
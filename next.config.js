

const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

// 自定义主题
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const vars = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './static/style/vars.less'), 'utf8')
)

module.exports = withLess(withCSS({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: vars, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antRegix = /antd\/.*?\/style.*?/
      const orignExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antRegix)) return callback()
          if (typeof orignExternals[0] === 'function') {
            orignExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof orignExternals[0] === 'function' ? [] : orignExternals),
      ]

      config.module.rules.unshift({
        test: antRegix,
        use: 'null-loader',
      })
    }
    return config
  }
}))


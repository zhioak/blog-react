const path = require('path')
const { generateTheme } = require('antd-theme-generator')

const options = {
    stylesDir: path.join(__dirname, './static/style'),  // css文件夹
    antDir: path.join(__dirname, './node_modules/antd'), // antd目录
    varFile: path.join(__dirname, './static/style/vars.less'), // less的变量
    mainLessFile: path.join(__dirname, './static/style/main.less'), // main文件，可以为空，不然会报错
    outputFilePath: path.join(__dirname, './static/theme.less'), // 输出的主题文件 千万不要放在style文件夹下，否则会导致循环生成，困扰了我好久
}

generateTheme(options).then(less => {
    console.log('Theme generated successfully')
}).catch(error => {
    console.log('Error', error)
})
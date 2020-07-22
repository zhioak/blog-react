import dynamic from 'next/dynamic'
import less from 'less'

var sheet
export const modifyVars = (vars) => {
    console.log(less.sheets)
    !sheet && loadTheme()
    console.log('a')
    less.modifyVars(vars).catch(e => console.log('切换主题失败', e))
}

function loadTheme() {
    const link = document.createElement('link');
    link.rel = 'stylesheet/less';
    link.type = 'text/css';
    link.href = '../..//static/theme.less';
    less.sheets = [link]
    console.log(link)
}



  
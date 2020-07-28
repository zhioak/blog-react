import { Anchor } from 'antd'
import hljs from 'highlight.js'
import marked from 'marked'

import '../../static/style/component/toc.css'
import 'highlight.js/styles/monokai-sublime.css'

/**
 * marked 全局配置
 */
marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: code => hljs.highlightAuto(code).value
})

/**
 * 封装 marked 工具，配置全局并支持使用目录
 * 
 * @param {string} markdown markdown文本
 * @param {Toc} toc 
 */
export default (markdown, toc) => {
    const renderer = new marked.Renderer()
    renderer.tablecell = (text, { header, align }) => {
        return header ?
            `<th style="text-align:${align}">${text}</th>` :
            `<td style="text-align:${align}">${text}</td>`
    }
    renderer.link = (href, title, text) => `<a href="${href}" target="_blank" rel="nofollow" title="${title}">${text}</a> `
    if (toc) {
        renderer.heading = (text, level) => {
            let anchor = toc.add(text, level)
            return `<h${level} id="${anchor}">${text}</h${level}>\n`
        }
    }
    marked.setOptions({ renderer })
    return marked(markdown)
}


const { Link } = Anchor



/**
 * 目录
 */
export class Toc {

    tree = []
    index = 0

    /**
     * 添加目录
     */
    add(text, level) {
        let anchor = `toc-${level}${++this.index}`,
            node = { anchor, level, text }
        this.getTrunk(level, this.tree).push(node)
        return anchor
    }

    /**
     * 获取节点树干
     */
    getTrunk = (level, nodes) => {
        if (0 === nodes.length) {
            return nodes
        }
        let node = nodes[nodes.length - 1]
        return level === node.level ?
            nodes :
            !node.nodes ?
                node.nodes = [] :
                this.getTrunk(level, node.nodes)
    }

    /**
     * 目录是否为空
     */
    isEmpty() {
        return 0 === this.tree.length
    }

    /**
     * 渲染节点
     */
    renderNodes(nodes) {
        return nodes.map(({ anchor, text, nodes }) => (
            <Link key={anchor} href={'#' + anchor} title={text}>
                {nodes && this.renderNodes(nodes)}
            </Link>
        ))
    }

    /**
     * 渲染目录
     */
    render() {
        return (
            <Anchor
                style={{ maxHeight: '60vh' }}
                className="toc"
                targetOffset={48}
                onClick={(e) => e.preventDefault()}
            >
                {this.renderNodes(this.tree)}
            </Anchor>
        )
    }
}







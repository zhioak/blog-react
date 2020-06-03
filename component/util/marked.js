import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: code => {
        return hljs.highlightAuto(code).value
    }
})


export default (markdown, tocify) => {
    console.log('marked render')

    const renderer = new marked.Renderer()
    if (tocify) {
        renderer.heading = (text, level) => {
            const anchor = tocify.add(text, level);
            return `<Link href="#${anchor}"><a id="${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a></Link>\n`;
        }
    }

    marked.setOptions({ renderer })
    return marked(markdown)
}


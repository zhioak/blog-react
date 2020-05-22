
import '../static/style/component/banner.css'


const Banner = ({ bg, title = '记录生活 分享技术', desc='编程是一门艺术，生活亦是如此' }) => (
    <div className="banner" style={bg && { backgroundImage: `url(${bg})` }}>
        <div className="banner-holder">
            <div className="banner-title">{title}</div>
            <div>
                {desc}
            </div>
        </div>
    </div>
)

export default Banner
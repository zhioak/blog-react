
import '../static/style/component/banner.css'

const Banner = ({ bg, title, desc }) => (
    <div className="banner" style={{ backgroundImage: `url(${bg})` }}>
        <div className="banner-holder">
            <div className="banner-title">{title}</div>
            <div>
                {desc}
            </div>
        </div>
    </div>
)

export default Banner
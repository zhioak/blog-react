import '../static/style/component/banner.less'
const Banner = ({ bg, title, desc }) => (
    <div className="banner" style={bg ? { backgroundImage: `url(${bg})` } : {}} >
        <div className="banner-holder">
            <div className="banner-title">{title}</div>
            <div>{desc}</div>
        </div>
    </div >
)
export default Banner
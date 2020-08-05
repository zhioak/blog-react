import '../static/style/component/banner.css'
const Banner = ({ bg, title, desc }) => (
    <div className="banner" style={bg ? { backgroundImage: `url(${bg})` } : {}} >
        <div className="banner-title">{title}</div>
        <div>{desc}</div>
    </div >
)
export default Banner
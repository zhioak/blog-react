import { Avatar } from 'antd'

import '../static/style/component/blogger.css'


const Blogger = () => {
    return (
        <div className="blogger zbox">
            <div>
                <Avatar
                    shape="square"
                    size={128}
                    src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2292059386,809594845&fm=26&gp=0.jpg"
                />
            </div>
            <div className="name">zhou</div>
        </div>
    )
}

export default Blogger
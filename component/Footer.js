import { CopyrightCircleOutlined, GithubOutlined, MailOutlined, WechatOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import '../static/style/component/footer.css'


const size = 28

const Footer = () => (
    <div className="footer">
        <div className='contacts'>
            <Tooltip title="flyingnoob@qq.com">
                <Avatar size={size} icon={<MailOutlined />} className="contact" />
            </Tooltip>
            <Tooltip title={(<img width='200px' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588935630069&di=179719079f753f776094898837506514&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3381390367%2C3810581293%26fm%3D214%26gp%3D0.jpg' />)}>
                <Avatar size={size} icon={<WechatOutlined />} className="contact" />
            </Tooltip>
            <Tooltip title="https://github.com/er222er">
                <a href="https://github.com/er222er" target="_blank">
                    <Avatar size={size} icon={<GithubOutlined />} className="contact" />
                </a>
            </Tooltip>
        </div>

        <div>由 React+Node+Ant Desgin 驱动</div>
        <div>
            <CopyrightCircleOutlined /> 2020 zhou  
        </div>
    </div>
)

export default Footer
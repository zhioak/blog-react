import { CopyrightCircleOutlined } from '@ant-design/icons'
import '../static/style/component/footer.css'


/**
 * 公用页脚
 */
export default () => {
    
    return (
        <div className="footer">
            <div>Powered by React & Ant Desgin</div>
            <div>
                <CopyrightCircleOutlined /> 2020 zhousb
        </div>
        </div>
    )
}
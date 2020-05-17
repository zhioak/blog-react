import { CopyrightCircleOutlined } from '@ant-design/icons'
import '../static/style/component/footer.css'

export default () => {
    
    console.log('profile render')

    return (
        <div className="footer">
            <div>Powered by React & Ant Desgin</div>
            <div>
                <CopyrightCircleOutlined /> 2020 zhousb
        </div>
        </div>
    )
}
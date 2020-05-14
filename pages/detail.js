import { Breadcrumb } from 'antd'
import ReactMarkdown from 'react-markdown'

import { CalendarFilled, EyeFilled } from '@ant-design/icons'


import '../static/style/pages/detail.css'

const { Item } = Breadcrumb;



let markdown = '# 千佛山游玩的一天\n' +
    '大致计划为\n' +
    '1.去**东北**\n' +
    '2.去**东北**\n' +
    '3.去**东北**\n' +
    '***\n' +
    '引用鲁迅的一句话就是\n' +
    '> 活得很好啊朋友' +
    '这是我的*二维码*\n' +
    '![qrCode](https://zhousb.cn/blog/wechatQR.png) \n' +
    '这是我做的商品展示\n' +
    '[mini-mall](https://zhousb.cn/mini-mall/#/) \n' +
    '我学过这些代码\n' +
    '`public static void main(){System.out.println("hello world");}`\n'





const Detail = () => {

    return (
        <div className="detail">
            <div className="crumb">
                <Breadcrumb>
                    <Item>
                        HOME
                    </Item>
                    <Item>
                        相册
                    </Item>
                    <Item>济南 - 千佛山尽快尽快劳动纪律卡萨丁解散</Item>
                </Breadcrumb>
            </div>

            <div>
                <div className="title">济南 - 千佛山尽快尽快劳动纪律卡萨丁解散</div>
                <div className="detail-meta">
                    <div><CalendarFilled /> 2020-02-10</div>
                    <div><EyeFilled /> 1553</div>
                </div>
            </div>

            <div className="detail-content">
                <ReactMarkdown
                    source={markdown}
                    escapeHtml={false}
                />
            </div>
        </div>
    )

}

export default Detail
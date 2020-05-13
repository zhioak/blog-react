import { Breadcrumb } from 'antd'
import Footer from '../component/Footer'

import { CalendarFilled, EyeFilled } from '@ant-design/icons'


import '../static/style/pages/detail.css'

const { Item } = Breadcrumb;

const Detail = () => {

    return (
        <>
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
                <div className="detail-title">济南 - 千佛山尽快尽快劳动纪律卡萨丁解散</div>
                <div className="detail-meta">
                    <div><CalendarFilled /> 2020-02-10</div>
                    <div><EyeFilled /> 1553</div>
                </div>
            </div>

            <div className="detail-content">
                <div>
                    fdsfasfasdfsdafasflksadfjasdlkfjs adlkf asdl;f jaslf;ajsfk;lja ;sldfja sdfsa d;lf
                </div>
                <div>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588994882256&di=352d50974c874d68d2f547f4f63333f2&imgtype=0&src=http%3A%2F%2Femm.zhengbang.com.cn%2Fbuilder%2Fimages%2Fsinomach%2Fsinomach-logovi-01.jpg" />
                </div>
                <div>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588994882256&di=352d50974c874d68d2f547f4f63333f2&imgtype=0&src=http%3A%2F%2Femm.zhengbang.com.cn%2Fbuilder%2Fimages%2Fsinomach%2Fsinomach-logovi-01.jpg" />
                </div>
                <div>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588994882256&di=352d50974c874d68d2f547f4f63333f2&imgtype=0&src=http%3A%2F%2Femm.zhengbang.com.cn%2Fbuilder%2Fimages%2Fsinomach%2Fsinomach-logovi-01.jpg" />
                </div>
                <div>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588994882256&di=352d50974c874d68d2f547f4f63333f2&imgtype=0&src=http%3A%2F%2Femm.zhengbang.com.cn%2Fbuilder%2Fimages%2Fsinomach%2Fsinomach-logovi-01.jpg" />
                </div>
                <div>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588994882256&di=352d50974c874d68d2f547f4f63333f2&imgtype=0&src=http%3A%2F%2Femm.zhengbang.com.cn%2Fbuilder%2Fimages%2Fsinomach%2Fsinomach-logovi-01.jpg" />
                </div>
            </div>
            <Footer />
        </>
    )

}

export default Detail
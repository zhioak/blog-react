import { useContext } from 'react'
import { Drawer } from 'antd'
import { siderVisibleContext } from './Layout'

import '../static/style/component/sider.css'


export default ({ render }) => {
    
    const { siderVisible: drawerVisible, setSiderVisible: setDrawerVisible } = useContext(siderVisibleContext)

    const drawerTrigger = (
        <div onClick={() => setDrawerVisible(!drawerVisible)} className={`drawer-tigger`}>
            <i className="drawer-tigger-icon"></i>
        </div>
    )
    
    return (
        <>
            <div className="zsider">
                {render}
            </div>
            <Drawer
                className="zdrawer"
                placement="left"
                width={200}
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                handler={drawerTrigger}
            >
                {render}
            </Drawer>
        </>
    )
}
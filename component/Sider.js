import { useState,useContext } from 'react'
import {Drawer } from 'antd'
import  {drawerVisibleContext} from './Layout'
import '../static/style/component/sider.css'


export default ({ bodyRender }) => {
    const [drawerVisible, setDrawerVisible] = useContext(drawerVisibleContext)


    const drawerTrigger = (
        <div onClick={() => setDrawerVisible(!drawerVisible)} className={`drawer-tigger`}>
            <i className="drawer-tigger-icon"></i>
        </div>
    )

    return (
        <>
            <div className="zsider">
                {bodyRender}
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
                {bodyRender}
            </Drawer>
        </>
    )
}
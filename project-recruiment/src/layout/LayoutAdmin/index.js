import { Layout } from "antd";
import Header from "./Header";
import {Outlet} from "react-router-dom";
import MenuSider from "./MenuSider";
import "./LayoutAdmin.scss";
import { useState } from "react";

const { Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout className="layout-admin">
                <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Layout>
                    <Sider className="sider" collapsed={collapsed} theme="dark">
                        <MenuSider />
                    </Sider>
                    <Content className="content" >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutAdmin;
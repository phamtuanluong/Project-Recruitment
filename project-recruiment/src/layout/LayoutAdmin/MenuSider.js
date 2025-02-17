import { Menu } from "antd";
import { ClockCircleOutlined, FileDoneOutlined, MenuOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import "./LayoutAdmin.scss";
import { Link } from "react-router";

const items = [
    {
        key: '1',
        icon: <Link to="/admin"><ClockCircleOutlined /></Link>,
        label: 'Tổng quan',
    },
    {
        key: '2',
        icon: <Link to="/settingcompany"><UserOutlined /></Link>,
        label: 'Thông tin công ty',
    },
    {
        key: '3',
        icon: <Link to="/managerjob"><MenuOutlined /></Link>,
        label: 'Quản lý việc làm',
    },
    {
        key: '4',
        icon: <Link to="/managercv"><FileDoneOutlined /></Link>,
        label: 'Quản lý CV',
    }
]

function MenuSider() {

    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </>
    )
}
export default MenuSider;
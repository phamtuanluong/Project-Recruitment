import { Link, NavLink } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import "./LayoutDefault.scss";
import { Button, Dropdown, Space } from 'antd';

function Header() {
    const token = getCookie("token");

    const isLogin = useSelector(state => state.loginReducer);

    return (
        <>
            <header className="layout-default__header">
                <div className="layout-default__logo">
                    <Link to="/" className="logo">TL JOBS</Link>
                </div>
                <div className="layout-default__menu">
                    {token ? (
                        <>
                            <div style={{padding: "26px"}}>
                            </div>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/jobs">All Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/companys">IT Companies</Link>
                                </li>
                                <li>
                                    <Link to="/">Blog</Link>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
                <div className="layout-default__account">
                    {token ? (
                        <>
                            <NavLink to="/admin">
                                <Button>Quản lý</Button> 
                            </NavLink>
                            <NavLink to="/logout">
                                <Button>Đăng xuất</Button> 
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button>Đăng nhập</Button> 
                            </NavLink>
                            <NavLink to="/register">
                                <Button>Đăng ký</Button> 
                            </NavLink>
                        </>
                    )}
                </div>
            </header>
        </>
    )
}
export default Header;
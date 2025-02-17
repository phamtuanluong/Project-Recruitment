import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router";
import "./LayoutAdmin.scss";
import { useState } from "react";

function Header({collapsed, setCollapsed}) {

    return (
        <>
            <header className="header">
                <div className={`header__logo ${collapsed ? "header__logo--collapsed" : ""}`}>
                    {collapsed ? (
                        <>
                            <Link className="header__logo--collapsed" to="#" style={{color: "#fff"}}>TLA</Link>
                        </>
                    ) : (
                        <>
                            <Link to="#" style={{color: "#fff"}}>TL ADMIN</Link>
                        </>
                    )}
                </div>
                <div className="header__nav">
                    <div className="header__nav--left">
                        <div className="header__collapse" onClick={() => setCollapsed(!collapsed)}>
                            <MenuUnfoldOutlined />
                        </div>
                    </div>
                    <div className="header__nav--right" >
                        <div className="mr-20">
                            <Button>
                                <Link to="/">Trang chủ</Link>
                            </Button>
                            <Button className="ml-10">
                                <Link to="/logout">Đăng xuất</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;

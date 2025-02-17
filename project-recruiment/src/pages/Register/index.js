import {Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router";
import { checkExits, register } from "../../services/usersService";
import { useEffect, useState } from "react";
import {generateToken} from "../../helpers/generateToken";

function Register(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const handleFinish = async (e) => {
        const email = e.email;
        const password = e.password;
        const phone = e.phone;
        const nameCompany = e.nameCompany;
        const checkExitEmail = await checkExits("email", email);

        if(checkExitEmail.length > 0){
            alert("Email đã tồn tại!");
        } else{
            const options = {
                email: email,
                password: password,
                phone: phone,
                nameCompany: nameCompany,
                token: generateToken(),
            }
            const response = await register(options);
            if(response){
                alert("Đăng kí thành công!");
                navigate("/login");
            }
        }
    }
    
    return (
        <>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <h1 style={{marginLeft: "200px"}}>Register</h1>
                </Col>
                <Col span={24}>
                    <Form
                        name="register"
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        labelCol={{ span: 4 }}
                        onFinish={handleFinish}
                    >
                        <Form.Item name="nameCompany" label="Tên công ty" rules={[{ required: true, message: "Please input your name company!" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your email!" }]}>
                            <Input  />
                        </Form.Item>

                        <Form.Item name="phone" label="Số điện thoại">
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button style={{marginTop: "15px", marginLeft: "200px", padding: "20px"}} htmlType="submit" >
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
export default Register;
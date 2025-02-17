import { Row, Col, Form, Input, Button } from "antd";
import { login } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import { setCookie } from '../../helpers/cookie';
import { useDispatch } from "react-redux";
import { checkLogin } from '../../actions/login';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hanldeFinish = async(e) => {
        const username = e.username;
        const password = e.password;
        const response = await login(username, password);
        if(response.length > 0){
            setCookie("id", response[0].id, 1);
            setCookie("fullName", response[0].companyName, 1);
            setCookie("email", response[0].email, 1);
            setCookie("token", response[0].token, 1);
            dispatch(checkLogin(true));
            navigate("/");
        }else{
            alert("Tài khoản hoặc mật khẩu của bạn không chính xác!");
        }
    }

    return (
        <>
            <Row >
                <Col span={24}>
                    <h1 style={{marginBottom: "30px", marginLeft: "200px"}}>Login</h1>
                </Col>

                <Col span={24}>
                    <Form name="login"
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={hanldeFinish}
                    >
                        <Form.Item name="username" label="Tài khoản" rules={[{ required: true, message: "Please input your username!" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item >
                            <Button style={{marginTop: "15px", marginLeft: "180px"}} htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
export default Login;
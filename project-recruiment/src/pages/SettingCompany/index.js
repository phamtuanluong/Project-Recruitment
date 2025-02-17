import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { CompanyEdit, getCompany } from "../../services/companyService";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import TextArea from "antd/es/input/TextArea";

function SettingCompany() {
    const idCompany = getCookie("id");
    const [info, setInfo] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();
    const [mess, contextHolder] = message.useMessage();

    const fetchApi = async () => {
        const response = await getCompany(idCompany);
        if (response) {
            setInfo(response);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleCancel = () => {
        setIsEdit(false);
        form.resetFields();
    }

    const handleFinish = async(values) => {
        const response = await CompanyEdit(idCompany, values);
        if(response){
            mess.success("Cập nhật thành công");
            fetchApi();
            setIsEdit(false);
        }
    }

    return (
        <>
            {contextHolder}

            {info && (
                <Card
                    title="Thông tin công ty"
                    extra={
                        !isEdit ? (
                            <Button onClick={handleEdit}>Chỉnh sửa</Button>
                        ) : (
                            <Button onClick={handleCancel}>Hủy</Button>
                        )
                    }
                >
                    <Form
                        name="info-company"
                        layout="vertical"
                        initialValues={info}
                        form={form}
                        disabled={!isEdit}
                        onFinish={handleFinish}
                    >
                        <Row gutter={[20,20]}>
                            <Col span={24}>
                                <Form.Item label="Tên công ty" name="companyName" rules={[{required: true, message: "Please enter your nameCompany"}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="Email" name="email" rules={[{required: true, message: "Please enter your email"}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="phone" label="Số điện thoại" rules={[{required: true, message: "Please enter your phone numeber"}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="address" label="Địa chỉ" rules={[{required: true, message: "Please enter your address"}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="quantityPeople" label="Số lượng nhân sự" rules={[{required: true, message: "Please enter your quantityPeople"}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="workingTime" label="Thời gian làm việc" rules={[{required: true, message: "Please enter your workingTime"}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="website" label="Website" rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item name="description" label="Mô tả ngắn" rules={[{required: true, message: "Please enter your description"}]}>
                                    <TextArea rows={6} />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item name="detail" label="Mô tả chi tiết" rules={[{required: true, message: "Please enter your detail"}]}>
                                    <TextArea rows={10} />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Button htmlType="submit" type="primary">
                                    Cập nhật    
                                </Button>                            
                            </Col>
                        </Row>
                    </Form>
                </Card>
            )}
        </>
    )
}
export default SettingCompany;
import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { JobCreate } from "../../services/jobService";
import {getCookie} from "../../helpers/cookie";
import {getTimeCurrent} from "../../helpers/getTimeCurrent";

function CreateJob() {
    const idCompany = getCookie("id");
    const [form] = Form.useForm();
    const [mess, contextHolder] = message.useMessage();

    const handleFinish = async (values) => {
        values.idCompany = idCompany;
        values.createAt = getTimeCurrent();
        const formattedValues = {
            ...values,
            tags: values.tags.split(",").map(item => item.trim()),
            city: values.city.split(",").map(item => item.trim())
        };
        
        const response = await JobCreate(formattedValues);
        if(response){
            mess.success("Tạo công việc thành công");
            form.resetFields(); 
        }
    };

    return (
        <>
            {contextHolder}

            <Card title="Thông tin việc làm">
                <Form name="create-job" layout="vertical" onFinish={handleFinish} form={form}>
                    <Row gutter={[10, 5]}>
                        <Col span={24}>
                            <Form.Item name="name" label="Tên công việc" rules={[{required: true, message: "Please enter your name job"}]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={16}>
                            <Form.Item name="tags" label="Tags" rules={[{required: true, message: "Please enter your tags"}]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="salary" label="Mức lương" rules={[{required: true, message: "Please enter your salary"}]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name="city" label="Thành phố" rules={[{required: true, message: "Please enter your city"}]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name="description" label="Mô tả" rules={[{required: true, message: "Please enter your description"}]}>
                                <TextArea rows={10} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name="status" valuePropName="checked">
                                <Switch checkedChildren="Bật" unCheckedChildren="Tắt"/>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Button htmlType="submit" >
                                Hoàn tất
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
export default CreateJob;
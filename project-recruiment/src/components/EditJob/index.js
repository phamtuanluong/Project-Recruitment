import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { editJob, getDetailJob } from "../../services/jobService";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import {getTimeCurrent} from "../../helpers/getTimeCurrent";

function EditJob({ record, onReload }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [jobs, setJobs] = useState([]);
    const [city, setCity] = useState([]);
    const [tags, setTags] = useState({ tags: [] });
    const [mess, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailJob(record.id);
            setJobs(response);
        }
        fetchApi();
    }, []);


    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleFinish = async (values) => {
        values.updateAt = getTimeCurrent();
        const response = await editJob(jobs.id, values);
        if(response){
            mess.success("Cập nhật thành công");
            onReload();
            setIsModalOpen(false);
        } else{
            mess.error("Cập nhật thất bại")
        }
    }

    return (
        <>
            {contextHolder}
            <div>
                <Tooltip title="Chỉnh sửa">
                    <Button icon={<EditOutlined />} onClick={showModal}>

                    </Button>
                    <Row gutter={[10, 10]}>
                        <Modal open={isModalOpen} onCancel={handleCancel} footer={null} width={800} >
                            <h2>Chỉnh sửa</h2>
                            <Form
                                name="EditJob"
                                initialValues={jobs}
                                form={form}
                                layout="vertical"
                                className="mt-40"
                                onFinish={handleFinish}
                            >
                                <Col span={24}>
                                    <Form.Item name="name" label="Tên công việc" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Row gutter={[20, 20]}>
                                    <Col span={16}>
                                        <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                            >
                                                {jobs.tags?.map(item => (
                                                    <Option value={item}>
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item name="salary" label="Mức lương" rules={[{ required: true }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Col span={24}>
                                    <Form.Item name="city" label="Thành phố" rules={[{ required: true }]} >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                        >
                                            {jobs.city?.map(item => (
                                                <Option value={item}>
                                                    {item}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item name="description" label="Mô tả" rules={[{required: true}]}>
                                        <TextArea rows={10} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Button htmlType="submit">
                                        Cập nhật
                                    </Button>
                                </Col>
                            </Form>
                        </Modal>
                    </Row>
                </Tooltip>
            </div>
        </>
    )
}
export default EditJob;
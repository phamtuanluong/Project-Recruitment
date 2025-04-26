import { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router";
import { getDetailJob } from "../../services/jobService";
import { Button, Card, Col, Form, Input, notification, Row, Select, Tag } from "antd";
import { getCompany } from "../../services/companyService";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { CreateCV } from "../../services/cvSevice";

function JobDetail() {
    const params = useParams();
    const [DetailJob, setDetailJob] = useState([]);
    const [form] = Form.useForm();
    const [noti, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailJob(params.id);
            const infoCompany = await getCompany(response.idCompany);

            const dataFinal = {
                ...response,
                infoCompany: infoCompany,
            }

            setDetailJob(dataFinal);
        }
        fetchApi();
    }, []);

    const onFinish = async (values) => {
        values.idJob = DetailJob.id;
        values.idCompany = DetailJob.idCompany;
        values.createAt = getTimeCurrent();
        const response = await CreateCV(values);

        if (response) {
            form.resetFields();
            noti.success({
                message: `Gửi yêu cầu thành công!`,
                description: "Nhà tuyển dụng sẽ sớm liên hệ với bạn!",
            })
        } else {
            noti.error({
                message: `Gửi yêu cầu không thành công`,
                description: "Hệ thống đang gặp lỗi, bạn vui lòng thử lại sau!",
            })
        }
    }

    const rules = [
        {
            required: true,
        }
    ]


    return (
        <>
            {contextHolder}
            {DetailJob &&
                <>
                    <Link to={`/companydetail/${params.id}`}><h1>{DetailJob.name}</h1></Link>
                    <Button
                        type="primary"
                        href="#formApply"
                        size="large"
                        className="button-apply"
                    >
                        ỨNG TUYỂN NGAY
                    </Button>

                    <div className="mb-20">
                        <span>Tags: </span>
                        {(DetailJob.tags || []).map((item, index) => (
                            <Tag style={{ marginLeft: "5px" }} color="blue" key={index}>
                                {item}
                            </Tag>
                        ))}
                    </div>

                    <div className="mb-20">
                        <span>Thành phố: </span>
                        {(DetailJob.city || []).map((item, index) => (
                            <Tag style={{ marginLeft: "5px" }} color="orange" key={index}>
                                {item}
                            </Tag>
                        ))}
                    </div>

                    <div className="mb-20">
                        <span>Mức lương: </span>
                        <strong>{DetailJob.salary}$</strong>
                    </div>

                    <div className="mb-20">
                        <span>Địa chỉ công ty: </span>
                        <strong>{DetailJob.infoCompany?.address || "Chưa cập nhật"}</strong>
                    </div>

                    <div className="mb-20">
                        <span>Thời gian đăng bài: </span>
                        <strong style={{ marginLeft: "5px" }}>{DetailJob.updateAt}</strong>
                    </div>

                    <div className="mb-20">
                        <span>Mô tả công việc: </span>
                        <span style={{ marginLeft: "5px", lineHeight: "2" }}>{DetailJob.description}</span>
                    </div>

                    <div className="mb-10">
                        <span>Mô tả công ty: </span>
                        <span>{DetailJob.infoCompany?.description || "Chưa có mô tả"}</span>

                    </div>

                    <div className="mb-20" style={{ lineHeight: "2" }}>
                        <span>Kỹ năng: </span>
                        <strong><div>- {DetailJob.infoCompany?.ourKeySkills?.[0] || "Chưa có kỹ năng"}</div></strong>
                        <strong><div>- {DetailJob.infoCompany?.ourKeySkills?.[1] || "Chưa có kỹ năng"}</div></strong>
                        <strong><div>- {DetailJob.infoCompany?.ourKeySkills?.[2] || "Chưa có kỹ năng"}</div></strong>
                    </div>

                    <Card title="ỨNG TUYỂN NGAY" id="formApply">
                        <Form
                            name="form_apply"
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Row gutter={[20, 20]}>
                                <Col xxl={6} xl={6} lg={6} md={8} sm={8}>
                                    <Form.Item name="name" label="Họ tên" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col xxl={6} xl={6} lg={6} md={8} sm={8}>
                                    <Form.Item name="phone" label="Số điện thoại" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col xxl={6} xl={6} lg={6} md={8} sm={8}>
                                    <Form.Item name="email" label="Email" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col xxl={6} xl={6} lg={6} md={8} sm={8}>
                                    <Form.Item name="city" label="Thành phố" rules={rules}>
                                        <Select >
                                            {(DetailJob.city || []).map((item, index) => (
                                                <Option key={index} value={item} label={item}>
                                                    {item}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item name="description" label="Giới thiệu bản thân" rules={rules}>
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item name="listProject" label="Danh sách link project" rules={rules}>
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>

                                <Col>
                                    <Form.Item>
                                        <Button htmlType="submit" type="primary">
                                            GỬI YÊU CẦU
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </>
            }
        </>
    )
}
export default JobDetail;
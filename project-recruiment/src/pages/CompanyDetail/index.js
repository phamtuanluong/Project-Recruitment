import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyService";
import { Link, useParams } from "react-router";
import { Button, Card, Col, Row, Tag } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { getListJob } from "../../services/jobService";

function CompanyDetail() {
    const params = useParams();
    const [companyDetail, setCompanyDetail] = useState({});
    const [jobDetail, setJobDetail] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getCompany(params.id);
            if (response) {
                setCompanyDetail(response);
            }
        }
        fetchApi();
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListJob(params.id);
            if (response) {
                setJobDetail(response);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            <Card style={{ padding: "30px", background: "#fff", border: "1px solid #000" }}>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <h1 style={{ margin: "10px 30px" }}>{companyDetail.companyName}</h1>
                        <p style={{ margin: "10px 30px", padding: "0px" }}><EnvironmentOutlined /> {companyDetail.address}</p>
                        <Button style={{ margin: "10px 30px", padding: "20px" }}>Write review</Button>
                    </Col>

                    <Col span={24} style={{ margin: "0px 30px" }}>
                        <strong style={{ fontSize: "18px" }}>Description: </strong>
                        <span style={{ lineHeight: "2" }}>{companyDetail.description}</span>
                    </Col>

                    {companyDetail?.ourKeySkills && companyDetail.ourKeySkills.length > 0 && (
                        <Col span={24} style={{ margin: "0px 30px" }}>
                            <strong><h2 style={{ marginTop: "0px", fontSize: "18px" }}>Our Key Skills:</h2></strong>
                            {companyDetail.ourKeySkills.map((skill, index) => (
                                <p key={index}>- {skill}</p>
                            ))}
                        </Col>
                    )}

                    <Col span={24} style={{ margin: "0px 30px" }}>
                        <strong style={{ fontSize: "18px" }}>Detail: </strong>
                        <span style={{ lineHeight: "2" }}>{companyDetail.detail}</span>
                    </Col>

                    <Col span={24} style={{ margin: "0px 30px" }}>
                        <span style={{ fontSize: "16px" }}> <strong>Quantity People:</strong> {companyDetail.quantityPeople} người</span>
                    </Col>

                    <Col span={24} style={{ margin: "0px 30px" }}>
                        <span style={{ fontSize: "16px" }}> <strong>Phone: </strong> {companyDetail.phone} </span>
                    </Col>

                    <Col span={24} style={{ margin: "0px 30px" }}>
                        <span style={{ fontSize: "16px" }}> <strong>Working Time: </strong> {companyDetail.workingTime} </span>
                    </Col>

                    <Col span={24} style={{ margin: "0px 30px" }}>
                        <span style={{ fontSize: "16px" }}> <strong>Email:</strong> {companyDetail.email} </span>
                    </Col>

                    {Array.isArray(jobDetail) && jobDetail.filter(data => data.status).map((data, index) => (
                        <Col span={8} key={index}>
                            <Link to={`/jobdetail/${data.id}`}>
                                <Card style={{ marginTop: "20px", height: "100%" }} title={data.name}>
                                    <p style={{ marginTop: "0px" }}>
                                        <strong>Ngôn ngữ: </strong>
                                        {(data.tags || []).map((item, index) => (
                                            <Tag key={index} color="cyan">
                                                {item}
                                            </Tag>
                                        ))}
                                    </p>
                                    <p><strong>Thành phố: </strong>
                                        {(data.city || []).map((item, index) => (
                                            <Tag color="geekblue" key={index}>
                                                {item}
                                            </Tag>
                                        ))}
                                    </p>
                                    <p><strong>Lương: </strong>{data.salary}$</p>
                                    <p><strong>Ngày tạo: </strong>{data.createAt}</p>
                                </Card>

                            </Link>
                        </Col>
                    ))}

                </Row>
            </Card>
        </>
    )
}
export default CompanyDetail;
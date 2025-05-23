import { useEffect, useState } from "react";
import { getAllJob } from "../../services/jobService";
import { Card, Col, Row, Tag } from "antd";
import { Link } from "react-router";

function Jobs(){
    const [job, setJob] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllJob();
            if(response) {
                setJob(response);
            }
        }
        fetchApi();
    }, [])

    return (
        <>  
            <h1 style={{marginBottom: "8px"}}>All Jobs Available</h1>
            <Row gutter={[20, 20]}>
                {job.filter(data => data.status).map((data) => (
                    <Col span={6}>
                        <Link to={`/jobdetail/${data.id}`}>
                            <Card style={{ marginTop: "20px", flex: "1", height: "300px" }} title={data.name}>
                                <p style={{ marginTop: "0px" }}>
                                    <strong>Ngôn ngữ: </strong>
                                    {(data.tags || []).map((item, index) => (
                                        <Tag color="cyan" key={index}>{item}</Tag>
                                    ))}
                                </p>
                                <p><strong>Thành phố: </strong>
                                    {(data.city || []).map((item, index) => (
                                        <Tag color="geekblue" key={index}>{item}</Tag>
                                    ))}
                                </p>
                                <p><strong>Lương: </strong>{data.salary}$</p>
                                <p><strong>Ngày tạo: </strong>{data.createAt}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default Jobs;
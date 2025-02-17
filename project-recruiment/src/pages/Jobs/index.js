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
                {job.map((data) => (
                    <Col xxl={6} xl={6}>
                        <Link to={`/jobdetail/${data.id}`}>
                            <Card style={{ marginTop: "20px" }} title={data.name}>
                                <p style={{ marginTop: "0px" }}>
                                    <strong>Ngôn ngữ: </strong>
                                    {Array.isArray(data.tags)
                                        ? data.tags.map((tag) => <Tag color="geekblue" key={tag}>{tag}</Tag>)
                                        : data.tags?.split(/[, ]+/).map((tag) => <Tag key={tag}>{tag}</Tag>)
                                    }
                                </p>
                                <p><strong>Thành phố: </strong><Tag color="geekblue">{data.city}</Tag></p>
                                <p><strong>Lương: </strong>{data.salary}$</p>
                                <p><strong>Ngày tạo: </strong>{data.updateAt}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default Jobs;
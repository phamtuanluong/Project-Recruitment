import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyService";
import { Card, Col, Row } from "antd";
import { Link } from "react-router";

function Companys() {
    const [company, setCompany] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllCompany();
            if (response) {
                setCompany(response);
            }
            
        }
        fetchApi();
    }, [])

    return (
        <>
            <h1>List of companies for developer</h1>
            <Row gutter={[20, 20]}>
                {company.filter(company => company.description).map(item => (
                    <Col span={6}>
                        <Link to={`/companydetail/${item.id}`}>
                            <Card style={{ marginTop: "20px", background: '#f0f2f5', color: '#333', height: "100%", flex: "1" }} headStyle={{
                                borderBottom: '1px solid #000',
                            }} bordered={false} title={item.companyName}>
                                <div style={{marginBottom: "10px"}}><strong> Description: </strong> {item.description}</div>
                                <div style={{marginBottom: "10px"}}><strong> Detail: </strong> {item.detail}</div>
                                <div style={{marginBottom: "10px"}}><strong> Address: </strong> {item.address}</div>
                                <div style={{marginBottom: "10px"}}><strong> WorkingTime: </strong> {item.workingTime}</div>
                                <div style={{marginBottom: "10px"}}><strong> Phone: </strong>{item.phone}</div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default Companys;
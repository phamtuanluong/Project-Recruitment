import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getAllCompany } from '../../services/companyService';
import { Link, NavLink } from "react-router-dom";
function CompanyList() {
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
            <Row gutter={[20, 20]}>
                {company.filter(company => company.description).map(item => (
                    <Col span={6} >
                        <Link to={`/companydetail/${item.id}`}>
                            <Card style={{marginTop: "20px", height: "100%"}} title={item.companyName}>
                                {item.description}
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default CompanyList;
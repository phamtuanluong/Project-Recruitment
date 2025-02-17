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

    console.log(company);

    return (
        <>
            <Row gutter={[20, 20]}>
                {company.map(item => (
                    <Col xxl={6} xl={6}>
                        <Link to={`/companydetail/${item.id}`}>
                            <Card style={{marginTop: "20px"}} title={item.companyName}>
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
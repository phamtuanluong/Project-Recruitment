import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { getAllCity } from "../../services/cityService";
import { useNavigate } from "react-router";
import "./searchForm.css";
import { SearchOutlined  } from "@ant-design/icons";

function SearchForm() {
    const [city, setCity] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllCity();
            if(response){
                const objAll = {
                    key: 0,
                    value: "All",
                }
                setCity([objAll, ...response]);
            }
        }
        fetchApi();
    }, [])

    const handleFinish = (e) => {
        let city = e.city || "";
        city = e.city === "All" ? "" : city;
        navigate(`/search?city=${city}&keyword=${e.keyword || ""}`);
    }

    return (
        <>
            <h1>1000+ IT JOBS FOR DEVELOPER</h1>
            {city && (
                <Form onFinish={handleFinish}>
                    <Row gutter={[20, 20]} >
                        <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Form.Item name="city">
                                <Select className="select__form" options={city} placeholder="Chọn thành phố" />
                            </Form.Item>
                        </Col>
                        <Col xxl={15} xl={15} lg={15} md={15} sm={15} xs={15}>
                            <Form.Item name="keyword">
                                <Input className="input__form" placeholder="Enter keywords skill (Java, ReactJS...), job title, company..." />
                            </Form.Item>
                        </Col>
                        <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
                            <Form.Item>
                                <Button className="button__search" htmlType="submit" block>
                                    <SearchOutlined />
                                    Tìm Kiếm
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </>
    )
}
export default SearchForm;
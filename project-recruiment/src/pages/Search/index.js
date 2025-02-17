import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getAllJob } from "../../services/jobService";
import { Card, Col, Row, Tag } from "antd";

function Search() {
    const [searchParam, setSearchParam] = useSearchParams();
    const citySearch = searchParam.get("city") || "";
    const keywordSearch = searchParam.get("keyword") || "";
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllJob();
            if (response) {
                const newData = response.filter((item) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const status = item.status;
                    return city && keyword && status;
                });
                setData(newData.reverse());
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            <strong>Kết quả tìm kiếm: </strong>
            {citySearch && <Tag color="blue">{citySearch}</Tag>}
            {keywordSearch  && <Tag color="blue">{keywordSearch}</Tag>}

            <Row gutter={[20, 20]}>
                {data.map((data) => (
                    <Col xxl={6} xl={6}>
                        <Link to={`/jobdetail/${data.id}`}>
                            <Card style={{ marginTop: "20px" }} title={data.name}>
                                <p style={{ marginTop: "0px" }}>
                                    <strong>Ngôn ngữ: </strong>
                                    {Array.isArray(data.tags)
                                        ? data.tags.map((tag) => <Tag color="green" key={tag}>{tag}</Tag>)
                                        : data.tags?.split(/[, ]+/).map((tag) => <Tag key={tag}>{tag}</Tag>)
                                    }
                                </p>
                                <p><strong>Thành phố: </strong><Tag color="green">{data.city}</Tag></p>
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
export default Search;
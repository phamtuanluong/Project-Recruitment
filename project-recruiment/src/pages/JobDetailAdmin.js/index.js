import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getDetailJob, getListJob } from "../../services/jobService";
import { Tag } from "antd";
import { useParams } from "react-router";

function JobDetailAdmin() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailJob(params.id);
            setData(response);
        }
        fetchApi();
    }, [])

    return (
        <>
            {data && (
                <div style={{ marginLeft: "20px" }}>
                    <h2 >{data.name}</h2>

                    <span style={{ fontSize: "15px" }}>Tags:
                        {(data.tags || []).map((item, index) => (
                            <Tag style={{ marginLeft: "5px" }} color="green" key={index}>{item}</Tag>
                        ))}
                    </span>

                    <div className="mt-20" style={{ fontSize: "15px" }}>
                        Mức lương:  <strong> {data.salary}$</strong>
                    </div>

                    <div className="mt-20" style={{ fontSize: "15px" }}>
                        Thành phố:

                        {(data.city || []).map((item, index) => (
                            <Tag style={{marginLeft: "5px"}} name="city" color="cyan" key={index}>
                                {item}
                            </Tag>
                        ))}

                    </div>

                    <div className="mt-20" style={{ fontSize: "15px" }}>
                        Ngày tạo: <strong>{data.createAt}</strong>
                    </div>

                    <div className="mt-20" style={{ fontSize: "15px" }}>
                        <span>
                            Trạng thái:
                            {data.status ? (
                                <>
                                    <Tag style={{ marginLeft: "8px" }} color="green">Đang bật</Tag>
                                </>
                            ) : (
                                <>
                                    <Tag style={{ marginLeft: "8px" }} color="gray">Đang tắt</Tag>
                                </>
                            )}
                        </span>
                    </div>

                    <div className="mt-20" style={{ fontSize: "15px", lineHeight: "2" }}>
                        Mô tả: {data.description}
                    </div>
                </div>

            )}
        </>
    )
}
export default JobDetailAdmin;
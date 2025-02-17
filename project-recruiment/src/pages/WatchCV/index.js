import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCV } from "../../services/cvSevice";
import { Card, Form } from "antd";

function WatchCV() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getCV(params.id);
            if (response) {
                setData(response);
            }
        }
        fetchApi();
    }, [])

    console.log(data);

    return (
        <>
            {data && (
                <Card title="Thông tin ứng viên" >
                    <span className="fz-16"><strong>Tên ứng viên:</strong> {data.name}</span>
                    <p className="fz-16"><strong>Số điện thoại:</strong> {data.phone}</p>
                    <span className="fz-16"><strong>Thành phố:</strong> {data.city}</span>
                    <p className="fz-16"><strong>Email:</strong>: {data.email}</p>
                    <span className="fz-16"><strong>Mô tả:</strong> {data.description}</span>
                    <p className="fz-16"><strong>Ngày tạo:</strong> {data.createAt}</p>
                </Card>
            )}
        </>
    )
}
export default WatchCV;
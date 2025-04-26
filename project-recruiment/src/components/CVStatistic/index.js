import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListCV } from "../../services/cvSevice";

function CVStatistic() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCV(idCompany);
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0,
                }
                obj.total = response.length;
                response.forEach((item) => {
                    item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
                })
                setData(obj);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {data &&
                <Card title="CV" size="small" style={{height: "100%"}}>
                    <span>Số lượng cv: <strong>{data.total }</strong> </span>
                    <p>CV đã đọc: <strong>{data.statusTrue}</strong></p>
                    <span>CV chưa đọc: <strong>{data.statusFalse}</strong></span>
                </Card>
            }
        </>
    )
}
export default CVStatistic;
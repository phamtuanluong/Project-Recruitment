import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService";

function JobStatistic() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async() => {
            const response = await getListJob(idCompany);
            if(response){
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0,
                }
                obj.total = response.length;
                response.forEach((item) => {
                    item.status ? obj.statusTrue++ : obj.statusFalse++;
                })
                setData(obj);
            }
        }
        fetchApi();
    }, []);

    return (
        <>
            {data && 
                <Card title="Job" size="small" style={{height: "100%"}}>
                    <span style={{fontSize: "14px"}}>Số lượng job: <strong> {data.total}</strong></span>
                    <p style={{fontSize: "14px"}}>Job đang bật: <strong> {data.statusTrue}</strong></p>
                    <span style={{fontSize: "14px"}}>Job đang tắt: <strong> {data.statusFalse}</strong></span>
                </Card>
            }
        </>
    )
}
export default JobStatistic;
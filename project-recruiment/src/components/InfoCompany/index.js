import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyService";

function InfoCompany() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getCompany(idCompany);
            if (response) {
                setData(response);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {data &&
                <Card title="Thông tin công ty" size="small">
                    <span><strong>{data.companyName}</strong></span>
                    <p>Email: {data.email}</p>
                    <span>Phone: {data.phone}</span>
                    <p style={{marginBottom: "0px"}}>Thành viên: {data.quantityPeople} người</p>
                </Card>
            }
        </>
    )
}
export default InfoCompany;
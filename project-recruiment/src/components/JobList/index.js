import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import {getListJob} from "../../services/jobService";
import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router";
import { EyeOutlined } from "@ant-design/icons";
import DeleteJob from "../DeleteJob";
import EditJob from "../EditJob";

function JobList(){
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);

    const fetchApi = async() => {
        const response = await getListJob(idCompany);
        if(response){
            setData(response);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleReload = () => {
        fetchApi();
    }

    const columns = [
        {
            title: "Tên job",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (_, record) => (
                (record.tags || []).map((item, index) => (
                    <Tag name="tags" color="blue" key={index}>
                        {item}
                    </Tag>
                ))
            )
        },
        {
            title: "Mức lương ($)",
            name: "salary",
            dataIndex: "salary",
        },
        {
            title: "Thành phố",
            dataIndex: "city",
            name: "city",
            render: (_, record) => (
                (record.city || []).map((item, index) => (
                    <Tag name="city" key={index} color="cyan">
                        {item}
                    </Tag>
                ))
            )
        },
        {
            title: "Ngày tạo",
            name: "createAt",
            dataIndex: "createAt",
        },
        {
            title: "Trạng thái",
            name: "status",
            dataIndex: "status",
            render: (_, record) => (
                record.status ? (
                    <>
                        <Tag color="green">Đang bật</Tag>
                    </>
                ) : (
                    <>
                        <Tag color="gray">Đang tắt</Tag>
                    </>
                )
            )
        },
        {
            title: "Hành động",
            dataIndex: "actions",
            name: "actions",
            render: (_, record) => (
                <>
                    <Link to={`/detail-job/${record.id}`}>   
                        <Tooltip title="Xem chi tiết">
                            <Button icon={<EyeOutlined />}></Button>
                        </Tooltip> 
                    </Link>

                    <EditJob record={record} onReload={handleReload} />

                    <DeleteJob record={record} onReload={handleReload} />
                </>
            )


        }
    ]

    return (
        <>
            <div> 
                <Table dataSource={data} columns={columns} rowKey="id"/>    
            </div>
        </>
    )
}
export default JobList;
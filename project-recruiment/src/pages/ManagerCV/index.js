import { Button, Table, Tag, Tooltip } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { EditCV, getListCV } from "../../services/cvSevice";
import { Link } from "react-router";
import { EyeOutlined } from "@ant-design/icons";
import CVDelete from "../../components/CvDelete";
import NoRead from "../../components/NoRead";

function ManagerCV({ record, onReload }) {
    const idCompany = getCookie("id");
    const [cv, setCV] = useState([]);
    const [read, setRead] = useState(false);

    const fetchApi = async () => {
        const response = await getListCV(idCompany);
        if (response) {
            setCV(response);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleReload = () => {
        fetchApi();
    }

    const handleRead = async (id) => {
        const response = await EditCV(id, { statusRead: true });
    }

    const columns = [
        {
            title: "Tên ứng viên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Thành phố",
            dataIndex: "city",
            key: "city"
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Ngày gửi",
            dataIndex: "createAt",
            key: "createAt",
        },
        {
            title: "Trạng thái",
            dataIndex: "statusRead",
            key: "statusRead",
            render: (_, record) => (
                record.statusRead ? (
                    <>
                        <Tag color="cyan">Đã đọc</Tag>
                    </>
                ) : (
                    <>
                        <Tag color="gray"> Chưa đọc</Tag>
                    </>
                )
            )
        },
        {
            title: "Hành động",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Link to={`/watch-cv/${record.id}`}>
                        <Tooltip title="Xem chi tiết">
                            <Button icon={<EyeOutlined />} onClick={() => handleRead(record.id)}>

                            </Button>
                        </Tooltip>
                    </Link>
                    
                    <CVDelete record={record} onReload={handleReload} />

                    <NoRead record={record} onReload={handleReload} />
                </>
            )
        }
    ]

    console.log(cv);

    return (
        <>
            <h2>Danh sách CV</h2>
            <Table dataSource={cv} columns={columns} />
        </>
    )
}
export default ManagerCV;
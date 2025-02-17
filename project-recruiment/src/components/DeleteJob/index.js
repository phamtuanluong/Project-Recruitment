import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Tooltip, message } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { DeleteDetailJob, getDetailJob, getListJob } from "../../services/jobService";

function DeleteJob( {onReload, record}) {
    const [jobs, setJobs] = useState([]);

    const handleDelete = async() => {
        const response = await DeleteDetailJob(record.id);
        if(response){
            onReload();
        }
    }

    return (
        <>
            <Tooltip title="Xóa bản ghi">
                <Popconfirm title="Bạn có chắc muốn xóa không?" onConfirm={handleDelete}>
                    <Button
                        icon={<DeleteOutlined />}
                        danger ghost
                    >

                    </Button>
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default DeleteJob;
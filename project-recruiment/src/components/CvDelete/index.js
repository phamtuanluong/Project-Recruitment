import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { deleteCV } from "../../services/cvSevice";

function CVDelete({record, onReload}){

    const handleDelete = async() => {
        const response = await deleteCV(record.id);
        if(response){
            onReload();
        }
    }

    return (
        <>
            <Tooltip title="Xóa bản ghi">
                <Popconfirm title="Bạn có chắc muốn xóa không" onConfirm={handleDelete}>
                    <Button icon={<DeleteOutlined />} danger ghost>

                    </Button>
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default CVDelete;
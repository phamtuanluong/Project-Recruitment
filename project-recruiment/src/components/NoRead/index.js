import { EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EditCV } from "../../services/cvSevice";

function NoRead({ record, onReload }) {

    const handleClick = async() => {
        const response = await EditCV(record.id, {statusRead: false});
        onReload();
    }

    return (
        <>
            <div>
                <Tooltip title="Chưa đọc">
                    <Button icon={<EyeInvisibleOutlined />} onClick={handleClick}>

                    </Button>
                </Tooltip>
            </div>
        </>
    )
}
export default NoRead;
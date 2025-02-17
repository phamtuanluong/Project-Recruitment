import {Link} from "react-router";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import JobList from "../../components/JobList";

function ManagerJob(){

    return (
        <>
            <h2>Danh sách việc làm</h2>
            <Link to="/create-job">
                <Button icon={<PlusOutlined />} className="mb-20">
                    Tạo mới công việc
                </Button>
            </Link>
            <JobList className="mt-20" />
        </>
    )
}
export default ManagerJob;
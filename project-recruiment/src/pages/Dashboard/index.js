import { Col, Row } from "antd";
import JobStatistic from "../../components/JobStatistic";
import CVStatistic from "../../components/CVStatistic";
import InfoCompany from "../../components/InfoCompany";

function DashBoard(){

    return (
        <>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <h2>Tổng quan</h2>
                </Col>
                <Col span={8}>
                    <JobStatistic />
                </Col>
                <Col span={8}>
                    <CVStatistic />
                </Col>
                <Col span={8}>
                    <InfoCompany />
                </Col>
            </Row>
        </>
    )
}
export default DashBoard;
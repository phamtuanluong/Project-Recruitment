import { useRoutes } from "react-router-dom";
import { routers } from "../../routers";

function AllRoute (){
    const elements = useRoutes(routers);
    return (
        <>
            {elements}
        </>
    )
}
export default AllRoute;
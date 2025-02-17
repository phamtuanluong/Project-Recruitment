import { useEffect, useState } from "react";
import { getTrendingTag } from "../../services/tagService";
import { Tag } from "antd";
import { useNavigate } from "react-router";

function TrendingList() {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTrendingTag();
            if (response) {
                setTags(response);
            }
        }
        fetchApi();
    }, [])

    const handleChange = (e) => {
        console.log(e);
        navigate(`/search?keyword=${e.value}`);
    }

    return (
        <>  
            <div>
                <span style={{ margin: "0px 15px 0px 0px", fontSize: "17px" }}>Suggestions for you:</span>
                {tags.map(item => (
                    <Tag.CheckableTag
                        key={item}
                        onChange={() => handleChange(item)} 
                        style={{
                        background: "#201214",
                        color: "#ddd",
                        border: "1px solid #ddd",
                        borderRadius: "20px",
                        padding: "10px 15px",
                        fontSize: "14px",
                        cursor: "pointer"
                        }}
                    >
                        {item.value}
                    </Tag.CheckableTag>
                ))}
            </div>
        </>
    )
}
export default TrendingList;
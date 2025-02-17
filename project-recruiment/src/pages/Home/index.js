import CompanyList from "../../components/CompanyList";
import SearchForm from "../../components/SearchForm";
import TrendingList from "../../components/TrendingList";

function Home(){
    return (
        <>
            <SearchForm />
            <TrendingList />
            <CompanyList />
        </>
    )
}
export default Home;
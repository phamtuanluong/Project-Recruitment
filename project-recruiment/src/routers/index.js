import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetail from "../pages/JobDetail";
import Companys from "../pages/Companys";
import CompanyDetail from "../pages/CompanyDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import PrivateRouters from "../components/PrivateRouters";
import DashBoard from "../pages/Dashboard";
import ManagerCV from "../pages/ManagerCV";
import ManagerJob from "../pages/ManagerJob";
import SettingCompany from "../pages/SettingCompany";
import Manager from "../pages/Manager";
import Search from "../pages/Search";
import LayoutAdmin from "../layout/LayoutAdmin";
import JobDetailAdmin from "../pages/JobDetailAdmin.js";
import CreateJob from "../pages/CreateJob";
import WatchCV from "../pages/WatchCV/index.js";

export const routers = [
    //Public
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/jobs",
                element: <Jobs />
            },
            {
                path: "/jobdetail/:id",
                element: <JobDetail />
            },
            {
                path: "/companys",
                element: <Companys />
            },
            {
                path: "/companydetail/:id",
                element: <CompanyDetail />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/logout",
                element: <Logout />
            },
            {
                path: "/search",
                element: <Search />
            },
        ]
    },
    //End Public

    //Private
    {
        element: <PrivateRouters />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    {
                        path: "/admin",
                        element: <DashBoard />
                    },
                    {
                        path: "/managercv",
                        element: <ManagerCV />
                    },
                    {
                        path: "/managerjob",
                        element: <ManagerJob />
                    },
                    {
                        path: "/settingcompany",
                        element: <SettingCompany />
                    },
                    {
                        path: "/manager",
                        element: <Manager />
                    },
                    {
                        path: "/create-job",
                        element: <CreateJob />
                    },
                    {
                        path: "/detail-job/:id",
                        element: <JobDetailAdmin />
                    },
                    {
                        path: "/watch-cv/:id",
                        element: <WatchCV />
                    }
                ]
            }
        ]
    }
    //End Private
]
    

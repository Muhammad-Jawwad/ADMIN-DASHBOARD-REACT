import "./sidebar.scss";
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import Person2TwoToneIcon from '@mui/icons-material/Person2TwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import { Link, useLocation } from "react-router-dom";

const RegistrationSidebar = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");
    return (
        <div className="sidebar">
            <div className="top">
                <Link to={`/dashboard?q=${qValue}`} style={{ textDecoration: "none", fontSize: '5px' }}>
                    <span className="logo">Registration Portal</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to={`/dashboard?q=${qValue}`} style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardTwoToneIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>

                    <p className="title">LISTS</p>
                    <Link to="/registration?q=ALL" style={{ textDecoration: "none" }}>
                        <li>
                            <Person2TwoToneIcon className="icon" />
                            <span>Registered Students</span>
                        </li>
                    </Link>


                    <Link to="/registration/new?q=ALL" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonAddTwoToneIcon className="icon" />
                            <span>New Registration</span>
                        </li>
                    </Link>

                    <Link to="/blockedStudents?q=ALL" style={{ textDecoration: "none" }}>
                        <li>
                            <BlockTwoToneIcon className="icon" />
                            <span>Blocked Students</span>
                        </li>
                    </Link>

                    <li onClick={() => { localStorage.removeItem("token") }}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <LogoutTwoToneIcon className="icon" />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RegistrationSidebar;
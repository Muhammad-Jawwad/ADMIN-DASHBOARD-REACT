import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

const Sidebar = () => {

  const location = useLocation();
  var url = location.pathname;
  const renderSidebar = url === "/quiz";
  const { dispatch } = useContext(DarkModeContext);

  const dropdownRef = useRef(null);

  // // For the drop down 
  // const [selectedOption, setSelectedOption] = useState('ALL'); // Default option is 'ALL'

  // const handleOptionChange = (option) => {
  //   setSelectedOption(option);
  //   // Add logic to handle the selected option here, e.g., filtering content.
  // };


  // For the dropdown
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem("selectedOption"));

  useEffect(() => {
    // Extract the query parameter from the URL
    const params = new URLSearchParams(location.search);
    const selectedOptionFromQuery = params.get("q");

    if (selectedOptionFromQuery) {
      setSelectedOption(selectedOptionFromQuery);
    }
    localStorage.setItem("selectedOption", selectedOption)
  }, [location, selectedOption]);

  const handleOptionChange = (option) => {
    // Update the selected option in the URL
    const newUrl = option === "ALL" ? `${url}?q=${option}` : `${url}?q=${option}`;
    window.location.href = newUrl; // Redirect to the new Url

    // Update the selected option in the state
    setSelectedOption(option);

    // Add logic to handle the selected option here, e.g., filtering content.
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={!renderSidebar ? `/home?q=${selectedOption}` : "/quiz"} style={{ textDecoration: "none" }}>
          <span className="logo">{!renderSidebar ? "Quiz Dashboard" : "Quiz Test"}</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {!renderSidebar && (
          <>
            <p className="title">Dashboard</p>
            {/* Here I need a drop down with values ('ALL','MCAT','ECAT','ET') */}
            <div className="dropdown">
              <select
                value={selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
              >
                <option value="ALL">ALL</option>
                <option value="MCAT">MCAT</option>
                <option value="ECAT">ECAT</option>
                <option value="ET">ET</option>
              </select>
            </div>
            <p className="title">LISTS</p>
            {/* <Link to= "/user" style={{ textDecoration: "none" }}>  */}
            <Link to= {`/user?q=${selectedOption}`} style={{ textDecoration: "none" }}> 
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li> 
            </Link>
              <Link to= {`/categories?q=${selectedOption}`} style={{ textDecoration: "none" }}>
              <li>
                <CategoryOutlinedIcon className="icon" />
                <span>Categories</span>
              </li> 
            </Link>
              <Link to= {`/quizList?q=${selectedOption}`} style={{ textDecoration: "none" }}>
              <li>
                <QuizOutlinedIcon className="icon" />
                <span>Quizes</span>
              </li>
            </Link>
              <Link to={`/question?q=${selectedOption}`} style={{ textDecoration: "none" }}>
              <li>
                <QuestionAnswerOutlinedIcon className="icon" />
                <span>Questions</span>
              </li>
            </Link>
          </>
          )}
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={() => { localStorage.clear() }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;

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
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { serverURL } from "../../temp";
import axios from "axios";

const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  var url = location.pathname;
  const renderSidebar = url === "/quiz";
  const { dispatch } = useContext(DarkModeContext);
  const dropdownRef = useRef(null);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const qValue = queryParams.get("q");
  // console.log("qValue", qValue);

  // For the dropdown
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem("selectedOption"));
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem("selectedCategory"));
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [type] = useState(localStorage.getItem("type"));

  let [token] = useState(localStorage.getItem("token"));
  // console.log(token);
  const redirectToLogin = () => {
    window.location.href = "/notFound";
  };


  useEffect(() => {
    // console.log("type", type)
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

  //For Category drop down
  const callCategoryByType = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log("config", config);
      if (qValue === "ALL") {
        const apiUrl = `${serverURL}/api/admin/getcategory`;
        const response = await fetch(apiUrl, config);
        const data = await response.json();
        // console.log("data", data);
        if (data.code === 401 || data.code === 498) {
          // console.error("Error fetching categories due to unauthorization");
        }
        return data.data;
      }
      // console.log("qValue", qValue)
      const response = await axios.post(`${serverURL}/api/users/categoryByType`,
        {
          type: qValue,
        },
        config
      );
      const data = response.data;
      // console.log("data", data);
      if (data.code === 401 | data.code === 498) {
        // console.error("Error fetching categories due to unauthorization");
      }
      return data.data;
    } catch (error) {
      // console.error(error);
      if (error.response && (error.response.status === 401 || error.response.status === 498)) {
        // console.error("Unauthorized: Please log in");
        redirectToLogin();
      }

    }
  }

  const fetchCategories = async () => {
    try {
      const data = await callCategoryByType();
      // Extract the category_name from the response data
      const options = data.map((category) => ({
        category_name: category.category_name,
        category_id: category.id
      }));
      // console.log("options", options)
      setCategoryOptions(options);
    } catch (error) {
      // console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  const handleCategoryChange = (e) => {
    const option = e.target.value;
    setSelectedCategory(option);
    localStorage.setItem("selectedCategory", option);

    // Use navigate.push to navigate without a full page reload
    navigate(`/quiz?q=${qValue}&&id=${option}`);
    // window.location.href = `/quiz?q=${qValue}&&id=${option}`;
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
                  // Disable the dropdown when 'type' is one of the specified values
                  disabled={type === 'MCAT' || type === 'ECAT' || type === 'ET'}
                >
                  <option value="ALL">ALL</option>
                  <option value="MCAT">MCAT</option>
                  <option value="ECAT">ECAT</option>
                  <option value="ET">Entry Test</option>
                </select>
              </div>
              <p className="title">LISTS</p>
              {/* <Link to= "/user" style={{ textDecoration: "none" }}>  */}
              <Link to={`/user?q=${selectedOption}`} style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>
              <Link to={`/categories?q=${selectedOption}`} style={{ textDecoration: "none" }}>
                <li>
                  <CategoryOutlinedIcon className="icon" />
                  <span>Categories</span>
                </li>
              </Link>
              <Link to={`/quizList?q=${selectedOption}`} style={{ textDecoration: "none" }}>
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
              <p className="title">USER</p>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <li>
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
                </li>
              </Link>
            </>
          )}
          {renderSidebar && (
            <>
              <p className="title">Select Category</p>
              {/* Here I need a drop down with values ('ALL','MCAT','ECAT','ET') */}
              <div className="dropdown">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e)}
                // Disable the dropdown when 'type' is one of the specified values
                // disabled={type === 'MCAT' || type === 'ECAT' || type === 'ET'}
                >
                  <option value="">Select</option>
                  {categoryOptions.map((option) => (
                    <option key={option.category_id} value={option.category_id}>
                      {option.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
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

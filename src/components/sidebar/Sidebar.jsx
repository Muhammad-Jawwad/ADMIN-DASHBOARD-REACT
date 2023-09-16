  import "./sidebar.scss";
  import DashboardIcon from "@mui/icons-material/Dashboard";
  import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
  import CreditCardIcon from "@mui/icons-material/CreditCard";
  import StoreIcon from "@mui/icons-material/Store";
  import ExitToAppIcon from "@mui/icons-material/ExitToApp";
  import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
  import { Link } from "react-router-dom";
  import { DarkModeContext } from "../../context/darkModeContext";
  import { useContext } from "react";
  import { useLocation } from 'react-router-dom';
  import { useState, useEffect, useRef } from "react";
  import { useSidebar } from "../../context/sidebarContext";

  const Sidebar = () => {
    const { sidebarLoaded, setSidebarLoaded } = useSidebar();
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Select");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const location = useLocation();
    const url = location.pathname;
    const renderSidebar = url === "/quiz";
    const { dispatch } = useContext(DarkModeContext);

    const dropdownRef = useRef(null);

    // useEffect(() => {
    //   if (!sidebarLoaded) {
    //     // Make the API call to load sidebar data
    //     const fetchCategoriesFromAPI = async () => {
    //       try {
    //         const apiUrl = "/api/admin/getcategory";
    //         const response = await fetch(apiUrl);
    //         const data = await response.json();
    //         setCategories(data.data);
    //         setSidebarLoaded(true); // Set the flag to indicate sidebar is loaded
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };

    //     fetchCategoriesFromAPI();
    //   }
    // }, [sidebarLoaded]);

    useEffect(() => {
      // Add event listener to close the dropdown when clicking outside of it
      const handleClickOutside = (event) => {
        console.log("Categories", categories)
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleCategorySelect = (categoryId,categoryName) => {
      console.log("categoryId", categoryId)
      setSelectedCategoryId(categoryId);
      setSelectedCategory(categoryName);
      setIsDropdownOpen(false); // Close the dropdown when a category is selected
    };

    return (
      <div className="sidebar">
        <div className="top">
          <Link to={!renderSidebar ? "/home" : "/quiz"} style={{ textDecoration: "none" }}>
            <span className="logo">{!renderSidebar ? "Quiz Dashboard" : "Quiz Test"}</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            {!renderSidebar && (
            <>
              <p className="title">Dashboard</p>
              {/* Dropdown for Categories */}
              <div className="category-dropdown" ref={dropdownRef}>
                <span
                  className="category-label"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedCategory}
                </span>
                <ul className={`category-list ${isDropdownOpen ? 'show' : ''}`}>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={`category-item ${selectedCategoryId === category.id ? "selected" : ""}`}
                      onClick={() => handleCategorySelect(category.id, category.category_name)}
                    >
                      {category.category_name}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="title">LISTS</p>
              <Link to="/user" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li> 
              </Link>
              <Link to="/categories" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Categories</span>
                </li> 
              </Link>
              <Link to="/quizList" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Quizes</span>
                </li>
              </Link>
              <Link to="/question" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
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

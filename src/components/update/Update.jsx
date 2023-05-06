import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { categoryInputs } from "../../formSource";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Update = ({ title }) => {
  const location = useLocation();
  const categoryId = location.pathname.match(/\/categories\/update\/(\d+)/)?.[1]; // extract categoryId using regular expressions
  console.log("categoryId", categoryId);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState({});

  useEffect(() => {
    // fetch category data from server
    axios.get(`/api/admin/categorybyid/${categoryId}`).then((response) => {
      setCategory(response.data);
    });
  }, [categoryId]);

  const handleInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", category.category_name);
    formData.append("no_of_quiz", parseInt(category.no_of_quiz));
    if (category.category_picture) {
      formData.append("category_picture", category.category_picture);
    }

    try {
      const updatedFormData = formData.category_id = categoryId;
      const response = await axios.patch("/api/admin/updatecategory", updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update">
      <Sidebar />
      <div className="updateContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : category.category_picture
                    ? category.category_picture
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      category_picture: e.target.files[0],
                    })
                  }
                  style={{ display: "none" }}
                />
              </div>
              {categoryInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.label.toLowerCase().split(" ").join("")}
                    value={category[input.label.toLowerCase().split(" ").join("")] || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <div style={{ clear: "both" }} className="formSubmit">
                <button type="submit" style={{ float: "right" }}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
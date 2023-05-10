import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryInputs } from "../../formSource";


const Update = ({ title }) => {
  const location = useLocation();
  const categoryId = location.pathname.match(/\/categories\/update\/(\d+)/)?.[1]; // extract categoryId using regular expressions

  const [category, setCategory] = useState(null);
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dataFromSingle = localStorage.getItem('categoryData');

    if (dataFromSingle) {
      const storedData = JSON.parse(dataFromSingle)
      setCategory(storedData);
      console.log("Stored Data:",storedData);
    }
  }, []);

  const handleInputChange = (e) => {

  };

  const handleUpdate = async (e) => {

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
                category?.data[0].category_picture
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
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
                    value={category && category.data[0][input.fieldName]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <div style={{ clear: "both" }} className="formUpdate">
                <button type="update" style={{ float: "right" }}>Update</button>
              </div>
              <div>
                <button
                  type="button"
                  style={{ float: "right" }}
                  onClick={() => navigate(`/categories/${categoryId}`)}
                >
                  Cancel
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

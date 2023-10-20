import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { categoryInputs } from "../../formSource";

const New = ({ title }) => {
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const token = localStorage.getItem("token");

  const redirectToLogin = () => {
    window.location.href = "/notFound";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: value }));
  };

  useEffect(() => {
    if (shouldResetForm) {
      setInputValues({});
      setFile(null);
      setShouldResetForm(false);
    }
  }, [shouldResetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      category_name: inputValues.categoryname,
      no_of_quiz: parseInt(inputValues.numberofquiz, 10),
      category_picture: file ? URL.createObjectURL(file) : "",
      type: inputValues.type
    };

    const formDataString = JSON.stringify(formData);

    try {
      const response = await fetch("http://localhost:8000/api/admin/addcategory", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: formDataString,
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.code === 401 || data.code === 498) {
          console.error("Unauthorized: Please log in");
          window.location.href = "/notFound";
        } else {
          console.error("Error:", data); // Handle other errors
        }
      } else {
        const data = await response.json();
        console.log("Response from API", data);
      }

      // Clear input values and file
      setInputValues({});
      setFile(null);
      console.log("Input values after reset:", inputValues);
      setShouldResetForm(true);
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors and provide user feedback
      if (error.response && (error.response.status === 401 || error.response.status === 498)) {
        console.error("Unauthorized: Please log in");
        window.location.href = "/notFound";
      }
    }
  };


  return (
     <>
      {!token && redirectToLogin()}
      {token && (
        <div className="new">
          <Sidebar />
          <div className="newContainer">
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
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                      required
                    />
                  </div>
                  {categoryInputs
                    .filter((input) => input.fieldName !== 'status')
                    .map((input) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.label.toLowerCase().split(" ").join("")}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ))}
                  <div style={{ clear: "both" }} className="formSubmit">
                    <button type="submit" style={{ float: "right" }}>Send</button>
                  </div>  
                </form>
              </div>
            </div>
          </div>
        </div>
        )
      }
    </>
  );
};

export default New;
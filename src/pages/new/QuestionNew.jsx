import "./questionNew.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { questionInputs } from "../../formSource";
import { Link, useLocation } from "react-router-dom";
import { serverURL } from "../../temp";
import axios from "axios";
import toast from "react-hot-toast";


const QuestionNew = ({ title }) => {
    // const [file, setFile] = useState("");
    const [inputValues, setInputValues] = useState({});
    const [quizOptions, setQuizOptions] = useState([]);
    let [token] = useState(localStorage.getItem("token"));
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    const callQuizByType = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log("config", config);
            if (qValue === "ALL") {
                const apiUrl = `${serverURL}/api/admin/getquiz`;
                const response = await fetch(apiUrl, config);
                const data = await response.json();
                console.log("data", data);
                if (data.code === 401 || data.code === 498) {
                    console.error("Error fetching categories due to unauthorization");
                }
                return data.data;
            }
            console.log("qValue", qValue)
            const response = await axios.post(`${serverURL}/api/admin/quizByType`,
                {
                    type: qValue,
                },
                config
            );
            const data = response.data;
            console.log("data", data);
            if (data.code === 401 | data.code === 498) {
                console.error("Error fetching categories due to unauthorization");
            }
            return data.data;
        } catch (error) {
            console.error(error);
            if (error.response && (error.response.status === 401 || error.response.status === 498)) {
                console.error("Unauthorized: Please log in");
                window.location.href = "/notFound";
            }

        }
    }

    const fetchQuiz = async () => {
        try {
            const data = await callQuizByType();
            // Extract the category_name from the response data
            const options = data.map((quiz) => ({
                quiz_name: quiz.quiz_name,
                quiz_id: quiz.id
            }));
            console.log("options", options)
            setQuizOptions(options);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    useEffect(() => {
        fetchQuiz(); // Fetch categories when the component mounts
    }, []);

    const handleInputChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });

        console.log("handleInputChange", inputValues);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        const fileName = e.target.value; // Get the name of the file

        // Check if a file is selected
        if (file) {
            // Check file size (in bytes)
            if (file.size > 300 * 1024) {
                // Size exceeds 300kb
                toast.error("File size should be less than 300kb");
                return;
            }

            // Create a file reader
            const reader = new FileReader();

            // Read the file
            reader.readAsDataURL(file);

            // Set up onload function
            reader.onload = () => {
                // Create an image object
                const img = new Image();

                // Set up onload function for the image
                img.onload = () => {
                    // Check image dimensions
                    console.log("img.width", img.width)
                    console.log("img.height", img.height)
                    // if (img.width > 295 || img.height > 295) {
                    //     toast.error("Image dimensions should be 25x25");
                    //     return;
                    // }

                    // if (img.width / img.height < 4) {
                    //     toast.error("Image dimensions should be less then 4:1 (width:height)");
                    //     return;
                    // }

                    // Set the input values
                    setInputValues({
                        ...inputValues,
                        [e.target.name]: file,
                    });

                    toast.success(`Successfully uploaded image: ${fileName}`);
                    console.log("handleInputChange", inputValues);

                };

                // Set the image source
                img.src = reader.result;
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputValues.question === undefined && inputValues.image_question === undefined) {
            toast.error("Both question and image_question can not be empty");
        }
        else if (inputValues.option_1 === undefined && inputValues.image_option_1 === undefined) {
            toast.error("Both option_1 and image_option_1 can not be empty");
        }
        else if (inputValues.option_2 === undefined && inputValues.image_option_2 === undefined) {
            toast.error("Both option_2 and image_option_2 can not be empty");
        }
        else if (inputValues.option_3 === undefined && inputValues.image_option_3 === undefined) {
            toast.error("Both option_3 and image_option_3 can not be empty");
        }
        else if (inputValues.option_4 === undefined && inputValues.image_option_4 === undefined) {
            toast.error("Both option_4 and image_option_4 can not be empty");
        }
        else if (inputValues.correct_option === undefined && inputValues.image_correct_option === undefined) {
            toast.error("Both correct_option and image_correct_option can not be empty");
        }

        console.log("Input values in submit: ", inputValues);

        const formData = {
            quiz_id: parseInt(inputValues.quiz_id),
            question: inputValues.question,
            option_1: inputValues.option_1,
            option_2: inputValues.option_2,
            option_3: inputValues.option_3,
            option_4: inputValues.option_4,
            correct_option: inputValues.correct_option,
            image_question: inputValues.image_question,
            image_option_1: inputValues.image_option_1,
            image_option_2: inputValues.image_option_2,
            image_option_3: inputValues.image_option_3,
            image_option_4: inputValues.image_option_4,
            image_correct_option: inputValues.image_correct_option
        };

        try {
            console.log("formData in submit: ", formData);

            // Send formData to the server using an HTTP request
            const response = await axios.post(`${serverURL}/api/admin/addquestion`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for image uploads
                }
            });

            const data = response.data;

            if (!response.status === 200) {
                if (data.code === 401 || data.code === 498) {
                    console.error("Unauthorized: Please log in");
                    window.location.href = "/notFound";
                }
            }

            // Store formData in local storage
            localStorage.setItem("formData", JSON.stringify(formData));
            toast.success("New Question successfully created!");
            // Reset the form
            setInputValues({});
            window.location.href = `/question/new?q=${qValue}`;
        } catch (error) {
            if (error.response.data.errors.length !== 0) {
                toast.error(error.response.data.errors[0].msg);
            }
            console.log(error);
        }
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="questionNew">
                    <Sidebar />
                    <div className="newContainer">
                        <Navbar />
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            <div className="right">
                                <form onSubmit={handleSubmit} className="form">
                                    {questionInputs
                                        .filter((input) => input.fieldName !== 'status')
                                        .map((input) => (
                                            <div className="formInput" key={input.id}>
                                                <label htmlFor={input.fieldName}>{input.label}</label>
                                                <div className="inputContainer">
                                                    {input.fieldName === "quiz_id" ? (
                                                        <select
                                                            id={input.fieldName}
                                                            name={input.fieldName}
                                                            onChange={handleInputChange}
                                                            required
                                                        >
                                                            <option value="">Select</option>
                                                            {quizOptions.map((option) => (
                                                                <option key={option.quiz_id} value={option.quiz_id}>
                                                                    {option.quiz_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <div className="inputContainer">
                                                            <div className="labelContainer">
                                                                <label htmlFor={`image_${input.fieldName}`}>
                                                                    <DriveFolderUploadOutlinedIcon className="icon" />
                                                                </label>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                id={`image_${input.fieldName}`}
                                                                onChange={handleImageChange}
                                                                name={`image_${input.fieldName}`}
                                                                accept="image/jpeg, image/png"
                                                            />
                                                            {inputValues[`image_${input.fieldName}`] && inputValues[`image_${input.fieldName}`] instanceof File && (
                                                                <img
                                                                    src={URL.createObjectURL(inputValues[`image_${input.fieldName}`])}
                                                                    alt=""
                                                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                                                />
                                                            )}
                                                            <input
                                                                type={input.type}
                                                                placeholder={input.placeholder}
                                                                name={input.fieldName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>


                                                        // <>
                                                        //     <label htmlFor={`image_${input.fieldName}`}>
                                                        //         <DriveFolderUploadOutlinedIcon className="icon" />
                                                        //     </label>
                                                        //     <input
                                                        //         type="file"
                                                        //         id={`image_${input.fieldName}`}
                                                        //         onChange={handleInputChange}
                                                        //         name={`image_${input.fieldName}`}
                                                        //         style={{
                                                        //             display: 'none'
                                                        //         }}
                                                        //     />
                                                        //     {inputValues[`image_${input.fieldName}`]
                                                        //         && (
                                                        //             // <img
                                                        //             //     src={
                                                        //             //         inputValues[`image_${input.fieldName}`]
                                                        //             //             ? URL.createObjectURL(inputValues[`image_${input.fieldName}`])
                                                        //             //             : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                                        //             //     }
                                                        //             //     alt=""
                                                        //             // />
                                                        //             <img
                                                        //                 src={inputValues[`image_${input.fieldName}`]}
                                                        //                 alt=""
                                                        //             />
                                                        //         )
                                                        //     }
                                                        //     <input
                                                        //         type={input.type}
                                                        //         placeholder={input.placeholder}
                                                        //         name={input.fieldName}
                                                        //         onChange={handleInputChange}
                                                        //         required
                                                        //     />
                                                        // </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    <div className="formSubmit">
                                        <button type="submit">Submit</button>
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

export default QuestionNew;
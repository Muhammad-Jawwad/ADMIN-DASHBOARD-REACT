import "./questionUpdate.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { questionInputs } from "../../formSource";
import { serverURL } from "../../temp";
import axios from "axios";
import toast from "react-hot-toast";


const QuestionUpdate = ({ title }) => {

    // Extracting questionId using regular expressions
    const location = useLocation();
    const questionId = location.pathname.match(/\/question\/update\/(\d+)/)?.[1];
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");
    let [token] = useState(localStorage.getItem("token"));

    // Initializing state
    const [inputValues, setInputValues] = useState([]);
    const [quizOptions, setQuizOptions] = useState([]);

    const navigate = useNavigate();

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
            setQuizOptions(options);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    useEffect(() => {
        fetchQuiz(); // Fetch categories when the component mounts
    }, []);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`${serverURL}/api/admin/questionbyid/${questionId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    if (response.status === 401 || response.status === 498) {
                        console.error("Unauthorized: Please log in");
                        window.location.href = "/notFound";
                    } else {
                        throw new Error('Failed to fetch quiz');
                    }
                }
                const data = await response.json();
                console.log("data.data", data.data)
                const imageFields = [
                    'image_question',
                    'image_option_1',
                    'image_option_2',
                    'image_option_3',
                    'image_option_4',
                    'image_correct_option'
                ];
                imageFields.forEach((field) => {
                    if (data.data[0][field]) { // corrected line
                        console.log("question.field", data.data[0][field])
                        urlToFile(data.data[0][field])
                            .then(file => {
                                if (file) {
                                    console.log('Converted File:', file);
                                    data.data[0][field] = file; // corrected line
                                } else {
                                    console.log('Failed to convert URL to File.');
                                }
                            });
                    }
                });
                console.log("question", data.data[0])
                setInputValues(data.data[0]);
                localStorage.setItem("questionData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
            }
        };

        if (questionId) {
            fetchQuestion();
        }
    }, [questionId]);

    const handleInputChange = (e) => {
        console.log(e.target.name);
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
        console.log(inputValues);
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

    const urlToFile = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const filenameFromUrl = url.substring(url.lastIndexOf('/') + 1);
            const file = new File([blob], filenameFromUrl, { type: blob.type });
            return file;
        } catch (error) {
            console.error('Error converting URL to File:', error);
            return null;
        }
    }

    const handleUpdate = async (e) => {
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
            question_id: questionId,
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
            image_correct_option: inputValues.image_correct_option,
            status: parseInt(inputValues.status),
        };

        try {
            console.log("formData in Update: ", formData);

            const response = await axios.patch(`${serverURL}/api/admin/updatequestion`, formData, {
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
            toast.success("Question successfully updated!");
            navigate(`/question/${questionId}?q=${qValue}`);
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
                <div className="questionUpdate">
                    <Sidebar />
                    <div className="updateContainer">
                        <Navbar />
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            <div className="right">
                                <form onSubmit={handleUpdate} className="form">
                                    {questionInputs
                                        // .filter((input) => input.fieldName !== 'status')
                                        .map((input) => (
                                            <div className="formInput" key={input.id}>
                                                <label htmlFor={input.fieldName}>{input.label}</label>
                                                <div className="inputContainer">
                                                    {input.fieldName === "quiz_id" ? (
                                                        <select
                                                            id={input.fieldName}
                                                            name={input.fieldName}
                                                            onChange={handleInputChange}
                                                            value={inputValues[input.fieldName] || ''}
                                                            required
                                                        >
                                                            {quizOptions.map((option) => (
                                                                <option key={option.quiz_id} value={option.quiz_id}>
                                                                    {option.quiz_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        input.type === "dropdown" ? (
                                                            <select
                                                                name={input.fieldName}
                                                                value={inputValues[input.fieldName] || ''}
                                                                onChange={handleInputChange}
                                                                required
                                                            >
                                                                {input.options.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
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
                                                                {inputValues[`image_${input.fieldName}`] && (
                                                                    <img
                                                                        src={inputValues[`image_${input.fieldName}`]}
                                                                        alt=""
                                                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                                                    />

                                                                )}
                                                                <input
                                                                    type={input.type}
                                                                    placeholder={input.placeholder}
                                                                    name={input.fieldName}
                                                                    value={inputValues[input.fieldName] || ''}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="formUpdate">
                                        <button
                                            style={{ float: "right" }}
                                        >
                                            Update
                                        </button>
                                        <div className="formCencel">
                                            <button
                                                type="button"
                                                style={{ float: "right" }}
                                                onClick={() => {
                                                    toast.success("Question updation cencelled!");
                                                    navigate(`/question/${questionId}?q=${qValue}`);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
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

export default QuestionUpdate;
import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { questionInputs } from "../../formSource";


const QuestionUpdate = ({ title }) => {

    // Extracting questionId using regular expressions
    const location = useLocation();
    const questionId = location.pathname.match(/\/question\/update\/(\d+)/)?.[1];
    let [token] = useState(localStorage.getItem("token"));

    // Initializing state
    const [inputValues, setInputValues] = useState("");

    const navigate = useNavigate();

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/admin/questionbyid/${questionId}`, {
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
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = {
            question_id: questionId,
            quiz_id: parseInt(inputValues.quiz_id),
            question: inputValues.question,
            option_1: inputValues.option_1,
            option_2: inputValues.option_2,
            option_3: inputValues.option_3,
            option_4: inputValues.option_4,
            correct_option: inputValues.correct_option,
            status: parseInt(inputValues.status),
        };

        try {
            const response = await fetch("http://localhost:8000/api/admin/updatequestion", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.code === 401 || data.code === 498) {
                    console.error("Unauthorized: Please log in");
                    window.location.href = "/notFound";
                }
            } else {
                const data = await response.json();
                console.log("Response from API", data);
                // Navigate to the desired page after API response
                navigate(`/question/${questionId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="update">
                    <Sidebar />
                    <div className="updateContainer">
                        <Navbar />
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            {/* <div className="left">
                                <img
                                    src={
                                        file
                                    }
                                    alt=""
                                    className="itemImg"
                                />
                            </div> */}
                            <div className="right">
                                <form onSubmit={handleUpdate}>
                                    {/* <div className="formInput">
                                        <label htmlFor="file">
                                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div> */}
                                    {questionInputs.map((input) => (
                                        <div className="formInput" key={input.id}>
                                            <label>{input.label}</label>
                                            <input
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                name={input.fieldName}
                                                value={inputValues[input.fieldName] || ''}
                                                onChange={handleInputChange}
                                                required
                                            // inputMode={input.fieldName === 'no_of_quiz' ? 'numeric' : undefined}
                                            />
                                        </div>
                                    ))}
                                    <div style={{ clear: "both" }} className="formUpdate">
                                        <button
                                            style={{ float: "right" }}
                                        // onClick={() => navigate(`/categories/${questionId}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            style={{ float: "right" }}
                                            onClick={() => navigate(`/question/${questionId}`)}
                                        >
                                            Cancel
                                        </button>
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
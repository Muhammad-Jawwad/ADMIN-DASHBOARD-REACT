import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./testQuestion.scss";

const TestQuestion = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [instruction, setInstruction] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [progress, setProgress] = useState(0);

    const redirectToLogin = () => {
        alert("Please log in first to access this page.");
        window.location.href = "/"; // Replace "/login" with the actual login page path
    };

    const fetchQuestionData = async () => {
        try {
            const response = await axios.post("/api/admin/getquestion", {
                user_id: 8,
                quiz_id: 2
            });
            console.log("response.data", response.data);
            const data = response.data.data;
            if (data.length > 0) {
                setQuestions(data);
            }
        } catch (error) {
            console.error("Error fetching question data:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchQuestionData();
        } else {
            redirectToLogin();
        }
    }, [token]);

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId);
    };

    const handleReview = () => {
        setSelectedOption("reviewed");
    };

    const handleSubmit = () => {
        // Handle the submission of selectedOption for the current question
        const currentQuestion = questions[currentQuestionIndex];
        const payload = {
            user_id: 8,
            quiz_id: 2,
            question_id: currentQuestion.id,
            selected_option: selectedOption || "reviewed"
        };
        // Make the API call to submit the selected option
        axios.post("/api/admin/submitanswer", payload)
            .then(response => {
                // Handle the response
                console.log("Answer submitted:", response.data);
            })
            .catch(error => {
                console.error("Error submitting answer:", error);
            });
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            {!token && redirectToLogin()}
            {token && currentQuestion && (
                <div className="testQuestion">
                    <div className="homeContainer">
                        <Navbar />
                        <div className="content">
                            <div className="card">
                                <div className="timer">Test Timer</div>
                                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                                <h2 className="question">{currentQuestion.question}</h2>
                                <div className="options">
                                    {currentQuestion.options.map((option) => (
                                        <button
                                            key={option.id}
                                            className={`option ${selectedOption === option.id ? "selected" : ""}`}
                                            onClick={() => handleOptionSelect(option.id)}
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                                <div className="buttons">
                                    <button className="previous" onClick={handlePrevious}>
                                        Previous
                                    </button>
                                    <button className="review" onClick={handleReview}>
                                        Review
                                    </button>
                                    <button className="next" onClick={handleNext}>
                                        Next
                                    </button>
                                    <button className="submit" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TestQuestion;

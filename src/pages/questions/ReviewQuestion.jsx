import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import MyTimer from "../../components/timer/MyTimer";
import "./testQuestion.scss";

// const useProgress = (initialValue, maxValue) => {
//     const [progress, setProgress] = useState(initialValue);

//     useEffect(() => {
//         const calculatedProgress = (progress / maxValue) * 100;
//         setProgress(calculatedProgress);
//     }, [progress, maxValue]);

//     return [progress, setProgress];
// };

const ReviewQuestion = () => {
    // Extracting categoryId using regular expressions
    const location = useLocation();
    const questionId = location.pathname.match(/\/quizHome\/reviewQuestion\/(\d+)/)?.[1]; 
    const [adminData] = useState(JSON.parse(localStorage.getItem("adminData")));
    const [quizId] = useState(localStorage.getItem("quizId"));
    const [attemptCode] = useState(localStorage.getItem("attemptCode"));;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [apiQuestions, setApiQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [progressValue, setProgressValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    

    const time = localStorage.getItem("timer");

    const redirectToLogin = () => {
        return <div>Please log in first to access this page.</div>;
    };

    const fetchQuestions = async () => {
        try {
            
            const response = await axios.post("/api/users/getreviewquestion", {
                user_id: adminData.id,
                quiz_id: quizId,
                attemptCode,
                question_id: questionId
            });
            // setAttemptCode(response.data.attemptCode);
            console.log("response.data.data",response.data.data);
            setProgressValue(response.data.progressValue[0].progress)
            setApiQuestions(response.data.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchQuestions();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                redirectToLogin();
            }
        };
        const token = localStorage.getItem("token");
        if (token) {
            fetchData();
        } else {
            redirectToLogin();
        }
    }, []);

    // const handlePrevious = () => {
    //     setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    // };

    const fetchNextQuestions = async () => {
        try {
            setSelectedOption(null);
            const response = await axios.post("/api/users/nextquestion", {
                user_id: adminData.id,
                quiz_id: quizId,
                attemptCode,
            });
            if (response.data.score !== undefined) {
                localStorage.setItem("attemptCode", attemptCode);
                window.location.href = "/quizHome/reviewQuestionList";
            } else {
                setProgressValue(response.data.progress[0].progress);
                setApiQuestions(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const submitUserAnswer = async (userAnswer) => {
        const { quiz_id, id } = apiQuestions;
        const user_id = adminData.id;

        try {
            const response = await axios.post("/api/users/reviewanswer", {
                user_id,
                quiz_id,
                question_id: id,
                entered_option: userAnswer,
                time: localStorage.getItem("timer"),
                attemptCode,
            });
            console.log("response.data",response.data);
            
            if (response.data.status === false && response.data.code === 400) {
                // localStorage.setItem("attemptCode", attemptCode);
                window.location.href = "/quizHome";
            } else {
                setSelectedOption(null);
                setProgressValue(response.data.progressValue[0].progress);
                setApiQuestions(response.data.data);
            }
        } catch (error) {
            console.error("Error submitting user answer:", error);
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setIsOptionSelected(true);
    };

    const handleNext = () => {
        if (isOptionSelected) {
            submitUserAnswer(selectedOption);
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            setIsOptionSelected(false);
        }
    };

    // const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };

    const options = useMemo(
        () => [
            apiQuestions.option_1,
            apiQuestions.option_2,
            apiQuestions.option_3,
            apiQuestions.option_4,
        ],
        [apiQuestions]
    );

    return (
        <>
            {localStorage.getItem("token") ? (
                <div>
                    <Navbar />
                    <div className="testQuestion">
                        <div className="card">
                            <div className="timer">
                                <MyTimer duration={time} />
                            </div>
                            <div className="progress-div">
                                <progress
                                    className="progress"
                                    value={progressValue}
                                    max={100}
                                    style={{
                                        background: "white",
                                    }}
                                />
                            </div>
                            {loading ? (
                                <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1>
                            ) : (
                                <div>
                                    <h2 className="question">{apiQuestions.question}</h2>
                                    <div>
                                        {options.map((option, index) => (
                                            <div key={index} className="option">
                                                <input
                                                    type="radio"
                                                    id={`option-${index + 1}`}
                                                    name="option"
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={handleOptionChange}
                                                />
                                                <label htmlFor={`option-${index + 1}`}>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="buttons">
                                {/* <button
                                    className="previousButton"
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                >
                                    Previous
                                </button> */}
                                <button
                                    className="nextButton"
                                    onClick={handleNext}
                                    disabled={!isOptionSelected || currentQuestion === apiQuestions.length - 1}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                redirectToLogin()
            )}
        </>
    );
};

export default ReviewQuestion;
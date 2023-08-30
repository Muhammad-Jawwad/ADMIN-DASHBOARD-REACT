import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import MyTimer from "../../components/timer/MyTimer";
import "./testQuestion.scss";

const TestQuestion = () => {
    const [adminData] = useState(JSON.parse(localStorage.getItem("adminData")));
    const [quizId] = useState(localStorage.getItem("quizId"));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [apiQuestions, setApiQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [progressValue, setProgressValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [attemptCode, setAttemptCode] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [reviewed, setReviewed] = useState(false);
    const [questionsOrder, setQuestionsOrder] = useState([apiQuestions]);
    const [count,setCount] = useState(0);
    const [beforePreviousQuestion, setBeforePreviousQuestion] = useState(apiQuestions);
    
    const time = localStorage.getItem("duration");

    const redirectToLogin = () => {
        return <div>Please log in first to access this page.</div>;
    };

    const fetchQuestions = async () => {
        try {
            const response = await axios.post("/api/users/getquestion", {
                user_id: adminData.id,
                quiz_id: quizId,
            });
            setAttemptCode(response.data.attemptCode);
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

    useEffect(() => {
        console.log("From previous button", currentQuestion, "and count is", count)
        console.log("attemptCode",attemptCode)
        localStorage.setItem("attemptCode", attemptCode);
    },[count,currentQuestion,attemptCode]);

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            if(currentQuestion < count){
                questionsOrder[currentQuestion].selected = selectedOption;
            }
            if (currentQuestion === count){
                const updatedQuestion = { ...apiQuestions, selected: selectedOption };
                setBeforePreviousQuestion(updatedQuestion);
            }
            setCurrentQuestion((prevQuestion) => prevQuestion - 1);
            setCurrentQuestion(currentQuestion-1);
            const previousQuestion = questionsOrder[currentQuestion-1];
            setApiQuestions(previousQuestion)
            setSelectedOption(previousQuestion.selected);   
        }
    };

    const fetchNextQuestions = async () => {
        try {
            setSelectedOption(null);
            const response = await axios.post("/api/users/nextquestion", {
                user_id: adminData.id,
                quiz_id: quizId,
                attemptCode,
            });
            if (response.data.score !== undefined) {
                if(reviewed === true){
                    console.log("attemptCode",attemptCode)
                    localStorage.setItem("attemptCode", attemptCode);
                    window.location.href = "/quiz/reviewQuestionList";
                } else {
                    localStorage.setItem("score",response.data.score);
                    console.log("score",response.data.score)
                    window.location.href = "/quiz/endQuiz";
                }

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
        if (userAnswer === null) {
            userAnswer = "review";
            setReviewed(true)
        }
        const user_id = adminData.id;

        try {
            const response = await axios.post("/api/users/useranswer", {
                user_id,
                quiz_id,
                question_id: id,
                entered_option: userAnswer,
                time: localStorage.getItem("timer"),
                attemptCode,
            });

            await fetchNextQuestions();
        } catch (error) {
            console.error("Error submitting user answer:", error);
        }
    };

    const maintainQuestionOrder = () => {
        const newQuestionsOrder = [...questionsOrder]; // Create a copy of the existing array
        newQuestionsOrder[currentQuestion] = apiQuestions; // Update the current question's state
        newQuestionsOrder[currentQuestion].selected = selectedOption; // Update the current question's state
        setQuestionsOrder(newQuestionsOrder);
    };

    const updateUserAnswer = async (userAnswer) => {
        const { quiz_id, id } = apiQuestions;
        console.log("quiz_id, id", quiz_id, id);
        const user_id = adminData.id;

        try {
            const response = await axios.patch("/api/users/updateattemptedquestion", {
                user_id,
                quiz_id,
                question_id: id,
                entered_option: userAnswer,
                time: localStorage.getItem("timer"),
                attemptCode,
            });

        } catch (error) {
            console.error("Error updating user answer:", error);
        }
    };

    const handleNext = async () => {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        if (isButtonDisabled) {
            return; // If button is already disabled, do nothing
        }
        if (count === currentQuestion){
            maintainQuestionOrder();
            setIsButtonDisabled(true); // Disable the button
            await submitUserAnswer(selectedOption);
            setCount((count) => count + 1)
            setIsButtonDisabled(false); // Re-enable the button after processing
        
        } else{
            if(selectedOption !== questionsOrder[currentQuestion].selected){
                questionsOrder[currentQuestion].selected = selectedOption;
                updateUserAnswer(selectedOption);
            }
            const previousQuestion = questionsOrder[currentQuestion + 1];
            if(previousQuestion === undefined){
                setApiQuestions(beforePreviousQuestion)
                setSelectedOption(beforePreviousQuestion.selected); 
            }else{
                setApiQuestions(previousQuestion)
                setSelectedOption(previousQuestion.selected);  
            }
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
                    <div className="test-question-page">
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
                                <button
                                    className="previousButton"
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    className="nextButton"
                                    onClick={handleNext}
                                    disabled={currentQuestion === apiQuestions.length - 1 || isButtonDisabled}
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

export default TestQuestion;
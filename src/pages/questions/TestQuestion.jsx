// import { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../../components/navbar/Navbar";
// import MyTimer from "../../components/timer/MyTimer";
// import "./testQuestion.scss";
// import { idID } from "@mui/material/locale";


// const useProgress = (initialValue, maxValue) => {
//     const [progress, setProgress] = useState(initialValue);

//     useEffect(() => {
//         const calculatedProgress = (progress / maxValue) * 100;
//         setProgress(calculatedProgress);
//     }, [progress, maxValue]);

//     return [progress, setProgress];
// };

// const TestQuestion = () => {
//     const [token] = useState(localStorage.getItem("token"));
//     const [duration] = useState(localStorage.getItem("duration"));
//     const [quizId] = useState(localStorage.getItem("quizId"));
//     const [adminData] = useState(JSON.parse(localStorage.getItem("adminData"))); // Parse the data string into an object
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [apiQuestions, setApiQuestions] = useState([]);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [progressValue, setProgressValue] = useState(0);
//     const [progress, setProgress] = useProgress(0, 1);
//     const [loading, setLoading] = useState(false);
//     const [attemptCode, setAttemptCode] = useState(null);

    
//     const time = duration;

//     const redirectToLogin = () => {
//         alert("Please log in first to access this page.");
//         window.location.href = "/"; // Replace "/login" with the actual login page path
//     };

//     const fetchQuestions = async () => {
//         try {
//             const response = await axios.post("/api/users/getquestion", {
//                 user_id: adminData.id,
//                 quiz_id: quizId,
//             });
//             console.log(response.data);
//             // console.log("attemptCode", response.data.attemptCode);
//             setAttemptCode(response.data.attemptCode);
//             setApiQuestions(response.data.data);
//             console.log("apiQuestions", apiQuestions)
//         } catch (error) {
//             console.error("Error fetching questions:", error);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true); // Set loading to true before fetching data
//                 await fetchQuestions();
//                 setLoading(false); // Set loading to false after data is fetched
//             } catch (error) {
//                 setLoading(false); // Set loading to false in case of error
//                 redirectToLogin();
//             }
//         };
//         if (token) {
//             fetchData();
//         } else {
//             redirectToLogin();
//         }
//     }, [token]);

//     const handlePrevious = () => {
//         setCurrentQuestion((prevQuestion) => prevQuestion - 1);
//     };

//     const fetchNextQuestions = async () => {
//         try {
//             setSelectedOption(null);
//             const response = await axios.post("/api/users/nextquestion", {
//                 user_id: adminData.id,
//                 quiz_id: quizId,
//                 attemptCode
//             });
//             console.log("score", response.data.score);
//             if (response.data.score !== undefined) {
//                 localStorage.setItem("attemptCode", attemptCode);
//                 // window.location.href = "/quizHome";
//                 window.location.href = "/quizHome/reviewQuestion";
//             }
//             else{
//                 console.log("NextQuestionAPI", response.data);
//                 console.log("progress", response.data.progress[0].progress);
//                 setLoading(true)
//                 setProgressValue(response.data.progress[0].progress);
//                 setApiQuestions(response.data.data);
//                 setLoading(false)
//                 console.log("NextQuestion", apiQuestions);
//             }
//         } catch (error) {
//             console.error("Error fetching questions:", error);
//         }
//     };

//     const submitUserAnswer = async (userAnswer) => {
//         const { quiz_id, id } = apiQuestions;
//         if(userAnswer === null){
//             userAnswer = "review";
//         }
//         console.log("quiz_id", quiz_id);
//         console.log("question_id", id);
//         console.log("userAnswer", userAnswer);
//         console.log("attemptCode",attemptCode);

//         const user_id = adminData.id;

//         try {
//             const response = await axios.post("/api/users/useranswer", {
//                 user_id,
//                 quiz_id,
//                 question_id: id,
//                 entered_option: userAnswer,
//                 time: localStorage.getItem('timer'),
//                 attemptCode
//             });

//             // setLoading(true);
//             await fetchNextQuestions();
//             // setLoading(false);
//             // Handle the response if needed
//             console.log(response.data);
//         } catch (error) {
//             console.error("Error submitting user answer:", error);
//         }
//     };

//     const handleNext = () => {
//         console.log("selectedOption", selectedOption);
//         console.log("duration", duration)
//        console.log("time",time)

//         submitUserAnswer(selectedOption);
//         setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     };

//     const handleOptionChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     // Accessing all the options
//     const options = [
//         apiQuestions.option_1,
//         apiQuestions.option_2,
//         apiQuestions.option_3,
//         apiQuestions.option_4,
//     ];
    
//     const handleTimerChange = (event) => {
//         const timerValue = event.detail.value;
//         console.log("Current timer value:", timerValue);
//         // You can perform any desired logic with the timer value here
//     };

//     useEffect(() => {
//         window.addEventListener("timerChange", handleTimerChange); // Listen to the custom event
//         return () => {
//             window.removeEventListener("timerChange", handleTimerChange); // Clean up the event listener
//         };
//     }, []);

//     return (
//         <>
//             {!token && redirectToLogin()}
//             {token && (
//                 <div>
//                     <Navbar />
                   
//                     <div className="testQuestion">
//                         <div className="card">
//                             <div className="timer">
//                                 <MyTimer duration={time} />
//                             </div>
//                             <div className="progress-div">
//                                 <progress className="progress" 
//                                     value={progressValue} 
//                                     max={100}
//                                     style={{
//                                         background: 'white', // Change to your desired color
//                                     }}
//                                     />
//                             </div>
//                             {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
//                             <div>   
//                                 <h2 className="question">{apiQuestions.question}</h2>
//                                 <div>
//                                     {options.map((option, index) => (
//                                         <div key={index} className="option">
//                                             <input
//                                                 type="radio"
//                                                 id={`option-${index + 1}`}
//                                                 name="option"
//                                                 value={option}
//                                                 checked={selectedOption === option}
//                                                 onChange={handleOptionChange}
//                                             />
//                                             <label htmlFor={`option-${index + 1}`}>{option}</label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>}
//                             <div className="buttons">
//                                 <button
//                                     className="previousButton"
//                                     onClick={handlePrevious}
//                                     disabled={currentQuestion === 0}
//                                 >
//                                     Previous
//                                 </button>
//                                 <button
//                                     className="nextButton"
//                                     onClick={handleNext}
//                                     disabled={currentQuestion === apiQuestions.length - 1}
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default TestQuestion;

import React, { useState, useEffect, useMemo } from "react";
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

    const handlePrevious = () => {
        setCurrentQuestion((prevQuestion) => prevQuestion - 1);
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
                    localStorage.setItem("attemptCode", attemptCode);
                    window.location.href = "/quizHome/reviewQuestionList";
                } else {
                    window.location.href = "/quizHome";
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
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting user answer:", error);
        }
    };

    const handleNext = async () => {
        if (isButtonDisabled) {
            return; // If button is already disabled, do nothing
        }

        setIsButtonDisabled(true); // Disable the button
        await submitUserAnswer(selectedOption);
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setIsButtonDisabled(false); // Re-enable the button after processing
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

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './questionSingle.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { serverURL } from '../../temp';

const QuestionSingle = () => {
    const location = useLocation();
    const questionId = location.pathname.match(/\/question\/(\d+)/)?.[1];
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");

    const [question, setQuestion] = useState({});
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

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
                console.log("data", data.data[0]);

                setQuestion(data.data[0]);
                localStorage.setItem("questionData", JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        };
        if (questionId) {
            fetchQuestion();
        }
    }, [questionId]);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="questionSingle">
                    <Sidebar />
                    <div className="singleContainer">
                        <Navbar />
                        <div className="top">
                            <div className="left">
                                <div className="editButton">
                                    <Link to={`/question/update/${questionId}?q=${qValue}`} className=" link">
                                        <CreateOutlinedIcon className="icon" />
                                    </Link>
                                </div>
                                <h1 className="title">Question Information</h1>
                                <div className="item">
                                    <div className="details">
                                        {question.image_question && (
                                            <img src={question.image_question} alt="" className="questionImage" />
                                        )}
                                        <div className="questionHeader">
                                            <h1 className="itemTitle">{question.question}</h1>
                                        </div>
                                        <div className="status">
                                            <p className={`quizStatus ${question.status === 1 ? 'active' : ''}`}>
                                                <div className='fieldname'>
                                                    Status:
                                                </div>
                                                {question.status === 1 ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                        <div className="quiz">
                                            <p>
                                                <div className='fieldname'>
                                                    Quiz:
                                                </div>
                                                {question.quiz_name}
                                            </p>
                                        </div>
                                        <div className="options">

                                            <div className="option">
                                                <p className='optiontext'>
                                                    <div className='fieldname'>
                                                        Option 1:
                                                    </div>
                                                    {question.option_1}
                                                </p>
                                                {question.image_option_1 && (
                                                    <img src={question.image_option_1} alt="" className="optionImage" />
                                                )}
                                            </div>
                                            <div className="option">
                                                <p>
                                                    <div className='fieldname'>
                                                        Option 2:
                                                    </div>
                                                    {question.option_2}
                                                </p>
                                                {question.image_option_2 && (
                                                    <img src={question.image_option_2} alt="" className="optionImage" />
                                                )}
                                            </div>

                                            <div className="option">
                                                <p>
                                                    <div className='fieldname'>
                                                        Option 3:
                                                    </div>
                                                    {question.option_3}
                                                </p>
                                                {question.image_option_3 && (
                                                    <img src={question.image_option_3} alt="" className="optionImage" />
                                                )}
                                            </div>
                                            <div className="option">
                                                <p>
                                                    <div className='fieldname'>
                                                        Option 4:
                                                    </div>
                                                    {question.option_4}
                                                </p>
                                                {question.image_option_4 && (
                                                    <img src={question.image_option_4} alt="" className="optionImage" />
                                                )}
                                            </div>

                                            <div className="option">
                                                <p>
                                                    <div className='fieldname'>
                                                        Correct Option:
                                                    </div>
                                                    {question.correct_option}
                                                </p>
                                                {question.image_correct_option && (
                                                    <img src={question.image_correct_option} alt="" className="optionImage" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuestionSingle;
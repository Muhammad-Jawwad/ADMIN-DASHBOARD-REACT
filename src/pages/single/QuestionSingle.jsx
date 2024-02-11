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
                                        <img src={question.image_question} alt="" className="questionImage" />
                                        <div className="questionHeader">
                                            <h1 className="itemTitle">{question.question}</h1>
                                        </div>
                                        <div className="status">
                                            <p className={`quizStatus ${question.status === 1 ? 'active' : ''}`}>
                                                Status: {question.status === 1 ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                        <div className="quiz">
                                            <p>Quiz: {question.quiz_name}</p>
                                        </div>
                                        <div className="options">
                                            <div className="option">
                                                <p>Option 1: {question.option_1}</p>
                                                <img src={question.image_option_1} alt="" className="optionImage" />
                                            </div>
                                            <div className="option">
                                                <p>Option 2: {question.option_2}</p>
                                                <img src={question.image_option_2} alt="" className="optionImage" />
                                            </div>
                                            <div className="option">
                                                <p>Option 3: {question.option_3}</p>
                                                <img src={question.image_option_3} alt="" className="optionImage" />
                                            </div>
                                            <div className="option">
                                                <p>Option 4: {question.option_4}</p>
                                                <img src={question.image_option_4} alt="" className="optionImage" />
                                            </div>
                                            <div className="option">
                                                <p>Correct Option: {question.option_4}</p>
                                                <img src={question.image_correct_option} alt="" className="optionImage" />
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




// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './questionSingle.scss';
// import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';
// import { Link } from "react-router-dom";
// import { serverURL } from '../../temp';
// import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

// const QuestionSingle = () => {
//     // Extracting questionId using regular expressions
//     const location = useLocation();
//     const questionId = location.pathname.match(/\/question\/(\d+)/)?.[1];
//     const { search } = useLocation();
//     const queryParams = new URLSearchParams(search);
//     const qValue = queryParams.get("q");

//     const [question, setQuestion] = useState({});
//     // const [images, setImages] = useState({});
//     let [token] = useState(localStorage.getItem("token"));

//     const redirectToLogin = () => {
//         window.location.href = "/notFound";
//     };

//     useEffect(() => {
//         const fetchQuestion = async () => {
//             try {
//                 const response = await fetch(`${serverURL}/api/admin/questionbyid/${questionId}`, {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
//                 });
//                 if (!response.ok) {
//                     if (response.status === 401 || response.status === 498) {
//                         console.error("Unauthorized: Please log in");
//                         window.location.href = "/notFound";
//                     } else {
//                         throw new Error('Failed to fetch quiz');
//                     }
//                 }
//                 const data = await response.json();
//                 console.log("data", data.data[0]);

//                 setQuestion(data.data[0]);
//                 localStorage.setItem("questionData", JSON.stringify(data));
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         if (questionId) {
//             fetchQuestion();
//         }

//     }, [questionId]);

//     return (
//         <>
//             {!token && redirectToLogin()}
//             {token && (
//                 <div className="questionSingle">
//                     <Sidebar />
//                     <div className="singleContainer">
//                         <Navbar />
//                         <div className="top">
//                             <div className="left">
//                                 <div className="editButton">
//                                     <Link to={`/question/update/${questionId}?q=${qValue}`} className=" link">
//                                         <CreateOutlinedIcon className="icon" />
//                                     </Link>
//                                 </div>
//                                 <h1 className="title">Question Information</h1>
//                                 <div className="item">
//                                     <div className="details">
//                                         <img src={
//                                             question.image_question
//                                         }
//                                             alt=""
//                                             className="itemImg"
//                                         />
//                                         <h1 className="itemTitle">{question.question}</h1>
//                                         <div className="detailItem">
//                                             <span className="itemKey">Quiz:</span>
//                                             <span className="itemValue">{question.quiz_name}</span>
//                                         </div>
//                                         <div className="detailItem">
//                                             <span className="itemKey">Status:</span>
//                                             <span className="itemValue">{question.status === 1 ? 'Active' : 'Inactive'}</span>
//                                         </div>
//                                         <div className="detailItem">
//                                             <span className="itemKey">Option 1: </span>
//                                             <span className="itemValue">{question.option_1}</span>
//                                         </div>
//                                         <img src={
//                                             question.image_option_1
//                                         }
//                                             alt=""
//                                             className="itemImg"
//                                         />
//                                         <div className="detailItem">
//                                             <span className="itemKey">Option 2: </span>
//                                             <span className="itemValue">{question.option_2}</span>
//                                         </div>
//                                         <img src={
//                                             question.image_option_2
//                                         }
//                                             alt=""
//                                             className="itemImg"
//                                         />
//                                         <div className="detailItem">
//                                             <span className="itemKey">Option 3: </span>
//                                             <span className="itemValue">{question.option_3}</span>
//                                         </div>
//                                         <img src={
//                                             question.image_option_3
//                                         }
//                                             alt=""
//                                             className="itemImg"
//                                         />
//                                         <div className="detailItem">
//                                             <span className="itemKey">Option 4: </span>
//                                             <span className="itemValue">{question.option_4}</span>
//                                         </div>
//                                         <img src={
//                                             question.image_option_4
//                                         }
//                                             alt=""
//                                             className="itemImg"
//                                         />
//                                         <div className="detailItem">
//                                             <span className="itemKey">Correct Option: </span>
//                                             <span className="itemValue">{question.correct_option}</span>
//                                         </div>
//                                         <img src={
//                                             question.image_correct_option
//                                         }
//                                             alt=""
//                                             className="itemImg"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* <div className="right">
//                     <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
//                 </div> */}
//                         </div>
//                         {/* <div className="bottom">
//                 <h1 className="title">Last Transactions</h1>
//                 <List />
//                 </div> */}
//                     </div >
//                 </div>
//             )
//             }
//         </>
//     );
// };

// export default QuestionSingle;
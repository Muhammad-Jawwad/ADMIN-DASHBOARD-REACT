import "./testwidget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const TestWidget = ({ type }) => {
    const handleProceedButton = () => {
        localStorage.setItem('quizId', type.id);
        window.location.href = "/testHome/instruction";
    }
    return (
        <div className="testwidget">
            <div className="top">
                <div className="quiz-info">
                    <span className="quiz-name">{type.quiz_name}</span>
                    <span className="quiz-no">{type.quiz_no}</span>
                </div>
            </div>
            <div className="quiz-image">
                <img src={type.picture} alt="Quiz" />
            </div>
            <div className="bottom">
                <span className="no-of-questions">{type.no_of_questions} Questions</span>
                <button className="start-quiz" onClick={handleProceedButton}>Proceed</button> 
            </div>
        </div>
    );
};

export default TestWidget;

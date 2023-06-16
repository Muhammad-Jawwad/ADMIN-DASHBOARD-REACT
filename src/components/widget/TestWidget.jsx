import "./testwidget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const TestWidget = ({ type }) => {
    let data;
    data = {
        title: type.quiz_name,
        quiz_no: type.quiz_no,
        amount: type.no_of_questions,
        icon: (
            <PersonOutlinedIcon
                className="icon"
                style={{
                    color: "crimson",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
            />
        ),
    };

    return (
        <div className="testwidget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.amount} Questions</span>
            </div>
            <div className="right">
                <div className="percentage positive">{data.quiz_no}</div>
                <div className="buttonWrapper">
                    <button className="begin">Start Quiz</button>
                </div>
            </div>
        </div>
    );
};

export default TestWidget;

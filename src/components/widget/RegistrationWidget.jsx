import "./registrationWidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

const RegistrationWidget = ({ type, input }) => {
    let data;
    // console.log("type", type, input);

    //temporary
    const amount = 100;
    const diff = 20;

    switch (type) {
        case "Total":
            data = {
                title: "Total Students",
                icon: (
                    <SchoolOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        case "Science":
            data = {
                title: "Science",
                icon: (
                    <ScienceOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(3, 125, 124, 0.2)",
                            color: "#008073",
                        }}
                    />
                ),
            };
            break;
        case "Medical":
            data = {
                title: "Medical",
                icon: (
                    <MedicalServicesOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "Pre-Engineering":
            data = {
                title: "Pre-Engineering",
                icon: (
                    <EngineeringOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(255, 165, 0, 0.2)", // Adjusted background color
                            color: "#FFA500", // Adjusted icon color
                        }}
                    />
                ),
            };
            break;
        case "Pre-Medical":
            data = {
                title: "Pre-Medical",
                icon: (
                    <MonitorHeartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(0, 128, 0, 0.2)",
                            color: "green"
                        }}
                    />
                ),
            };
            break;
        case "Blocked":
            data = {
                title: "Blocked",
                icon: (
                    <BlockOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                            color: "red",
                        }}
                    />
                ),
            };
            break;

        case "Blocked-Appeared":
            data = {
                title: "Blocked Appeared",
                icon: (
                    <BlockOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                            color: "red",
                        }}
                    />
                ),
            };
            break;


        case "Matric Students":
            data = {
                title: "Matric Students",
                icon: (
                    <SchoolOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        case "First Year Students":
            data = {
                title: "First Year Students",
                icon: (
                    <SchoolOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple"
                        }}
                    />
                ),
            };
            break;
        case "Second Year Students":
            data = {
                title: "Second Year Students",
                icon: (
                    <SchoolOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        case "Science Students":
            data = {
                title: "Science Students",
                icon: (
                    <ScienceOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(3, 125, 124, 0.2)",
                            color: "#008073",
                        }}
                    />
                ),
            };
            break;
        case "Medical Students":
            data = {
                title: "Medical Students",
                icon: (
                    <MedicalServicesOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="registrationWidget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {input}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
                {data.icon}
            </div>
        </div>
    );
};

export default RegistrationWidget;

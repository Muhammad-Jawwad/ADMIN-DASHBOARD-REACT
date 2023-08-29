import "./reviewQuestionsList.scss"
// import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import QuizDatatable from "../../components/datatable/QuizDatatable"
import ReviewDatatable from "../../components/datatable/ReviewDatatable"
import { useState } from "react"
import MyTimer from "../../components/timer/MyTimer";

const ReviewQuestionsList = () => {
    let [token] = useState(localStorage.getItem("token"));
    const time = localStorage.getItem("timer");

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="reviewQuestionsList">
                    {/* <Sidebar /> */}
                    <div className="listContainer">
                        <Navbar />
                        <div className="timer">
                            <MyTimer duration={time} />
                        </div>
                        <ReviewDatatable />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ReviewQuestionsList
import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import QuizDatatable from "../../components/datatable/QuizDatatable"

const QuizList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <QuizDatatable />
            </div>
        </div>
    )
}

export default QuizList
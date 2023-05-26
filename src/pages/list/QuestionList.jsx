import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import QuestionDatatable from "../../components/datatable/QuestionDatatable"

const QuestionList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <QuestionDatatable />
            </div>
        </div>
    )
}

export default QuestionList
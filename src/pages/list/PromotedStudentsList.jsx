import "./list.scss"
import { useState } from "react"
import PromotedStudentsDatatable from "../../components/datatable/PromotedStudentsDatatable"
import ResponsiveDrawer from "../../components/Drawer/Drawer";
import Navbar from "../../components/navbar/Navbar";
import RegistrationSidebar from "../../components/sidebar/RegistrationSidebar";

const PromotedStudentList = () => {
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="list">
                    <RegistrationSidebar />
                    <div className="listContainer">
                        {/* <ResponsiveDrawer /> */}
                        <Navbar />
                        <PromotedStudentsDatatable />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default PromotedStudentList
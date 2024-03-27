import "./list.scss"
import { useState } from "react"
import BlockedStudentDatatable from "../../components/datatable/BlockedStudentDatatable"
import ResponsiveDrawer from "../../components/Drawer/Drawer";
import Navbar from "../../components/navbar/Navbar";
import RegistrationSidebar from "../../components/sidebar/RegistrationSidebar";

const BlockedStudentList = () => {
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
                        <BlockedStudentDatatable />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default BlockedStudentList
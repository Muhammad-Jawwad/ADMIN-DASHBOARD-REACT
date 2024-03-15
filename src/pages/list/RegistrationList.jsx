import "./list.scss"
import { useState } from "react"
import RegistrationDatatable from "../../components/datatable/RegistrationDatatable"
import ResponsiveDrawer from "../../components/Drawer/Drawer";
import Navbar from "../../components/navbar/Navbar";
import RegistrationSidebar from "../../components/sidebar/RegistrationSidebar";

const RegistrationList = () => {
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
                        <RegistrationDatatable />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default RegistrationList
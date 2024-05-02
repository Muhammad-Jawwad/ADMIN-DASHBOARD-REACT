import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ResponsiveDrawer from "../../components/Drawer/Drawer";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../temp";
import RegistrationSidebar from "../../components/sidebar/RegistrationSidebar";
import RegistrationWidget from "../../components/widget/RegistrationWidget";

const RegistrationHome = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [adminData] = useState(JSON.parse(localStorage.getItem("adminData")));
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");
    const [homeStats, setHomeStats] = useState(null);
    const [loading, setLoading] = useState(true);
    // Initialize the selected option from local storage or set it to 'ALL' if it's not in local storage
    const initialSelectedOption = localStorage.getItem("selectedOption") || "ALL";

    const redirectToLogin = () => {
        // alert("Please Login first, then you can access this page...");
        // window.location.href = "/notFound"; // Replace "/login" with the actual login page path
        console.log("error occured");
    };

    const fetchHomeStats = async (qValue) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${serverURL}/api/admin/registrationStats`, config);
            const data = response.data;
            console.log("Data from API", data.data[0]);
            setHomeStats(data.data[0]);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized: Please log in");
                redirectToLogin(); // Redirect
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (token) {
                    await fetchHomeStats(qValue);
                    setLoading(false); // Set loading to false after data is fetched
                } else {
                    redirectToLogin();
                }
            } catch (error) {
                setLoading(false); // Set loading to false in case of error
                redirectToLogin();
            }
        };
        fetchData();
    }, [token, qValue]);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="home">
                    <RegistrationSidebar />
                    <div className="homeContainer">
                    {/* <ResponsiveDrawer /> */}
                        <Navbar />
                        {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
                            <>
                                <h3 style={{ paddingLeft: "20px", paddingTop: "15px" }}>9th Class</h3>
                                <div className="widgets">
                                    <RegistrationWidget type="Total" input={homeStats.ninthClass} />
                                    <RegistrationWidget type="Science" input={homeStats.ninthScienceStudents} />
                                    <RegistrationWidget type="Medical" input={homeStats.ninthMedicalStudents} />
                                    {/* {(adminData.id === 9) ? (
                                    <RegistrationWidget type="Blocked" input={homeStats.ninthBlocked} />
                                    ) : undefined} */}
                                    {/* {(adminData.id === 9) ? (
                                        <RegistrationWidget type="Blocked-Appeared" input={homeStats.ninthAppeared} />
                                    ) : undefined} */}
                                </div>
                                <h3 style={{ paddingLeft: "20px", paddingTop: "15px" }}>10th Class</h3>
                                <div className="widgets">
                                    <RegistrationWidget type="Total" input={homeStats.matricClass} />
                                    <RegistrationWidget type="Science" input={homeStats.metricScienceStudents} />
                                    <RegistrationWidget type="Medical" input={homeStats.metricMedicalStudents} />
                                    {/* {(adminData.id === 9) ? (
                                    <RegistrationWidget type="Blocked" input={homeStats.matricBlocked} />
                                    ) : undefined}   */}
                                    {/* {(adminData.id === 9) ? (
                                        <RegistrationWidget type="Blocked-Appeared" input={homeStats.matricAppeared} />
                                    ) : undefined} */}
                                </div>
                                <h3 style={{ paddingLeft: "20px", paddingTop: "15px" }}>11th Class</h3>
                                <div className="widgets">
                                    <RegistrationWidget type="Total" input={homeStats.firstYearClass} />
                                    <RegistrationWidget type="Pre-Engineering" input={homeStats.firstYearpreEngineeringStudents} />
                                    <RegistrationWidget type="Pre-Medical" input={homeStats.firstYearPreMedicalStudents} />
                                    {/* {(adminData.id === 9) ? (
                                    <RegistrationWidget type="Blocked" input={homeStats.firstYearBlocked} />
                                    ) : undefined} */}
                                    {/* {(adminData.id === 9) ? (
                                        <RegistrationWidget type="Blocked-Appeared" input={homeStats.firstYearAppeared} />
                                    ) : undefined} */}
                                </div>
                                <h3 style={{ paddingLeft: "20px", paddingTop: "15px" }}>12th Class</h3>
                                <div className="widgets">
                                    <RegistrationWidget type="Total" input={homeStats.secondYearClass} />
                                    <RegistrationWidget type="Pre-Engineering" input={homeStats.secondYearpreEngineeringStudents} />
                                    <RegistrationWidget type="Pre-Medical" input={homeStats.secondYearPreMedicalStudents} />
                                    {/* {(adminData.id === 9) ? (
                                    <RegistrationWidget type="Blocked" input={homeStats.secondYearBlocked} />
                                    ) : undefined} */}
                                    {/* {(adminData.id === 9) ? (
                                        <RegistrationWidget type="Blocked-Appeared" input={homeStats.secondYearAppeared} />
                                    ) : undefined} */}
                                </div>
                                {/* <div className="charts">
                                    {/* <Featured /> 
                                    <Chart title="Attempted Quizzes by Distinct Users" aspect={2 / 1} />
                                </div> */}
                            </>
                        }
                        {/* <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <Table />
            </div> */}
                    </div>
                </div>
            )
            }
        </>
    );
};

export default RegistrationHome;
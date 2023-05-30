import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const UserSingle = () => {
    // Extracting userId using regular expressions
    const location = useLocation();
    const userId = location.pathname.match(/\/user\/(\d+)/)?.[1];

    const [user , setUser] = useState(null);

    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        alert("Plaese Login first then you can access this page...");
        window.location.href = '/'; // Replace "/login" with the actual login page path
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/studentbyid/${userId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user ');
                }
                const data = await response.json();
                setUser(data);
                localStorage.setItem("user Data", JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        };
        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="single">
                    <Sidebar />
                    <div className="singleContainer">
                        <Navbar />
                        <div className="top">
                            <div className="left">
                                {/* <div className="editButton">
                                    <Link to={`/user/update/${userId}`} className=" link">
                                        Edit
                                    </Link>
                                </div> */}
                                <h1 className="title">User Information</h1>
                                <div className="item">
                                    <img src={
                                        user?.data[0].profile_picture}
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{user?.data[0].name}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Id: </span>
                                            <span className="itemValue">{user?.data[0].id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Email Id: </span>
                                            <span className="itemValue">{user?.data[0].email_id}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Gender: </span>
                                            <span className="itemValue">{user?.data[0].gender}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Contact: </span>
                                            <span className="itemValue">{user?.data[0].mobile_number}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Status: </span>
                                            <span className="itemValue">{user?.data[0].status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
                    <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                </div> */}
                        </div>
                        {/* <div className="bottom">
                <h1 className="title">Last Transactions</h1>
                <List />
                </div> */}
                    </div >
                </div>
                )
            }
        </>
    );
};

export default UserSingle;
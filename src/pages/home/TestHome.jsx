import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./testHome.scss";
import TestWidget from "../../components/widget/TestWidget";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll
import BeatLoader from "react-spinners/BeatLoader";
import { serverURL } from "../../temp";

const TestHome = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [userId] = useState(localStorage.getItem("userId"));
    const [quizData, setQuizData] = useState([]);
    const [hasMore, setHasMore] = useState(true); // Track if there's more data to load
    const [page, setPage] = useState(1); // Track the current page
    const categoryId = 6;

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    const fetchQuizData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${serverURL}/api/users/quizbycategoryId/${categoryId}?page=${page}`,
                {
                    user_id: userId,
                },
                config
            );
            if (response.data.data.length === 0) {
                setHasMore(false); // No more data to load
            } else {
                setQuizData([...quizData, ...response.data.data]); // Append new data to the existing quizData
                setPage(page + 1); // Increment the page
            }
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized: Please log in");
                redirectToLogin(); // Redirect
            }
        }
    };

    useEffect(() => {
        console.log("Clear local storage when the home page component mounts");
        localStorage.removeItem("score");
        localStorage.removeItem("attemptCode");
        localStorage.removeItem("quizId"); // Clear local storage when the home page component mounts
    }, []);

    useEffect(() => {
        if (token) {
            fetchQuizData();
        } else {
            redirectToLogin();
        }
    }, [token]);

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="testHome">
                    <Sidebar />
                    <div className="homeContainer">
                        <Navbar />
                        <div>
                            {/* Wrap the widget container with InfiniteScroll */}
                            <InfiniteScroll
                                dataLength={quizData.length} // This is important to prevent unnecessary loads
                                next={fetchQuizData} // Load more data when the user scrolls
                                hasMore={hasMore} // Whether there's more data to load
                                loader={
                                    <div className="beatLoader">
                                        <BeatLoader color="#5a38d4" />
                                    </div>
                                } // Loader element
                            >
                                <div className="widgets">
                                    {quizData.map((quiz, index) => (
                                        <div className="widgetWrapper" key={index}>
                                            <TestWidget type={quiz} />
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TestHome;

// EndQuiz.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./endQuiz.scss";

const EndQuiz = () => {
  const [token] = useState(localStorage.getItem("token"));
  const [score] = useState(localStorage.getItem("score") || "N/A");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      redirectToLogin();
    } else {
      setLoading(false);
    }
  }, [token]);

  const redirectToLogin = () => {
    console.log("Here in redirect login")
    window.location.href = "/notFound";
  };

  const handleGoToHome = () => {
    window.location.href = "/quiz";
  };

  return (
    <>
      {!token && redirectToLogin()}
      {token && (
        <div className="endQuiz">
          <Navbar />
          <div className="content">
            {loading ? (
              <h1 className="loadingText">Loading...</h1>
            ) : (
              <div className="card">
                <h1 className="heading">Quiz Ended</h1>
                <h4 className="subheading">Your Score: {score}</h4>
                <button className="beginButton" onClick={handleGoToHome}>
                  Go To Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EndQuiz;

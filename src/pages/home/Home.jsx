import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { useState } from "react";

const Home = () => {
  let [token] = useState(localStorage.getItem("token"));

  const redirectToLogin = () => {
    alert("Plaese Login first then you can access this page...");
    window.location.href = '/'; // Replace "/login" with the actual login page path
  };

  return (
    <>
      {!token && redirectToLogin()}
      {token && (
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
            <div className="widgets">
              <Widget type="user" />
              <Widget type="categories" />
              <Widget type="quiz" />
              <Widget type="question" />
            </div>
            <div className="charts">
              <Featured />
              <Chart title="Last 6 Months (User Crowd)" aspect={2 / 1} />
            </div>
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

export default Home;

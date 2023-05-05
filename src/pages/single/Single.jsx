import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const Single = () => {
  // const { categoryId } = match.params;
  const location = useLocation();
  const categoryId = location.pathname.match(/\/categories\/(\d+)/)?.[1]; // extract categoryId using regular expressions
  console.log("categoryId",categoryId);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/admin/categorybyid/${categoryId}`, {
          method: 'GET',
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
    
        const data = await response.json();
        setCategory(data);
        console.log("useEffect:",data)
      } catch (error) {
        console.error(error);
      }
    };
    
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);
  console.log("category:",category);


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <button>Edit</button>
            </div>
            <h1 className="title">Category Information</h1>
            <div className="item">
              <img src={category?.data[0].category_picture} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{category?.data[0].category_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Id:</span>
                  <span className="itemValue">{category?.data[0].id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Number of quiz:</span>
                  <span className="itemValue">{category?.data[0].no_of_quiz}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{category?.data[0].status}</span>
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
      </div>
    </div>
  );
};

export default Single;
/**
 * Users
 */
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User",
    width: 230,
  },
  {
    field: "profile_picture",
    headerName: "Picture",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img src={params.value} alt="Profile" className="cellImg" />
        </div>
      );
    },
  },
  {
    field: "email_id",
    headerName: "Email Id",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 230,
  },
  {
    field: "mobile_number",
    headerName: "Contact",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
// Fetch the data from the API and format it for the DataGrid
export const fetchUserRows = async () => {
  try {
    const apiUrl = "/api/admin/registeredstudents";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Export an empty array to be used until the API data is loaded
export const userRows = [];

/**
 * Categories
 */
export const categoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "category_name",
    headerName: "Category",
    width: 230,
  },
  {
    field: "category_picture",
    headerName: "Picture",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img src={params.value} alt="Profile" className="cellImg" />
        </div>
      );
    },
  },

  {
    field: "no_of_quiz",
    headerName: "Number of Quiz",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
// Fetch the data from the API and format it for the DataGrid
export const fetchCategoryRows = async () => {
  try {
    const apiUrl = "/api/admin/getcategory";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Export an empty array to be used until the API data is loaded
export const categoryRows = [];

/**
 * Quizes
 */
export const quizColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "quiz_no",
    headerName: "Quiz Number",
    width: 230,
  },
  {
    field: "category_id",
    headerName: "Category Id",
    width: 230,
  },
  {
    field: "quiz_name",
    headerName: "Quiz Name",
    width: 230,
  },
  {
    field: "picture",
    headerName: "Picture",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img src={params.value} alt="Profile" className="cellImg" />
        </div>
      );
    },
  },
  {
    field: "no_of_questions",
    headerName: "Number of Questions",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
// Fetch the data from the API and format it for the DataGrid
export const fetchQuizRows = async () => {
  try {
    const apiUrl = "/api/admin/getquiz";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Export an empty array to be used until the API data is loaded
export const quizRows = [];

/**
 * Questions
 */
export const questionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "quiz_id",
    headerName: "Quiz Id",
    width: 230,
  },
  {
    field: "question",
    headerName: "Question",
    width: 230,
  },
  {
    field: "option_1",
    headerName: "Option 1",
    width: 230,
  },
  {
    field: "option_2",
    headerName: "Option 2",
    width: 230,
  },
  {
    field: "option_3",
    headerName: "Option 3",
    width: 230,
  },
  {
    field: "option_4",
    headerName: "Option 4",
    width: 230,
  },
  {
    field: "correct_option",
    headerName: "Correct Option",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
// Fetch the data from the API and format it for the DataGrid
export const fetchQuestionRows = async () => {
  try {
    const apiUrl = "/api/admin/getquestion";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Export an empty array to be used until the API data is loaded
export const questionRows = [];

/**
 * Review
 */
export const reviewColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "question",
    headerName: "Question",
    width: 1180,
  },
];
// Fetch the data from the API and format it for the DataGrid
export const fetchReviewRows = async () => {
  try {
    const apiUrl = "/api/admin/getquestion";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Export an empty array to be used until the API data is loaded
export const reviewRows = [];
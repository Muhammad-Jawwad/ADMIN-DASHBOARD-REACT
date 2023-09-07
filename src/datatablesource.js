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
    console.log("Response", response);
    const data = await response.json();
    console.log("data", data);
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
    width: 1060,
  },
];
// Fetch the data from the API and format it for the DataGrid
export const fetchReviewRows = async () => {
  try {
    const attemptCode = localStorage.getItem("attemptCode");
    const quizId = localStorage.getItem("quizId");
    const userId = localStorage.getItem("userId");
    const body = JSON.stringify({
      user_id: userId,
      quiz_id: quizId,
      attemptCode
    });

    const apiUrl = "/api/users/getreviewquestionlist";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });

    const responseData = await response.json();
    console.log("responseData", responseData);

    // Check if 'data' property is defined and is an array
    if (Array.isArray(responseData.data)) {
      let data = responseData.data;

      // Fetch additional data for each item in the 'data' array
      const questionPromises = data.map(async (item) => {
        const questionId = item.question_id;
        console.log("questionId", questionId)
        const questionUrl = `/api/admin/questionbyid/${questionId}`;
        const questionResponse = await fetch(questionUrl);
        const questionData = await questionResponse.json();
        console.log("questionData", questionData.data[0].question)

        // Assign the 'questionDetails' object directly to the item
        item = questionData.data[0];

        // Return the modified item
        return item;
      });

      const resolvedQuestions = await Promise.all(questionPromises);
      console.log("resolvedQuestions", resolvedQuestions)

      // Build a JSON object with the required structure
      const jsonData = {
        code: responseData.code,
        status: responseData.status,
        message: responseData.message,
        data: resolvedQuestions
      };
      console.log("jsonData", jsonData)
      return jsonData;
    } else {
      throw new Error("Invalid response data");
    }

  } catch (error) {
    console.error(error);
  }
};
// Export an empty array to be used until the API data is loaded
export const reviewRows = [];
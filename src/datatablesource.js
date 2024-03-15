import axios from "axios";
import { serverURL } from "./temp";
import "./style/datatablesource.scss";

//#region :  USERS DATATABLE SOURCE

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
      const statusText = params.row.status === 1 ? "Active" : "Inactive";
      return (
        <div className={`cellWithStatus ${params.row.status === 1 ? 'active' : 'inactive'}`}>
          {statusText}
        </div>
      );
    },
  },
];

export const fetchUserRows = async (qValue) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (qValue === "ALL") {
      const apiUrl = `${serverURL}/api/admin/registeredstudents`;
      const response = await fetch(apiUrl, config);
      console.log("Response", response);
      const data = await response.json();
      console.log("data", data);
      if (data.code === 401 || data.code === 498) {
        window.location.href = "/notFound";
      }
      return data;
    }
    console.log("qValue", qValue)
    const response = await axios.post(`${serverURL}/api/admin/userByType`,
      {
        type: qValue,
      },
      config
    );
    const data = response.data;
    console.log("data", data);
    if (data.code === 401 || data.code === 498) {
      window.location.href = "/notFound";
    }
    return data;
  } catch (error) {
    console.error(error);
    if (error.response && (error.response.status === 401 || error.response.status === 498)) {
      console.error("Unauthorized: Please log in");
      window.location.href = "/notFound";
    }
  }
};

export const userRows = [];

//#endregion

//#region :  CATEGORIES DATATABLE SOURCE

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
      const statusText = params.row.status === 1 ? "Active" : "Inactive";
      return (
        <div className={`cellWithStatus ${params.row.status === 1 ? 'active' : 'inactive'}`}>
          {statusText}
        </div>
      );
    },
  },
];

export const fetchCategoryRows = async (qValue) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (qValue === "ALL") {
      const apiUrl = `${serverURL}/api/admin/getcategory`;
      const response = await fetch(apiUrl, config);
      const data = await response.json();
      console.log("data", data);
      if (data.code === 401 || data.code === 498) {
        window.location.href = "/notFound";
      }
      return data;
    }
    console.log("qValue", qValue)
    const response = await axios.post(`${serverURL}/api/admin/categoryByType`,
      {
        type: qValue,
      },
      config
    );
    const data = response.data;
    console.log("data", data);
    if (data.code === 401 | data.code === 498) {
      window.location.href = "/notFound";
    }
    return data;

  } catch (error) {
    console.error(error);
    if (error.response && (error.response.status === 401 || error.response.status === 498)) {
      console.error("Unauthorized: Please log in");
      window.location.href = "/notFound";
    }
  }
};

export const categoryRows = [];

//#endregion

//#region :  QUIZ DATATABLE SOURCE

export const quizColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "quiz_no",
    headerName: "Quiz Number",
    width: 230,
  },
  {
    field: "category_name",
    headerName: "Category",
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
      const statusText = params.row.status === 1 ? "Active" : "Inactive";
      return (
        <div className={`cellWithStatus ${params.row.status === 1 ? 'active' : 'inactive'}`}>
          {statusText}
        </div>
      );
    },
  },
];

export const fetchQuizRows = async (qValue) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (qValue === "ALL") {
      const apiUrl = `${serverURL}/api/admin/getquiz`;
      const response = await fetch(apiUrl, config);
      const data = await response.json();
      if (data.code === 401 || data.code === 498) {
        window.location.href = "/notFound";
      }
      return data;
    }
    console.log("qValue", qValue)
    const response = await axios.post(`${serverURL}/api/admin/quizByType`,
      {
        type: qValue,
      },
      config
    );
    const data = response.data;
    console.log("data", data);
    console.log("category_name", data.category_name);
    if (data.code === 401 || data.code === 498) {
      window.location.href = "/notFound";
    }
    return data;

  } catch (error) {
    console.error(error);
    if (error.response && (error.response.status === 401 || error.response.status === 498)) {
      console.error("Unauthorized: Please log in");
      window.location.href = "/notFound";
    }
  }
};

export const quizRows = [];

//#endregion

//#region :  QUESTIONS DATATABLE SOURCE

export const questionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "quiz_name",
    headerName: "Quiz",
    width: 230,
  },
  {
    field: "question",
    headerName: "Question",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cellWithText">
          {params.value ? (
            <span>{params.value}</span>
          ) : (
            <div className="noTextPlaceholder">No Text</div>
          )}
        </div>
      );
    },
  },
  {
    field: "image_question",
    headerName: "Question Image",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
        {params.value ? (
          <img src={params.value} alt="" className="cellImg" />
        ) : (
          <div className="noImagePlaceholder">No Image</div>
        )}
      </div>
      );
    },
  },
  {
    field: "option_1",
    headerName: "Option 1",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithText">
          {params.value ? (
            <span>{params.value}</span>
          ) : (
            <div className="noTextPlaceholder">No Text</div>
          )}
        </div>
      );
    },
  },
  {
    field: "image_option_1",
    headerName: "Image Option 1",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
        {params.value ? (
          <img src={params.value} alt="" className="cellImg" />
        ) : (
          <div className="noImagePlaceholder">No Image</div>
        )}
      </div>
      );
    },
  },
  {
    field: "option_2",
    headerName: "Option 2",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithText">
          {params.value ? (
            <span>{params.value}</span>
          ) : (
            <div className="noTextPlaceholder">No Text</div>
          )}
        </div>
      );
    },
  },
  {
    field: "image_option_2",
    headerName: "Image Option 2",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
        {params.value ? (
          <img src={params.value} alt="" className="cellImg" />
        ) : (
          <div className="noImagePlaceholder">No Image</div>
        )}
      </div>
      );
    },
  },
  {
    field: "option_3",
    headerName: "Option 3",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithText">
          {params.value ? (
            <span>{params.value}</span>
          ) : (
            <div className="noTextPlaceholder">No Text</div>
          )}
        </div>
      );
    },
  },
  {
    field: "image_option_3",
    headerName: "Image Option 3",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
        {params.value ? (
          <img src={params.value} alt="" className="cellImg" />
        ) : (
          <div className="noImagePlaceholder">No Image</div>
        )}
      </div>
      );
    },
  },
  {
    field: "option_4",
    headerName: "Option 4",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithText">
          {params.value ? (
            <span>{params.value}</span>
          ) : (
            <div className="noTextPlaceholder">No Text</div>
          )}
        </div>
      );
    },
  },
  {
    field: "image_option_4",
    headerName: "Image Option 4",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
        {params.value ? (
          <img src={params.value} alt="" className="cellImg" />
        ) : (
          <div className="noImagePlaceholder">No Image</div>
        )}
      </div>
      );
    },
  },
  {
    field: "correct_option",
    headerName: "Correct Option",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithText">
          {params.value ? (
            <span>{params.value}</span>
          ) : (
            <div className="noTextPlaceholder">No Text</div>
          )}
        </div>
      );
    },
  },
  {
    field: "image_correct_option",
    headerName: "Image Correct Option",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
        {params.value ? (
          <img src={params.value} alt="" className="cellImg" />
        ) : (
          <div className="noImagePlaceholder">No Image</div>
        )}
      </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      const statusText = params.row.status === 1 ? "Active" : "Inactive";
      return (
        <div className={`cellWithStatus ${params.row.status === 1 ? 'active' : 'inactive'}`}>
          {statusText}
        </div>
      );
    },
  },
];

export const fetchQuestionRows = async (qValue) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (qValue === "ALL") {
      const apiUrl = `${serverURL}/api/admin/getquestion`;
      const response = await fetch(apiUrl, config);
      const data = await response.json();
      if (data.code === 401 || data.code === 498) {
        window.location.href = "/notFound";
      }
      return data;
    }
    console.log("qValue", qValue)
    const response = await axios.post(`${serverURL}/api/admin/questionByType`,
      {
        type: qValue,
      },
      config
    );
    const data = response.data;
    console.log("data", data);
    if (data.code === 401 || data.code === 498) {
      window.location.href = "/notFound";
    }
    return data;

  } catch (error) {
    console.error(error);
    if (error.response && (error.response.status === 401 || error.response.status === 498)) {
      console.error("Unauthorized: Please log in");
      window.location.href = "/notFound";
    }
  }
};

export const questionRows = [];

//#endregion

//#region :  REVIEW QUESTIONS DATATABLE SOURCE

export const reviewColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "question",
    headerName: "Question",
    width: 1040,
  },
];

export const fetchReviewRows = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    };
    const attemptCode = localStorage.getItem("attemptCode");
    const quizId = localStorage.getItem("quizId");
    const userId = localStorage.getItem("userId");
    const body = {
      user_id: userId,
      quiz_id: quizId,
      attemptCode
    };

    const apiUrl = `${serverURL}/api/users/getreviewquestionlist`;
    const response = await axios.post(apiUrl,
      body,
      config
    );
    const responseData = response.data;

    // Check if 'data' property is defined and is an array
    if (Array.isArray(responseData.data)) {
      let data = responseData.data;

      // Fetch additional data for each item in the 'data' array
      const questionPromises = data.map(async (item) => {
        const questionId = item.question_id;
        const questionUrl = `${serverURL}/api/users/questionbyid/${questionId}`;
        const response = await axios.get(questionUrl, config);
        const questionData = response.data;

        // Assign the 'questionDetails' object directly to the item
        item = questionData.data;

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
    if (error.response && (error.response.status === 401 || error.response.status === 498)) {
      console.error("Unauthorized: Please log in");
      window.location.href = "/notFound";
    }
    window.location.href = "/notFound";
  }
};

export const reviewRows = [];

//#endregion

//#region :  REGISTRATION DATATABLE SOURCE

export const registrationColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "full_name", headerName: "Full Name", width: 320 },
  {
    field: "profile_picture",
    headerName: "Picture",
    width: 70,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img src={params.value} alt="Profile" className="cellImg" />
        </div>
      );
    },
  },
  // 
  // 
  { field: "b_form", headerName: "CNIC/B-Form Number", width: 170 },
  { field: "father_name", headerName: "Father's Name", width: 320 },
  { field: "father_status", headerName: "Father's Status", width: 120 },
  { field: "mother_name", headerName: "Mother's Name", width: 320 },
  { field: "student_contact", headerName: "Student Contact", width: 140 },
  { field: "group_name", headerName: "Group Name", width: 170 },
  { field: "class", headerName: "Class", width: 50 },
  { field: "area", headerName: "Area", width: 170 },
  { field: "address", headerName: "Address", width: 230 },
  { field: "last_school_attended", headerName: "Last School Attended", width: 230 },
  { field: "percentage_last_class", headerName: "% in Last Class", width: 130 },
  { field: "earning_siblings", headerName: "Earning Siblings", width: 130 },
  { field: "medical_illness", headerName: "Medical Illness", width: 130 },
  { field: "father_contact", headerName: "Father's Contact", width: 140 },
  { field: "father_designation", headerName: "Father's Designation", width: 170 },
  { field: "father_workplace", headerName: "Father's Workplace", width: 170 },
  { field: "father_income", headerName: "Father's Income", width: 130 },
  { field: "mother_designation", headerName: "Mother's Designation", width: 170 },
  { field: "mother_workplace", headerName: "Mother's Workplace", width: 170 },
  { field: "mother_income", headerName: "Mother's Income", width: 130 },
  { field: "domicile", headerName: "Domicile", width: 150 },
  { field: "previous_education_board", headerName: "Previous Education Board", width: 200 },
  { field: "percentage_preliminary_examination", headerName: "% in Preliminary Examination", width: 220 },
  { field: "siblings_count", headerName: "Siblings Count", width: 130 },
  { field: "current_residence", headerName: "Current Residence", width: 230 },
  { field: "reference_name", headerName: "Reference Name", width: 230 },
  { field: "reference_contact", headerName: "Reference Contact", width: 140 },
  { field: "reference_relation", headerName: "Reference Relation", width: 230 },
  { field: "year", headerName: "Year", width: 60 },
  {
    field: "status", headerName: "Status", width: 100,
    renderCell: (params) => {
      const statusText = params.value.toUpperCase() === "ACTIVE" ? "Active" : "Inactive";
      return (
        <div className={`cellWithStatus ${params.value.toUpperCase() === "ACTIVE" ? 'active' : 'inactive'}`}>
          {statusText}
        </div>
      );
    },
  },
];

export const fetchRegistrationRows = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${serverURL}/api/admin/getRegistrations`,
      config
    );
    const data = response.data;
    console.log("data", data);
    if (data.code === 401 || data.code === 498) {
      window.location.href = "/notFound";
    }
    return data;

  } catch (error) {
    console.error(error);
    if (error.response && (error.response.status === 401 || error.response.status === 498)) {
      console.error("Unauthorized: Please log in");
      window.location.href = "/notFound";
    }
  }
};

export const registrationRows = [];

//#endregion


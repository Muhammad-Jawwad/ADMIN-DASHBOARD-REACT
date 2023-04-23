export const catagoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User",
    width: 230,
  },
  {
    field: "email_id",
    headerName: "Email",
    width: 230,
  },

  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "mobile_number",
    headerName: "Contact",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];


// Fetch the data from the API and format it for the DataGrid
export const fetchCatagoryRows = async () => {
  try {
    const apiUrl = "/api/admin/registeredstudents";
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Export an empty array to be used until the API data is loaded
export const catagoryRows = [];
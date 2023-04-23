export const catagoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "category_name",
    headerName: "Catagory",
    width: 230,
  },
  {
    field: "category_picture",
    headerName: "Picture",
    width: 230,
  },

  {
    field: "no_of_quiz",
    headerName: "Number of Quiz",
    width: 230,
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
    const apiUrl = "/api/admin/getcategory";
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
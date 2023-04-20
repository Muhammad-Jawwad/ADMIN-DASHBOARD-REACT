export const userColumns = [
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

//temporary data
// export const userRows = [
//   {
//     "id": 1,
//     "name": "Muhammad Jawwad",
//     "email_id": "mjawwad110@gmail.com",
//     "password": "$2b$10$kizMW4u3H/.ETWXvCLBXwOTtjE3xA1JKdEwQ3AaDQgOYN8mGzd47O",
//     "gender": "Male",
//     "mobile_number": 399900099,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/MuhammadJawwad.svg",
//     "created_at": "2022-11-21T09:52:30.000Z",
//     "updated_at": "2022-11-21T09:52:30.000Z"
// },
// {
//     "id": 2,
//     "name": "Muhammad Ali Hasnain",
//     "email_id": "hasnainali747@gmail.com",
//     "password": "$2b$10$g/C3CBbMoYldqQYQYw45KODKFc.0lZoZ2ou7KDLBIPaeOmueAVe/i",
//     "gender": "Male",
//     "mobile_number": 2147483647,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/MuhammadAliHasnain.svg",
//     "created_at": "2022-11-21T10:08:04.000Z",
//     "updated_at": "2022-11-21T10:08:04.000Z"
// },
// {
//     "id": 3,
//     "name": "Abbas Raza",
//     "email_id": "razaabbas7@gmail.com",
//     "password": "$2b$10$f3inj3OjQ9hRdPfEfqQEeeVDc/0p8N7hzN.DcM2PWDVTOhGwNvJ.G",
//     "gender": "Male",
//     "mobile_number": 300540098,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/Abbas Raza.svg",
//     "created_at": "2022-11-21T14:46:34.000Z",
//     "updated_at": "2022-11-21T14:46:34.000Z"
// },
// {
//     "id": 4,
//     "name": "Zayab Naqvi",
//     "email_id": "zaryabNaqvi110@gmail.com",
//     "password": "$2b$10$tjaehPDhMsHSLOzf6BHX0uhvpFq.1jrdQexMzTf51FIpeqqu/jemq",
//     "gender": "Male",
//     "mobile_number": 300500098,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/Zayab Naqvi.svg",
//     "created_at": "2022-11-25T21:55:14.000Z",
//     "updated_at": "2022-11-25T21:55:14.000Z"
// },
// {
//     "id": 6,
//     "name": "Haider Naqvi",
//     "email_id": "haiderNaqvi110@gmail.com",
//     "password": "$2b$10$i60rvxp.gNMf1e6ekrdcquWIRlLf145mRDPGnUoHQL9FyumLrkgCC",
//     "gender": "Male",
//     "mobile_number": 311100098,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/Haider Naqvi.svg",
//     "created_at": "2022-11-25T22:17:23.000Z",
//     "updated_at": "2022-11-25T22:17:23.000Z"
// },
// {
//     "id": 7,
//     "name": "Ali Naqvi",
//     "email_id": "aliNaqvi110@gmail.com",
//     "password": "$2b$10$FhdiQDR.qXd4v7ug9tfnbudpFw13tQTrq55hp521YJA/WXXBLAfS2",
//     "gender": "Male",
//     "mobile_number": 399900098,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/AliNaqvi.svg",
//     "created_at": "2022-11-27T17:31:09.000Z",
//     "updated_at": "2022-11-27T17:31:09.000Z"
// },
// {
//     "id": 8,
//     "name": "Ali Naqvi",
//     "email_id": "aliNaqvi110@gmail.com",
//     "password": "$2b$10$TJJRBfOVva0KTWGpvLvlZuyGa1uQdjvvgiYvXf.rZbvQEFi6akuN6",
//     "gender": "Male",
//     "mobile_number": 399900098,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/AliNaqvi.svg",
//     "created_at": "2022-12-10T15:06:49.000Z",
//     "updated_at": "2022-12-10T15:06:49.000Z"
// },
// {
//     "id": 9,
//     "name": "Aliyan",
//     "email_id": "aliyan@gmail.com",
//     "password": "$2b$10$hFwIqgoJ3a.CvAlu12CdAeKqwhojkwFaNdWRuzB8ppYWcX1bWEHBu",
//     "gender": "Male",
//     "mobile_number": 2147483647,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/Aliyan.svg",
//     "created_at": "2022-12-18T21:32:19.000Z",
//     "updated_at": "2022-12-18T21:32:19.000Z"
// },
// {
//     "id": 10,
//     "name": "Syed",
//     "email_id": "syed@cloud.pk",
//     "password": "$2b$10$rkW0GUdkoSWxiEZ3KS6FNON9fc5GU73yDvvkMLhMgf/L52vEqLuM.",
//     "gender": "Male",
//     "mobile_number": 2147483647,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/Syed.svg",
//     "created_at": "2023-03-27T16:27:35.000Z",
//     "updated_at": "2023-03-27T16:27:35.000Z"
// },
// {
//     "id": 11,
//     "name": "Syeda Fatima Ali",
//     "email_id": "sali@cloud.pk",
//     "password": "$2b$10$unMpjvXp0f6.qZwQ6V/WkO5Xu9.RG/ItziV/blmBEGBjWbglx18ja",
//     "gender": "Female",
//     "mobile_number": 934434342,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/SyedaFatimaAli.svg",
//     "created_at": "2023-03-30T13:09:02.000Z",
//     "updated_at": "2023-03-30T13:09:02.000Z"
// },
// {
//     "id": 12,
//     "name": "Syeda",
//     "email_id": "syeda123@cloud.pk",
//     "password": "$2b$10$iAeB4D3/HFO0e2x2Y3moyOOrpEQKDQMWAT74FSr7W1D4p27rXM/HO",
//     "gender": "Female",
//     "mobile_number": 923434343,
//     "profile_picture": "https://avatars.dicebear.com/api/identicon/Syeda.svg",
//     "created_at": "2023-03-30T13:17:45.000Z",
//     "updated_at": "2023-03-30T13:17:45.000Z"
// }
//  ];


// Fetch the data from the API and format it for the DataGrid
export const fetchUserRows = async () => {
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
export const userRows = [];
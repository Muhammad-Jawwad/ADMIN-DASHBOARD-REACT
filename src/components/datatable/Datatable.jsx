import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { catagoryColumns, catagoryRows, fetchCatagoryRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Datatable = () => {
  const [data, setData] = useState(catagoryRows);
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    const getData = async () => {
      setLoading(true);
      const rows = await fetchCatagoryRows();
      setLoading(false);
      console.log("Data from rows",rows);
      setData(Array.from(rows.data));
    };
    getData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/catagories/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Catagory
        <Link to="/catagories/new" className="link">
          Add New
        </Link>
      </div>
      {loading? <h1 style={{textAlign:"center", paddingTop:"20%"}}>loading...</h1>:
      <DataGrid
        className="datagrid"
        rows={data}
        columns={catagoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />}
    </div>
  );
};

export default Datatable;

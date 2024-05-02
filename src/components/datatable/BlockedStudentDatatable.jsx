import "./registrationDatatable.scss";
import {
    DataGrid,
    GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    gridFilteredSortedRowIdsSelector,
    selectedGridRowsSelector,
} from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { fetchBlockedStudentRows, blockedStudentColumns, blockedStudentRows } from "../../datatablesource";
import { serverURL } from "../../temp";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    );
}

const getSelectedRowsToExport = ({ apiRef }) => {
    const selectedRowIds = selectedGridRowsSelector(apiRef);
    if (selectedRowIds.size > 0) {
        return Array.from(selectedRowIds.keys());
    }

    return gridFilteredSortedRowIdsSelector(apiRef);
};

const BlockedStudentDatatable = () => {
    const [data, setData] = useState(blockedStudentRows);
    const [adminData] = useState(JSON.parse(localStorage.getItem("adminData")));
    const [loading, setLoading] = useState(false);
    const [resultAlert, setResultAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [appeared, setAppeared] = useState(false);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");
    let [token] = useState(localStorage.getItem("token"));

    // useEffect(async () => {
    //     const getData = async () => {
    //         setLoading(true);
    //         const rows = await fetchBlockedStudentRows();
    //         setLoading(false);
    //         setData(Array.from(rows.data));
    //     };
    //     await getData();
    //     console.log("adminData", adminData.id)
        
    // }, []);

    useEffect(async () => {
        const getData = async () => {
            setLoading(true);
            const rows = await fetchBlockedStudentRows();
            setLoading(false);
            setData(Array.from(rows.data));

            // Check if the appeared value is 0 for any row
            const appearedValueZero = rows.data.some(row => row.appeared === 0);
            setAppeared(appearedValueZero); // Set appeared state
        };
        await getData();
        console.log("adminData", adminData.id)
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleMenuOpen = (event, id) => { 
        setSelectedRowId(id);
        setAnchorEl(event.currentTarget);

    };

    const handleMenuClose = () => {
        setSelectedRowId(null);
        setAnchorEl(null);
    };

    const handleAppeared = async (id) => {
        setSelectedRowId(null);
        setAnchorEl(null);

        try {
            const formData = {
                registration_id: id,
                appeared: 1
            }
            console.log("formData", formData);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
            const response = await axios.patch(`${serverURL}/api/admin/appearedBlockedRegistration`, formData, config);
            console.log("Response from API", response);
            const data = response.data;
            console.log("Data from API", data);

            if (response.status === 200) {
                // Handle success
                setAppeared(false)
                toast.success("Appeared status is set successfully!");

            } else {
                // Handle error
                if (data.code === 401 || data.code === 498) {
                    console.error("Unauthorized: Please log in");
                    window.location.href = "/notFound";
                }
            }
        } catch (error) {
            // Handle error
            console.error("Error:", error);
            toast.error("An error occurred while setting appeared status.");
        }
    };

    // const actionColumn = [
    //     {
    //         field: "action",
    //         headerName: "Action",
    //         width: 80,
    //         renderCell: (params) => {
    //             const rowId = params.row.id;
    //             return (
    //                 <div className="cellAction">
    //                     {/* <Link to={`/registration/update/${params.row.id}?q=ALL`} style={{ textDecoration: "none" }}>
    //                         <div className="editButton">Edit</div>
    //                     </Link> */}
    //                     <div onClick={(event) => handleMenuOpen(event, rowId)}>
    //                         <MoreVertIcon />
    //                     </div>
    //                     <Menu
    //                         id="action-menu"
    //                         anchorEl={anchorEl}
    //                         open={Boolean(anchorEl && selectedRowId === rowId)}
    //                         onClose={handleMenuClose}
    //                         anchorOrigin={{
    //                             vertical: 'bottom',
    //                             horizontal: 'left',
    //                         }}
    //                         transformOrigin={{
    //                             vertical: 'top',
    //                             horizontal: 'left',
    //                         }}
    //                     >
    //                         <MenuItem onClick={() => handleMenuClose()}>
    //                             <Link to={`/blockedStudents/update/${params.row.id}?q=ALL`} style={{ textDecoration: "none", color:"#7451f8" }}>
    //                                 <div>Edit</div>
    //                             </Link>
    //                         </MenuItem>
    //                         {appeared && params.row.appeared === 0 && // Conditionally render based on appeared state and appeared value
    //                             <MenuItem onClick={() => handleAppeared(params.row.id)}>
    //                                 <div style={{ textDecoration: "none", color: "#7451f8" }}>Appeared</div>
    //                             </MenuItem>
    //                         }
    //                         {/* <MenuItem onClick={() => handleMenuClose()}>
    //                             <a href={`/admit-card/${params.row.id}?q=ALL`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
    //                                 Admit Card
    //                             </a>
    //                         </MenuItem>
    //                         <MenuItem onClick={() => handleMenuClose()}>
    //                             <a href={`/registration-slip/${params.row.id}?q=ALL`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
    //                                 Registration Slip
    //                             </a>
    //                         </MenuItem> */}
    //                     </Menu>
    //                 </div>
    //             );
    //         },
    //     },
    // ];


    return (
        <div className="registrationDatatable">
            <div className="datatableTitle">
                <span>Blocked Students</span>
                {/* <Link to={`/registration/new?q=ALL`} className="link">Add New</Link> */}
            </div>
            {/* {resultAlert && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">Error: This Quiz didn't attempt by any user yet</Alert>
                </Stack>
            )}
            {successAlert && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">The quiz result exported successfully</Alert>
                </Stack>
            )} */}
            {loading ? <h1 style={{ textAlign: "center", paddingTop: "20%" }}>loading...</h1> :
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={blockedStudentColumns}
                    pinnedColumns={"status"}
                    // columns={actionColumn.concat(blockedStudentColumns)}
                    pageSize={8}
                    rowsPerPageOptions={[9]}
                    components={{
                        Toolbar: (adminData.id === 9) ? GridToolbar : CustomToolbar,
                    }}
                />}
        </div>
    );
};

export default BlockedStudentDatatable;
import "./registrationUpdate.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryInputs, educationalInformationInputs, familyInformationInputs, personalInformationInputs, registrationInputs, userInputs } from "../../formSource";
import { collegeEnums, groupNameEnums, schoolEnums, serverURL } from "../../temp";
import ResponsiveDrawer from "../Drawer/Drawer";
import RegistrationSidebar from "../sidebar/RegistrationSidebar";
import toast from "react-hot-toast";
import axios from "axios";


const RegistrationUpdate = ({ title }) => {

    // Extracting userId using regular expressions
    const location = useLocation();
    const userId = location.pathname.match(/\/registration\/update\/(\d+)/)?.[1];
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");

    
    const [other, setOther] = useState(false);
    const [schoolField, setSchoolField] = useState(false);
    const [refRelationField, setRefRelationField] = useState(false);
    const [motherOccupationField, setMotherOccupationField] = useState(false);
    const [groupField, setGroupField] = useState(false);
    const [schoolCollegeFilter, setSchoolCollegeFilter] = useState(false);
    const [adminData] = useState(JSON.parse(localStorage.getItem("adminData")));


    // Initializing state
    const [file, setFile] = useState(null);
    const [inputValues, setInputValues] = useState("");
    let [token] = useState(localStorage.getItem("token"));

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    const navigate = useNavigate();

    useEffect(() => {
        console.log("checking1", schoolEnums.includes(inputValues.last_school_attended))
        console.log("checking2", inputValues.last_school_attended)
        if ((inputValues.class === 'IX' || inputValues.class === 'X' || inputValues.class === 'XI') && !schoolEnums.includes(inputValues.last_school_attended)) {
            setOther(true)
            setSchoolField(true);
        }
        if (inputValues.class === 'XII'){
            setSchoolCollegeFilter(true)
        }
        if (inputValues.class === 'XII' && !collegeEnums.includes(inputValues.last_school_attended)) {
            setSchoolField(true);
            setOther(true)
        }


    }, [inputValues]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await fetch(`${serverURL}/api/admin/getRegistrations/${userId}`,
                    config
                );

                if (!response.ok) {
                    if (response.status === 401 || response.status === 498) {
                        console.error("Unauthorized: Please log in");
                        window.location.href = "/notFound";
                    } else {
                        throw new Error('Failed to fetch quiz');
                    }
                }

                const data = await response.json();
                console.log("reg", data.data[0])
                setInputValues(data.data[0]);
                localStorage.setItem("userData", JSON.stringify(data));

            } catch (error) {
                console.error(error);
                if (error.response && (error.response.status === 401 || error.response.status === 498)) {
                    console.error("Unauthorized: Please log in");
                    window.location.href = "/notFound";
                }
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    useEffect(async () => {
        inputValues.group_name = groupField ? groupNameEnums[2] : groupNameEnums[0]
    }, [groupField]);

    const handleInputChange = (e) => {
        console.log(e.target.name, e.target.value);

        //For Class Drop Down
        if (e.target.name === 'class' && (e.target.value === 'XII' || e.target.value === 'XI')) {
            setGroupField(true)
        }
        if (e.target.name === 'class' && (e.target.value !== 'XII' && e.target.value !== 'XI')) {
            setGroupField(false)
        }
        if (e.target.name === 'class' && e.target.value === 'XII') {
            setSchoolCollegeFilter(true)
            setSchoolField(false);
        }
        if (e.target.name === 'class' && e.target.value !== 'XII') {
            setSchoolCollegeFilter(false)
            setSchoolField(false);
        }

        // For Reference Relation Drop Down
        if (e.target.name === 'reference_relation' && e.target.value === 'Other') {
            setRefRelationField(true);
            setInputValues({
                ...inputValues,
                ['reference_relation']: ''
            });
        }
        if (e.target.name === 'ref_relation' && refRelationField) {
            setInputValues({
                ...inputValues,
                ['reference_relation']: e.target.value
            });
        }

        // For Mother's Occupation Drop Down
        if (e.target.name === 'mother_occupation' && e.target.value === 'Working Women') {
            setMotherOccupationField(true);
            setInputValues({
                ...inputValues,
                ['mother_occupation']: ''
            });
        }
        if (e.target.name === 'working_women' && motherOccupationField) {
            setInputValues({
                ...inputValues,
                ['mother_occupation']: e.target.value
            });
        }

        // For Last School Attented Drop Down
        if (e.target.name === 'last_school_attended' && e.target.value === 'Other') {
            setSchoolField(true);
            setOther(true)
        }
        if (e.target.name === 'school_attended' && schoolField) {
            setInputValues({
                ...inputValues,
                ['last_school_attended']: e.target.value
            });
        }

        else {
            if (e.target.name === 'last_school_attended' && e.target.value !== 'Other' && schoolField) {
                setSchoolField(false);
                setOther(false)
            }
            if (e.target.name === 'mother_occupation' && e.target.value !== 'Working Women' && motherOccupationField) {
                setMotherOccupationField(false);
            }
            if (e.target.name === 'reference_relation' && e.target.value !== 'Other' && refRelationField) {
                setRefRelationField(false);
            }



            setInputValues({
                ...inputValues,
                [e.target.name]: e.target.value
            });
        }
        console.log("inputValues", inputValues)
    };

    // const handleInputChange = (e) => {
    //     console.log(e.target.name);
    //     if (e.target.name === 'class' && (e.target.value === 'XII' || e.target.value === 'XI')) {
    //         setGroupField(true)
    //         // inputValues.group_name = 
    //     }
    //     if (e.target.name === 'class' && (e.target.value !== 'XII' && e.target.value !== 'XI')) {
    //         setGroupField(false)
    //     }
    //     if (e.target.name === 'class' && e.target.value === 'XII') {
    //         setSchoolCollegeFilter(true)
    //         setSchoolField(false);
    //     }
    //     if (e.target.name === 'class' && e.target.value !== 'XII') {
    //         setSchoolCollegeFilter(false)
    //         setSchoolField(false);
    //     }
    //     if (e.target.name === 'reference_relation' && e.target.value === 'Other') {
    //         setRefRelationField(true);
    //     }

    //     if (e.target.name === 'reference_relation' && refRelationField) {
    //         setInputValues({
    //             ...inputValues,
    //             ['reference_relation']: e.target.value
    //         });
    //     }
    //     if (e.target.name === 'mother_occupation' && e.target.value === 'Working Women') {
    //         setMotherOccupationField(true);
    //     }

    //     if (e.target.name === 'mother_occupation' && motherOccupationField) {
    //         setInputValues({
    //             ...inputValues,
    //             ['mother_occupation']: e.target.value
    //         });
    //     }
    //     if (e.target.name === 'last_school_attended' && e.target.value === 'Other') {
    //         setSchoolField(true);
    //         setOther(true)
    //         inputValues.last_school_attended = null
    //     } else if (e.target.name === 'school_attended' && schoolField) {
    //         setInputValues({
    //             ...inputValues,
    //             ['last_school_attended']: e.target.value
    //         });
    //     }
    //     else {
    //         if (e.target.name === 'last_school_attended' && e.target.value !== 'Other' && schoolField) {
    //             setSchoolField(false);
    //             setOther(false)
    //         }
    //         setInputValues({
    //             ...inputValues,
    //             [e.target.name]: e.target.value
    //         });
    //     }
    //     console.log("inputValues", inputValues)
    // };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (/^\d+$/.test(inputValues.b_form)) {
            var formattedBForm = inputValues.b_form;
            console.log("formattedBForm", formattedBForm)

            const formData = {
                registration_id: parseInt(userId),
                full_name: inputValues.full_name,
                father_name: inputValues.father_name,
                father_designation: inputValues.father_designation,
                mother_name: inputValues.mother_name,
                mother_occupation: inputValues.mother_occupation,
                student_contact: inputValues.student_contact,
                last_school_attended: inputValues.last_school_attended,
                percentage_last_class: isNaN(parseInt(inputValues.percentage_last_class)) ? null : parseInt(inputValues.percentage_last_class),
                group_name: inputValues.group_name,
                reference_contact: inputValues.reference_contact,
                medical_illness: inputValues.medical_illness,
                class: inputValues.class,
                father_contact: inputValues.father_contact,
                father_workplace: inputValues.father_workplace,
                family_income: inputValues.family_income,
                address: inputValues.address,
                domicile: inputValues.domicile,
                previous_education_board: inputValues.previous_education_board,
                percentage_preliminary_examination: isNaN(parseInt(inputValues.percentage_preliminary_examination)) ? null : parseInt(inputValues.percentage_preliminary_examination),
                siblings_count: isNaN(parseInt(inputValues.siblings_count)) ? null : parseInt(inputValues.siblings_count),
                current_residence: inputValues.current_residence,
                reference_name: inputValues.reference_name,
                reference_relation: inputValues.reference_relation,
                year: parseInt(inputValues.year),
                status: inputValues.status,
                b_form: formattedBForm,
                father_status: inputValues.father_status,
                description: inputValues.description,
            };

            console.log("before filteredFormData here", formData);


            // Filter out null values
            const filteredFormData = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});

            console.log("filteredFormData here", filteredFormData);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
                const response = await axios.patch(`${serverURL}/api/admin/updateRegistration`, filteredFormData, config);
                console.log("Response from API", response);
                const data = response.data;
                console.log("Data from API", data);

                if (!response.status === 200) {
                    if (data.code === 401 || data.code === 498) {
                        console.error("Unauthorized: Please log in");
                        window.location.href = "/notFound";
                    }
                }
                console.log("data", data)
                console.log("Response from API", data);
                toast.success("Registration successfully updated!");
                navigate(`/registration?q=${qValue}`);
            } catch (error) {
                if (error.response.data.errors.length !== 0) {
                    toast.error(error.response.data.errors[0].msg);
                }
            }
        } else {
            toast.error("b_form must be a numeric string.");
        }
    };

    return (
        <>
            {!token && redirectToLogin()}
            {token && (
                <div className="registrationUpdate">
                    <RegistrationSidebar />
                    <div className="updateContainer">
                        <Navbar />
                        {/* <ResponsiveDrawer/> */}
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            <div className="right">
                                <form onSubmit={handleUpdate}>
                                    <h1 className="sectionHeading">Personal Information</h1>
                                    <div className="section">
                                        {personalInformationInputs
                                            .map((input) => (
                                                <div className="formInput" key={input.id}>
                                                    <label>{input.label}</label>
                                                    {input.type === "dropdown" ? (
                                                        <div>
                                                            <select
                                                                name={input.fieldName}
                                                                value={inputValues[input.fieldName] || ''}
                                                                onChange={handleInputChange}
                                                                required
                                                            >
                                                                {input.options.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type={input.type}
                                                            placeholder={input.placeholder}
                                                            value={inputValues[input.fieldName] || ''}
                                                            name={input.fieldName}
                                                            onChange={handleInputChange}
                                                            maxLength={
                                                                (
                                                                    input.fieldName === 'b_form' ||
                                                                    input.fieldName === 'father_contact' ||
                                                                    input.fieldName === 'student_contact' ||
                                                                    input.fieldName === 'reference_contact'
                                                                ) ? 13 : undefined}
                                                            required
                                                            min={input.type === 'number' ? 0 : undefined}
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <h1 className="sectionHeading">Educational Information</h1>
                                    <div className="section">
                                        {educationalInformationInputs
                                            .filter((input) => (schoolCollegeFilter ? input.id !== 7 : input.id !== 8))
                                            .filter((input) => input.fieldName !== 'status' && input.fieldName !== 'year')
                                            .map((input) => (
                                                <div className="formInput" key={input.id}>
                                                    <label>{input.label}</label>
                                                    {input.type === "dropdown" ? (
                                                        input.fieldName === "group_name" ? (
                                                            <select
                                                                name={input.fieldName}
                                                                value={inputValues[input.fieldName] || ''}
                                                                onChange={handleInputChange}
                                                                required
                                                            >
                                                                {groupField ?
                                                                    input.options.slice(2, 4).map((option) => (
                                                                        <option key={option} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    )) :
                                                                    input.options.slice(0, 2).map((option) => (
                                                                        <option key={option} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        ) : (
                                                            <div>
                                                                <select
                                                                    name={input.fieldName}
                                                                    value={inputValues[input.fieldName] || ''}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                >
                                                                    {input.options.map((option) => (
                                                                        <option key={option} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <input
                                                            type={input.type}
                                                            placeholder={input.placeholder}
                                                            name={input.fieldName}
                                                            value={inputValues[input.fieldName] || ''}
                                                            onChange={handleInputChange}
                                                            maxLength={
                                                                (
                                                                    input.fieldName === 'b_form' ||
                                                                    input.fieldName === 'father_contact' ||
                                                                    input.fieldName === 'student_contact' ||
                                                                    input.fieldName === 'reference_contact'
                                                                ) ? 13 : undefined}
                                                            required={input.fieldName === 'b_form'}
                                                            min={input.type === 'number' ? 0 : undefined}
                                                        />
                                                    )}
                                                    {input.fieldName === "last_school_attended" && schoolField && (
                                                        <input
                                                            type="text"
                                                            placeholder="Please specify"
                                                            name="school_attended"
                                                            value={inputValues[input.fieldName] || ''}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <h1 className="sectionHeading">Family Information</h1>
                                    <div className="section">
                                        {familyInformationInputs
                                            .filter((input) => input.fieldName !== 'status' && input.fieldName !== 'year')
                                            .map((input) => (
                                                <div className="formInput" key={input.id}>
                                                    <label>{input.label}</label>
                                                    {input.type === "dropdown" ? (
                                                        <div>
                                                            <select
                                                                name={input.fieldName}
                                                                value={inputValues[input.fieldName] || ''}
                                                                onChange={handleInputChange}
                                                                required
                                                            >
                                                                {input.options.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type={input.type}
                                                            placeholder={input.placeholder}
                                                            value={inputValues[input.fieldName] || ''}
                                                            name={input.fieldName}
                                                            onChange={handleInputChange}
                                                            maxLength={
                                                                (
                                                                    input.fieldName === 'b_form' ||
                                                                    input.fieldName === 'father_contact' ||
                                                                    input.fieldName === 'student_contact' ||
                                                                    input.fieldName === 'reference_contact'
                                                                ) ? 13 : undefined}
                                                            required
                                                            min={input.type === 'number' ? 0 : undefined}
                                                        />
                                                    )}
                                                    {input.fieldName === "reference_relation" && refRelationField && (
                                                        <input
                                                            type="text"
                                                            placeholder="Please specify"
                                                            // value={inputValues[input.fieldName] || ''}
                                                            name="ref_relation"
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    )}
                                                    {input.fieldName === "mother_occupation" && motherOccupationField && (
                                                        <input
                                                            type="text"
                                                            placeholder="Please specify"
                                                            // value={inputValues[input.fieldName] || ''}
                                                            name="working_women"
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {/* {registrationInputs
                                        .filter((input) => (schoolCollegeFilter ? input.id !== 18 : input.id !== 19))
                                        .filter((input) => adminData.id === 9 ? input.fieldName !== '' : input.fieldName !== 'status')
                                        .map((input) => (
                                            <div className="formInput" key={input.id}>
                                                <label>{input.label}</label>
                                                {input.type === "dropdown" ? (
                                                    input.fieldName === "group_name" ? (
                                                        <select
                                                            name={input.fieldName}
                                                            value={inputValues[input.fieldName] || ''}
                                                            onChange={handleInputChange}
                                                            required
                                                        >
                                                            {groupField ?
                                                                input.options.slice(2, 4).map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                )) :
                                                                input.options.slice(0, 2).map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    ) : (
                                                        <div>
                                                            <select
                                                                name={input.fieldName}
                                                                    value={(input.fieldName === "last_school_attended" && other) ? schoolEnums[schoolEnums.length-1] : inputValues[input.fieldName] || ''}
                                                                onChange={handleInputChange}
                                                                required
                                                            >
                                                                {input.options.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )
                                                ) : (
                                                    <input
                                                        type={input.type}
                                                        placeholder={input.placeholder}
                                                        name={input.fieldName}
                                                        value={inputValues[input.fieldName] || ''}
                                                        onChange={handleInputChange}
                                                        maxLength={
                                                            (
                                                                input.fieldName === 'b_form' ||
                                                                input.fieldName === 'father_contact' ||
                                                                input.fieldName === 'student_contact' ||
                                                                input.fieldName === 'reference_contact'
                                                            ) ? 13 : undefined}
                                                        required={input.fieldName === 'b_form'}
                                                        min={input.type === 'number' ? 0 : undefined}
                                                    />
                                                )}
                                                {input.fieldName === "last_school_attended" && schoolField && (
                                                    <input
                                                        type="text"
                                                        placeholder="Please specify"
                                                        name="school_attended"
                                                        value={inputValues[input.fieldName] || ''}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                )}
                                            </div>
                                        ))
                                    } */}
                                    <div style={{ clear: "both" }} className="formUpdate">
                                        <button
                                            style={{ float: "right" }}
                                        >
                                            Update
                                        </button>
                                        <div className="formCencel">
                                            <button
                                                type="button"
                                                style={{ float: "right" }}
                                                onClick={() => navigate(`/registration/?q=${qValue}`)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default RegistrationUpdate;
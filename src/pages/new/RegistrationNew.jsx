import "./registrationNew.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { categoryInputs, registrationInputs, userInputs } from "../../formSource";
import { classEnums, collegeEnums, currentResidenceEnums, domicileEnums, fatherStatusEnums, groupNameEnums, schoolEnums, serverURL } from "../../temp";
import axios from "axios";
import toast from "react-hot-toast";
import ResponsiveDrawer from "../../components/Drawer/Drawer";
import RegistrationSidebar from "../../components/sidebar/RegistrationSidebar";
import Navbar from "../../components/navbar/Navbar";

const RegistrationNew = ({ title }) => {
    // const [file, setFile] = useState(null);
    const [shouldResetForm, setShouldResetForm] = useState(false);
    const [schoolField, setSchoolField] = useState(false);
    const [groupField, setGroupField] = useState(false);
    const [schoolCollegeFilter, setSchoolCollegeFilter] = useState(false);
    const token = localStorage.getItem("token");
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const qValue = queryParams.get("q");
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        domicile: domicileEnums[0],
        class: classEnums[0],
        group_name: (groupField) ? groupNameEnums[2] : groupNameEnums[0],
        current_residence: currentResidenceEnums[0],
        father_status: fatherStatusEnums[0],
        last_school_attended: schoolCollegeFilter ? collegeEnums[0] : schoolEnums[0]
    });

    const [schoolData, setSchoolData] = useState([]);
    useEffect(async () => {
        const schData = await fetchSchoolEnums();
        console.log("setted data", schData)
        localStorage.setItem('schools', schData)
        const colData = await fetchCollegeEnums();
        console.log("setted data", colData)
        localStorage.setItem('colleges', colData)
    }, []);

    useEffect(async () => {
        inputValues.last_school_attended = schoolCollegeFilter ? collegeEnums[0] : schoolEnums[0]
        inputValues.group_name = groupField ? groupNameEnums[2] : groupNameEnums[0]
    }, [schoolCollegeFilter, groupField]);

    async function fetchSchoolEnums() {
        try {
            const response = await fetch(`${serverURL}/api/admin/getSchools`);
            const data = await response.json();
            console.log("data form getSchools", data.data)
            const schools = data.data.map(school => school.name);
            console.log("schools", schools)
            setSchoolData(schools);
            return schools;
        } catch (error) {
            console.error('Error fetching school enums:', error);
            return [];
        }
    }

    async function fetchCollegeEnums() {
        try {
            const response = await fetch(`${serverURL}/api/admin/getColleges`);
            const data = await response.json();
            console.log("data form getColleges", data.data)
            const colleges = data.data.map(school => school.name);
            console.log("colleges", colleges)
            setSchoolData(colleges);
            return colleges;
        } catch (error) {
            console.error('Error fetching school enums:', error);
            return [];
        }
    }

    console.log("qValue", qValue)

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    const handleInputChange = (e) => {
        console.log(e.target.name);
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
        if (e.target.name === 'last_school_attended' && e.target.value === 'Other') {
            setSchoolField(true);
        } else if (e.target.name === 'school_attended' && schoolField) {
            setInputValues({
                ...inputValues,
                ['last_school_attended']: e.target.value
            });
        }
        else {
            if (e.target.name === 'last_school_attended' && e.target.value !== 'Other' && schoolField) {
                setSchoolField(false);
            }
            setInputValues({
                ...inputValues,
                [e.target.name]: e.target.value
            });
        }
        console.log("inputValues", inputValues)
    };

    useEffect(() => {
        if (shouldResetForm) {
            setInputValues({});
            // setFile(null);
            setShouldResetForm(false);
        }
    }, [shouldResetForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Function to insert hyphens at specified positions in a string
        // const insertHyphen = (str, index) => {
        //     return str.slice(0, index) + '-' + str.slice(index);
        // };

        // Validate if b_form is a numeric string
        if (/^\d+$/.test(inputValues.b_form)) {
            var formattedBForm = inputValues.b_form;
            
            // Insert hyphens at the 6th and 13th positions
            // if (formattedBForm.length >= 13) {
            //     formattedBForm = insertHyphen(formattedBForm, 12);
            // }
            // if (formattedBForm.length >= 6) {
            //     formattedBForm = insertHyphen(formattedBForm, 5);
            // }

            console.log("formattedBForm", formattedBForm)

            const formData = {
                full_name: inputValues.full_name,
                father_name: inputValues.father_name,
                father_designation: inputValues.father_designation,
                mother_name: inputValues.mother_name,
                mother_designation: inputValues.mother_designation,
                student_contact: inputValues.student_contact,
                area: inputValues.area,
                last_school_attended: inputValues.last_school_attended,
                percentage_last_class: isNaN(parseInt(inputValues.percentage_last_class)) ? null : parseInt(inputValues.percentage_last_class),
                group_name: inputValues.group_name,
                earning_siblings: isNaN(parseInt(inputValues.earning_siblings)) ? null : parseInt(inputValues.earning_siblings),
                reference_contact: inputValues.reference_contact,
                medical_illness: inputValues.medical_illness,
                class: inputValues.class,
                father_contact: inputValues.father_contact,
                father_workplace: inputValues.father_workplace,
                father_income: isNaN(parseInt(inputValues.father_income)) ? null : parseInt(inputValues.father_income),
                mother_workplace: inputValues.mother_workplace,
                mother_income: isNaN(parseInt(inputValues.mother_income)) ? null : parseInt(inputValues.mother_income),
                address: inputValues.address,
                domicile: inputValues.domicile,
                previous_education_board: inputValues.previous_education_board,
                percentage_preliminary_examination: isNaN(parseInt(inputValues.percentage_preliminary_examination)) ? null : parseInt(inputValues.percentage_preliminary_examination),
                siblings_count: isNaN(parseInt(inputValues.siblings_count)) ? null : parseInt(inputValues.siblings_count),
                current_residence: inputValues.current_residence,
                reference_name: inputValues.reference_name,
                reference_relation: inputValues.reference_relation,
                year: new Date().getFullYear(),
                b_form: formattedBForm,
                father_status: inputValues.father_status,
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
                const response = await axios.post(`${serverURL}/api/admin/registerStudent`, filteredFormData, config);
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
               
                if (data.code === 403) {
                    console.error("This B-Form/CNIC Number already registered");
                    toast.error("This B-Form/CNIC Number already registered")
                } else{
                    toast.success("New User Successfully Created!");
                    console.log("Response from API", data);
                    navigate(`/registration?q=${qValue}`);

                }
                

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
                <div className="registrationNew">
                    <RegistrationSidebar />
                    <div className="newContainer">
                        {/* <ResponsiveDrawer /> */}
                        <Navbar />
                        <div className="top">
                            <h1>{title}</h1>
                        </div>
                        <div className="bottom">
                            <div className="right">
                                <form onSubmit={handleSubmit}>
                                    {registrationInputs
                                        .filter((input) => (schoolCollegeFilter ? input.id !== 18 : input.id !== 19))
                                        .filter((input) => input.fieldName !== 'status' && input.fieldName !== 'year')
                                        .map((input) => (
                                            <div className="formInput" key={input.id}>
                                                <label>{input.label}</label>
                                                {input.type === "dropdown" ? (
                                                    input.fieldName === "group_name" ? (
                                                        <select
                                                            name={input.fieldName}
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
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                )}
                                            </div>
                                        ))
                                    }



                                    {/* {registrationInputs
                                        .filter((input) => (schoolCollegeFilter ? input.id !== 18 : input.id !== 19))
                                        .filter((input) => input.fieldName !== 'status' && input.fieldName !== 'year')
                                        .map((input) => (
                                            <div className="formInput" key={input.id}>
                                                <label>{input.label}</label>
                                                {input.type === "dropdown" ? (
                                                    <div>
                                                        <select
                                                            name={input.fieldName}
                                                            onChange={handleInputChange}
                                                            required
                                                        >
                                                            {input.options.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {input.fieldName === "last_school_attended" && schoolField && (
                                                            <input
                                                                type="text"
                                                                placeholder="Please specify"
                                                                name="school_attended"
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        )}
                                                    </div>
                                                ) : (
                                                    <input
                                                        type={input.type}
                                                        placeholder={input.placeholder}
                                                        name={input.fieldName}
                                                        onChange={handleInputChange}
                                                        maxLength={input.fieldName === 'b_form' ? 13 : undefined}
                                                        required={input.fieldName === 'b_form'}
                                                    />
                                                )}
                                            </div>
                                        ))
                                    } */}
                                    <div style={{ clear: "both" }} className="formSubmit">
                                        <button type="submit" style={{ float: "right" }}>Submit</button>
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

export default RegistrationNew;
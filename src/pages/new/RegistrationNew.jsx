import "./registrationNew.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { educationalInformationInputs, familyInformationInputs, personalInformationInputs, registrationInputs } from "../../formSource";
import { boardEnums, classEnums, collegeEnums, currentResidenceEnums, domicileEnums, fatherStatusEnums, groupNameEnums, medicalIllnessEnums, motherOccupationEnums, referenceRelationEnums, salaryEnums, schoolEnums, serverURL } from "../../temp";
import axios from "axios";
import toast from "react-hot-toast";
import RegistrationSidebar from "../../components/sidebar/RegistrationSidebar";
import Navbar from "../../components/navbar/Navbar";
import { id } from "date-fns/locale";

const RegistrationNew = ({ title }) => {
    // const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [promoted, setPromoted] = useState(false);
    const [shouldResetForm, setShouldResetForm] = useState(false);
    const [schoolField, setSchoolField] = useState(false);
    const [refRelationField, setRefRelationField] = useState(false);
    const [motherOccupationField, setMotherOccupationField] = useState(false);
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
        last_school_attended: schoolCollegeFilter ? collegeEnums[0] : schoolEnums[0],
        family_income: salaryEnums[0],
        previous_education_board: boardEnums[0],
        reference_relation: referenceRelationEnums[0],
        mother_occupation: motherOccupationEnums[0],
        medical_illness: medicalIllnessEnums[0],
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

    const checkPromotedAlready = async (value) => {
    if (/^\d{13}$/.test(value)) {
        console.log("its working")
        const formData = {
            b_form: value
        };

        console.log("in input field here", formData);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
            const response = await axios.post(`${serverURL}/api/admin/checkPromotedStudent`, formData, config);
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
                setPromoted(true);
                console.error("This B-Form/CNIC Number already Promoted");
                toast.error("This B-Form/CNIC Number already Promoted");
            } else {
                // toast.success("New User Successfully Created!");
                console.log("Response from API", data);
                setPromoted(false);

                // navigate(`/registration?q=${qValue}`);
                // setSubmitting(false);
            }
            // toast.success("New User Successfully Created!");
        } catch (error) {
            if (error.response.data.errors.length !== 0) {
                toast.error(error.response.data.errors[0].msg);
            }
            setPromoted(false);
        }
    } else {
        setPromoted(false);
    }
}

const handleInputChange = async (e) => {
    console.log(e.target.name, e.target.value);

    if (e.target.name === 'b_form') {
        console.log("good")
        await checkPromotedAlready(e.target.value)
    }
    // setPromoted(false);
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
    }
    if (e.target.name === 'ref_relation' && refRelationField) {
        console.log("e.target.value", e.target.value)
        setInputValues({
            ...inputValues,
            ['reference_relation']: e.target.value
        });
    }

    // For Mother's Occupation Drop Down
    if (e.target.name === 'mother_occupation' && e.target.value === 'Working Women') {
        setMotherOccupationField(true);
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

// const handleInputChange = async (e) => {
//     console.log(e.target.name, e.target.value);

//     if (e.target.name === 'b_form') {
//         console.log("good")
//         await checkPromotedAlready(e.target.value)
//     }
//     // setPromoted(false);
//     //For Class Drop Down
//     if (e.target.name === 'class' && (e.target.value === 'XII' || e.target.value === 'XI')) {
//         setGroupField(true)
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

//     // For Reference Relation Drop Down
//     if (e.target.name === 'reference_relation' && e.target.value === 'Other') {
//         setRefRelationField(true);
//     }
//     if (e.target.name === 'ref_relation' && refRelationField) {
//         console.log("e.target.value", e.target.value)
//         setInputValues({
//             ...inputValues,
//             ['reference_relation']: e.target.value
//         });
//     }

//     // For Mother's Occupation Drop Down
//     if (e.target.name === 'mother_occupation' && e.target.value === 'Working Women') {
//         setMotherOccupationField(true);
//     }
//     if (e.target.name === 'working_women' && motherOccupationField) {
//         setInputValues({
//             ...inputValues,
//             ['mother_occupation']: e.target.value
//         });
//     }

//     // For Last School Attented Drop Down
//     if (e.target.name === 'last_school_attended' && e.target.value === 'Other') {
//         setSchoolField(true);
//     }
//     if (e.target.name === 'school_attended' && schoolField) {
//         setInputValues({
//             ...inputValues,
//             ['last_school_attended']: e.target.value
//         });
//     }

//     else {
//         if (e.target.name === 'last_school_attended' && e.target.value !== 'Other' && schoolField) {
//             setSchoolField(false);
//         }
//         if (e.target.name === 'mother_occupation' && e.target.value !== 'Working Women' && motherOccupationField) {
//             setMotherOccupationField(false);
//         }
//         if (e.target.name === 'reference_relation' && e.target.value !== 'Other' && refRelationField) {
//             setRefRelationField(false);
//         }



//         setInputValues({
//             ...inputValues,
//             [e.target.name]: e.target.value
//         });
//     }
//     console.log("inputValues", inputValues)
// };

useEffect(() => {
    if (shouldResetForm) {
        setInputValues({});
        // setFile(null);
        setShouldResetForm(false);
    }
}, [shouldResetForm]);

const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);


    // Validate if b_form is a numeric string
    if (/^\d+$/.test(inputValues.b_form)) {
        var formattedBForm = inputValues.b_form;

        console.log("formattedBForm", formattedBForm)

        const formData = {
            full_name: inputValues.full_name,
            father_name: inputValues.father_name,
            father_designation: inputValues.father_designation,
            mother_name: inputValues.mother_name,
            mother_occupation: motherOccupationField ? inputValues.working_women : inputValues.mother_occupation,
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
            reference_relation: refRelationField ? inputValues.ref_relation : inputValues.reference_relation,
            year: new Date().getFullYear(),
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
            } else if (data.code === 405) {
                console.error("This B-Form/CNIC Number is blocked by the admin");
                toast.error("This B-Form/CNIC Number is blocked by the admin")
            } else {
                toast.success("New User Successfully Created!");
                console.log("Response from API", data);
                navigate(`/registration?q=${qValue}`);
                setSubmitting(false);
            }
            // toast.success("New User Successfully Created!");
        } catch (error) {
            if (error.response.data.errors.length !== 0) {
                toast.error(error.response.data.errors[0].msg);
            }
            setSubmitting(false);
        }
    } else {
        toast.error("b_form must be a numeric string.");
        setSubmitting(false);
    }
};


return (
    <>
        {!token && redirectToLogin()}
        {token && (
            <div className="registrationNew">
                <RegistrationSidebar />
                <div className="newContainer">
                    <Navbar />
                    <div className="top">
                        <h1>{title}</h1>
                    </div>
                    <div className="bottom">
                        <div className="right">
                            <form onSubmit={handleSubmit}>
                                <h1 className="sectionHeading">Personal Information</h1>
                                <div className="section">
                                    {personalInformationInputs
                                        // .filter((input) => (schoolCollegeFilter ? input.id !== 18 : input.id !== 19))
                                        // .filter((input) => input.fieldName !== 'status' && input.fieldName !== 'year')
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
                                                    </div>
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
                                                        name="ref_relation"
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                )}
                                                {input.fieldName === "mother_occupation" && motherOccupationField && (
                                                    <input
                                                        type="text"
                                                        placeholder="Please specify"
                                                        name="working_women"
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div style={{ clear: "both" }} className="formSubmit">
                                    <button
                                        type="submit"
                                        style={{ float: "right" }}
                                        disabled={submitting || promoted}
                                        className={submitting || promoted ? "disabled-cursor" : ""}
                                    >Submit</button>
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
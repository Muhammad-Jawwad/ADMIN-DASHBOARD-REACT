import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { serverURL } from '../../temp';

const RegistrationSlip = () => {


    const [user, setUser] = useState({});
    const time = "4:00 pm"
    const venue = "Jinnah"

    let [token] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const userId = location.pathname.match(/\/registration-slip\/(\d+)/)?.[1];

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    const RegistrationSlipData = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(`${serverURL}/api/admin/getRegistrations/${id}`,
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
            console.log(data);
            setUser(data.data[0]);

        } catch (error) {
            console.error(error);
            if (error.response && (error.response.status === 401 || error.response.status === 498)) {
                console.error("Unauthorized: Please log in");
                redirectToLogin()
            }
        }
    }

    useEffect(async () => {
        await RegistrationSlipData(userId);
        console.log("From UseEffect", user);
        window.print();
    }, []);

    return (
        <div style={{margin: 0, padding: 0}}>
            <>
                {/* Required meta tags */}
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>Registration Portal</title>
                <meta name="csrf-token" content="WUnmTlTCYgHkjqM53P2cyU8xEQaxXRiyRET40gfH" />
                {/* plugins:css */}
                <link
                    rel="stylesheet"
                    href="https://register.brenfo.com/public/vendors/mdi/css/materialdesignicons.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://register.brenfo.com/public/vendors/css/vendor.bundle.base.css"
                />
                {/*  <link rel="stylesheet" href="https://register.brenfo.com/vendors/css/style.css"> */}
                {/* endinject */}
                {/* plugin css for this page */}
                <link
                    rel="stylesheet"
                    href="https://register.brenfo.com/public/vendors/datatables.net-bs4/dataTables.bootstrap4.css"
                />
                {/* End plugin css for this page */}
                {/* inject:css */}
                <link
                    rel="stylesheet"
                    href="https://register.brenfo.com/public/css/vertical-layout-light/style.css"
                />
                {/* endinject */}
                {/*   <link rel="shortcut icon" href="https://register.brenfo.com/public/images/mme_logo.png"/> */}
                <link
                    rel="stylesheet"
                    href="https://register.brenfo.com/public/vendors/select2/select2.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://register.brenfo.com/public/vendors/select2/select2-bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.datatables.net/buttons/1.6.5/css/buttons.dataTables.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css"
                />
                <link
                    rel="stylesheet"
                    href="https://register.brenfo.com/public/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css"
                />
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n    .header, .header-space,\n    .footer, .footer-space {\n      height: 100px;\n    }\n\n\n    .header {\n      position: fixed;\n      top: 0;\n    }\n    .footer {\n      position: fixed;\n      bottom: 0;\n\n    }\n\n\n\n  .signature{\n      border: 0;\n      border-bottom: 1px solid #000;\n      width: 500px;\n  }\n\n\n\n  .vendor{\n\n    word-wrap: break-word; \n    text-align: left;\n    color: black;\n    font-size: 20px;\n    padding-left: 30px;\n\n\n\n  }\n\n\n  .Invoice{\n     line-break: auto; \n    word-break: break-all;\n    text-align: left;\n    color: black;\n    padding-left: 10px;\n    font-size: 20px;\n\n\n  }\n\n\n  .table, th, td {\n    border: 1px solid black;\n    border-collapse: collapse;\n  }\n\n\n  <style>\n    body {\n      margin: 0;\n      padding: 0;\n      font-family: Arial, sans-serif;\n      font-size: 14px;\n    }\n    .container {\n      width: 100%;\n      max-width: 800px;\n      margin: 0 auto;\n      padding: 20px;\n      box-sizing: border-box;\n      background-color: #fff;\n      border: 2px solid black;\n    }\n    .heading {\n      font-size: 30px;\n      font-weight: bold;\n      text-align: center;\n      margin-bottom: 20px;\n    }\n    .field {\n      margin-bottom: 10px;\n    }\n    .field label {\n      display: inline-block;\n      width: 150px;\n      font-weight: bold;\n    }\n    .field span {\n      display: inline-block;\n      width: 75%;\n      padding: 5px;\n      border: 1px solid #ddd;\n      border-radius: 3px;\n    }\n  "
                    }}
                />
                <div className="container">
                    <div className="BoxA border- padding mar-bot">
                        <div>
                            <h1
                                style={{
                                    textAlign: "center",
                                    fontSize: 28,
                                    textDecoration: "underline",
                                    fontWeight: 700
                                }}
                            >
                                THE EDUCATION LINK
                            </h1>
                        </div>
                        <h3 style={{ textAlign: "center", fontSize: 15 }}>
                            EDULINK/JC/RF/24-25
                        </h3>
                    </div>
                    <br />
                    <br />{" "}
                    <div>
                        <h3
                            style={{
                                textAlign: "center",
                                fontSize: 25,
                                fontWeight: 600,
                                fontFamily: "math"
                            }}
                        >
                            Registration Slip
                        </h3>
                    </div>
                    <br />
                    {/* <div className="heading">Initial Registration Slip</div>
                    <h1 style={{ textAlign: "center", fontSize: 20 }}>
                        EDULINK/JC/RF/24-25
                    </h1> */}
                    <div
                        style={{
                            width: 150,
                            height: 150,
                            border: "2px solid black",
                            float: "right",
                            marginTop: "-160px"
                        }}
                    />
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Roll Number : </label>
                        <span style={{ marginTop: 6 }} id="id" > {user.roll_number}</span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Student's Name: </label>
                        <span id="student_full_name"> {user.full_name} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Student's Class: </label>
                        <span id="student_class" > {user.class} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Venue: </label>
                        <span id="venue" > {user.test_center} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Time: </label>
                        <span id="time" > {user.test_time} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Father's Name: </label>
                        <span id="fathers_name" > {user.father_name} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Address: </label>
                        <span id="residential_address" > {user.address} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Last School: </label>
                        <span id="last_school_attended"> {user.last_school_attended} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Group:</label>
                        <span id="student_group" > {user.group_name} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Previous Percentage: </label>
                        <span id="percentage_in_IX_class" > {user.percentage_last_class} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Board:</label>
                        <span id="previous_board_of_education" > {user.previous_education_board} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Reference Name: </label>
                        <span id="refrence_name" > {user.reference_name || "-"} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Reference Contact :</label>
                        <span id="refrence_contact_no" > {user.reference_contact || "-"} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Father's Company:</label>
                        <span id="father's_workplace" > {user.father_workplace} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Family Income :</label>
                        <span id="family_income" > {user.family_income} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Mother's Occupation:</label>
                        <span id="mother_s_occupation" > {user.mother_occupation || "-"} </span>
                    </div>
                    {/* <div style={{ marginBottom: 7 }} className="field">
                        <label>Mother's Designation:</label>
                        <span id="mother_s_designation" > {user.mother_designation || "-"} </span>
                    </div>
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Mother's Income:</label>
                        <span id="mother_s_income" > {user.mother_income || "-"} </span>
                    </div> */}
                    {/* <div style={{ marginBottom: 7 }} className="field">
                        <label>Phone (Residence):</label>
                        <span id="2nd_number" />
                    </div> */}
                    <div style={{ marginBottom: 7 }} className="field">
                        <label>Student's Cell:</label>
                        <span id="student_contact_number" > {user.student_contact} </span>
                    </div>
                    <div className="field">
                        <label>Father's Cell:</label>
                        <span id="father's_contact_number" > {user.father_contact} </span>
                    </div>
                </div>
            </>
        </div>
    );
}

export default RegistrationSlip;

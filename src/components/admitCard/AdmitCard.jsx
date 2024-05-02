import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { serverURL } from '../../temp';

const AdmitCard = () => {

    const [user, setUser] = useState({});
    const [credentials, setCredentials] = useState({});
    const time = "4:00 pm"
    const venue = "Jinnah"

    let [token] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const userId = location.pathname.match(/\/admit-card\/(\d+)/)?.[1];

    const redirectToLogin = () => {
        window.location.href = "/notFound";
    };

    const AdmitCardData = async (id) => {
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
            setCredentials(data.credentials[0]);

        } catch (error) {
            console.error(error);
            if (error.response && (error.response.status === 401 || error.response.status === 498)) {
                console.error("Unauthorized: Please log in");
                redirectToLogin()
            }
        }
    }

    useEffect(async () => {
        await AdmitCardData(userId);
        console.log("From UseEffect", user);
        window.print();
    }, []);

    return (
        <div style={{margin: 0, padding: 0 }}>
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
                <section style={{ border: "4px solid black", padding: 16, margin: 0 }}>
                    <div className="container">
                        <div className="admit-card">
                            <div className="BoxA border- padding mar-bot">
                                <div>
                                    <h1
                                        style={{
                                            textAlign: "center",
                                            fontSize: 35,
                                            textDecoration: "underline",
                                            fontWeight: 650
                                        }}
                                    >
                                        THE EDUCATION LINK
                                    </h1>
                                </div>
                                <h1 style={{ textAlign: "center", fontSize: 15 }}>
                                    EDULINK/JC/RF/24-25
                                </h1>
                            </div>
                            <br />
                            <br />{" "}
                            <div>
                                <h3
                                    style={{
                                        textAlign: "center",
                                        fontSize: 28,
                                        fontWeight: 550,
                                        fontFamily: "math"
                                    }}
                                >
                                    ADMIT CARD
                                </h3>
                            </div>
                            <br />
                            <div>
                                {/* <h3 style="text-align:center;font-size: 25px;">Admission Test</h3></div> */}
                            </div>
                            <div className="BoxD border- padding mar-bot">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <table
                                            style={{ width: "103%", borderCollapse: "collapse", marginLeft: "-10px" }}
                                            // style={{ width: "123.5%" }}
                                            // className="table table-bordered"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Roll Number : </b> {user.roll_number}
                                                        <span
                                                            style={{ fontSize: 18, fontWeight: "bold" }}
                                                            id="id"
                                                        />
                                                    </td>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Group: </b> {user.group_name}{" "}
                                                        <span style={{ fontSize: 18 }} id="student_group" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Student's Name: </b> {user.full_name}
                                                        <span style={{ fontSize: 18 }} id="student_full_name" />
                                                    </td>
                                                    {/*  <p><label>Name:</label><span id="name"></span></p> */}
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Class:</b> {user.class}
                                                        <span id="student_class" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Father's Name: </b> {user.father_name}
                                                        <span style={{ fontSize: 18 }} id="fathers_name" />
                                                    </td>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Time: </b> {user.test_time}
                                                        <span style={{ fontSize: 18 }} id="time" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Venue:</b> {user.test_center}
                                                        <span style={{ fontSize: 18 }} id="venue" />
                                                    </td>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        {/* <b>Date: </b> 6<sup>th </sup>August,&nbsp;2023 */}
                                                        <b>Date:</b> {user.test_date}
                                                        <span style={{ fontSize: 18 }} id="date" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Email:</b> {credentials.email}
                                                        <span style={{ fontSize: 18 }} id="email" />
                                                    </td>
                                                    <td style={{ border: '1px solid black', padding: '8px', fontSize: 18 }}>
                                                        <b>Password:</b> {credentials.password}
                                                        <span style={{ fontSize: 18 }} id="password" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div>
                                            <hr
                                                style={{
                                                    marginTop: 80,
                                                    border: "1px solid black",
                                                    marginRight: 0,
                                                    marginLeft: 400
                                                }}
                                            />
                                            <h1
                                                style={{
                                                    textAlign: "right",
                                                    marginRight: 69, /* marginTop: 0, */
                                                    fontSize: 20,
                                                    fontWeight: 500
                                                }}
                                            >
                                                Administrator
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 txt-center">
                                        <div
                                            style={{
                                                width: 140,
                                                height: 143,
                                                border: "1px solid black",
                                                float: "right",
                                                marginRight: -10,
                                                marginTop: -495
                                            }}
                                        />
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr></tr>
                                                <tr></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <h3 style={{ textDecoration: "underline", marginTop: 10 }}>
                    The Participants Must:
                </h3>
                <ul
                    style={{
                        listStyleType: "disc",
                        fontSize: "1.1em",
                        marginTop: 8,
                        marginLeft: 0,
                        textAlign: "justify"
                    }}
                >
                    <li style={{ marginBottom: 3 }}>
                        Arrive at the test center at least 15 minutes before the scheduled time.
                        No additional time shall be given to Participant arriving late
                    </li>
                    <li style={{ marginBottom: 3 }}>
                        Come in formal attire; anyone wearing shorts, pyjamas, etc. will not be
                        allowed to take the exam
                    </li>
                    <li style={{ marginBottom: 3 }}>
                        Bring your admit card, the required stationery and a clip board along.
                        Lending/borrowing of pen, pencil, ruler, calculator, etc. is strictly
                        prohibited in the examination room. <b>Calculator is not allowed</b>
                    </li>
                    <li style={{ marginBottom: 3 }}>
                        Not leave his seat during the exam without getting permission from the
                        invigilator
                    </li>
                    <li style={{ marginBottom: 3 }}>
                        Maintain complete silence in the examination room. If a participant has
                        any kind of query, he should raise his hand and wait for the invigilator
                    </li>
                    <li style={{ marginBottom: 3 }}>
                        Mark his attendance on the attendance sheet during the examinations. In
                        case, his name is not listed, report to an invigilator immediately
                    </li>
                    <li style={{ marginBottom: 3 }}>
                        Not bring mobile phones and any other unauthorized electronic gadgets
                    </li>
                    <li style={{ marginBottom: 3 }}>
                        <b>Note: </b>Any participant found cheating, chatting, gesturing, or
                        misbehaving in the examination room, shall be dealt strictly and his paper
                        will be cancelled.
                    </li>
                    {/* <li style="margin-bottom: 12px;">Must bring the <u style="text-decoration: underline; text-decoration-color: #black;">ADMIT CARD</u> along</li> */}
                </ul>
                {/* <p style="font-size: 1.3em;">We wish you the very best of luck with all your examinations</p> */}
                <br />
                <p style={{ fontSize: "1.1em" , marginTop: 2}}>Regards,</p>
                <p style={{ fontSize: "1.2em", fontWeight: 600, marginTop: 6 }}>
                    TEL Administration
                </p>
            </>
        </div>
    );
}

export default AdmitCard;

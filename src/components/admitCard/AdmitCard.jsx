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
        <div>
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
                <section style={{ border: "5px solid black", padding: 20 }}>
                    <div className="container">
                        <div className="admit-card">
                            <div className="BoxA border- padding mar-bot">
                                <div>
                                    <h1
                                        style={{
                                            textAlign: "center",
                                            fontSize: 45,
                                            textDecoration: "underline",
                                            fontWeight: 800
                                        }}
                                    >
                                        THE EDUCATION LINK
                                    </h1>
                                </div>
                                <h1 style={{ textAlign: "center", fontSize: 20 }}>
                                    EDULINK/JC/RF/24-25
                                </h1>
                            </div>
                            <br />
                            <br />
                            <br />{" "}
                            <div>
                                <h3
                                    style={{
                                        textAlign: "center",
                                        fontSize: 38,
                                        fontWeight: 700,
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
                            <div className="BoxC border- padding mar-bot"></div>
                            <div className="BoxD border- padding mar-bot">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <table
                                            style={{ width: "123.5%" }}
                                            className="table table-bordered"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Roll Number : </b> TEL- {user.id}
                                                        <span
                                                            style={{ fontSize: 22, fontWeight: "bold" }}
                                                            id="id"
                                                        />
                                                    </td>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Group: </b> {user.group_name}{" "}
                                                        <span style={{ fontSize: 22 }} id="student_group" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Student's Name: </b> {user.full_name}
                                                        <span style={{ fontSize: 22 }} id="student_full_name" />
                                                    </td>
                                                    {/*  <p><label>Name:</label><span id="name"></span></p> */}
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Class:</b> {user.class}
                                                        <span id="student_class" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Father's Name: </b> {user.father_name}
                                                        <span style={{ fontSize: 22 }} id="fathers_name" />
                                                    </td>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Time: </b> {time}
                                                        <span style={{ fontSize: 22 }} id="time" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Venue:</b> {venue}
                                                        <span style={{ fontSize: 22 }} id="venue" />
                                                    </td>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Date: </b> 6<sup>th </sup>August,&nbsp;2023
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Email:</b> {credentials.email}
                                                        <span style={{ fontSize: 22 }} id="email" />
                                                    </td>
                                                    <td style={{ fontSize: 22 }}>
                                                        <b>Password:</b> {credentials.password}
                                                        <span style={{ fontSize: 22 }} id="password" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div>
                                            <hr
                                                style={{
                                                    marginTop: 131,
                                                    border: "1px solid black",
                                                    marginRight: "-170px",
                                                    marginLeft: 700
                                                }}
                                            />
                                            <h1
                                                style={{
                                                    textAlign: "right",
                                                    marginRight: "-109px" /* marginTop: 0, */,
                                                    fontSize: 22,
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
                                                width: 203,
                                                height: 196,
                                                border: "1px solid black",
                                                float: "right",
                                                marginRight: "-26px",
                                                marginBottom: "-3px",
                                                marginTop: "-211px"
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
                <h2 style={{ textDecoration: "underline", marginTop: 60 }}>
                    The Participants Must:
                </h2>
                <ul
                    style={{
                        listStyleType: "disc",
                        fontSize: "1.3em",
                        marginTop: 26,
                        marginLeft: 9,
                        textAlign: "justify"
                    }}
                >
                    <li style={{ marginBottom: 6 }}>
                        Arrive at the test center at least 15 minutes before the scheduled time.
                        No additional time shall be given to Participant arriving late
                    </li>
                    <li style={{ marginBottom: 6 }}>
                        Come in formal attire; anyone wearing shorts, pyjamas, etc. will not be
                        allowed to take the exam
                    </li>
                    <li style={{ marginBottom: 6 }}>
                        Bring your admit card, the required stationery and a clip board along.
                        Lending/borrowing of pen, pencil, ruler, calculator, etc. is strictly
                        prohibited in the examination room. <b>Calculator is not allowed</b>
                    </li>
                    <li style={{ marginBottom: 6 }}>
                        Not leave his seat during the exam without getting permission from the
                        invigilator
                    </li>
                    <li style={{ marginBottom: 6 }}>
                        Maintain complete silence in the examination room. If a participant has
                        any kind of query, he should raise his hand and wait for the invigilator
                    </li>
                    <li style={{ marginBottom: 6 }}>
                        Mark his attendance on the attendance sheet during the examinations. In
                        case, his name is not listed, report to an invigilator immediately
                    </li>
                    <li style={{ marginBottom: 6 }}>
                        Not bring mobile phones and any other unauthorized electronic gadgets
                    </li>
                    <li style={{ marginBottom: 6 }}>
                        <b>Note: </b>Any participant found cheating, chatting, gesturing, or
                        misbehaving in the examination room, shall be dealt strictly and his paper
                        will be cancelled.
                    </li>
                    {/* <li style="margin-bottom: 12px;">Must bring the <u style="text-decoration: underline; text-decoration-color: #black;">ADMIT CARD</u> along</li> */}
                </ul>
                {/* <p style="font-size: 1.3em;">We wish you the very best of luck with all your examinations</p> */}
                <br />
                <p style={{ fontSize: "1.3em" }}>Regards,</p>
                <p style={{ fontSize: "1.4em", fontWeight: 600, marginTop: 20 }}>
                    TEL Administration
                </p>
            </>

        </div>
    );
}

export default AdmitCard;

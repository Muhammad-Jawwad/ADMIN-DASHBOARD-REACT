// Layout.js
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="layout">
            <Sidebar />
            <div className="content">
                {/* Use the Outlet component to render child routes */}
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;

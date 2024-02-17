import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../admin/components/Admin";

const AdminRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<Admin/>}></Route>
            </Routes>
        </div>
    )
}

export default AdminRouter
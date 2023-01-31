import { Outlet, Route, Routes } from "react-router-dom"
import { ViewAllJobs } from "../Pages/ViewAllJobs"
import { AssignAJob } from "../Pages/AssignAJob";
import { ManageJobs } from "../Pages/ManageJobs";
import { AddAUser } from "../Pages/AddAUser";

export const AdminView = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                   
                    

                    <Outlet />
                </>
            }>

                <Route path="ViewAllJobs" element={< ViewAllJobs />} />
                <Route path="AssignAJob" element={< AssignAJob />} />
                <Route path="ManageJobs" element={< ManageJobs />} />
                <Route path="AddAUser" element={< AddAUser />} />
            </Route>
        </Routes>
    )
}
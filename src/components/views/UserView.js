import { Outlet, Route, Routes } from "react-router-dom"
import { UserJobs } from "../Pages/UserJobs"; 

export const UserView = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                   
                    

                    <Outlet />
                </>
            }>

                <Route path="YourJobs" element={< UserJobs />} />
            </Route>
        </Routes>
    )
}
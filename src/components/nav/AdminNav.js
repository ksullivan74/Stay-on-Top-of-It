import { Link,useNavigate } from "react-router-dom";
import "./Nav.css"

export const AdminNav  = () => {

    const navigate = useNavigate()

    const localStayUser = localStorage.getItem("stay_user")
    const stayUserObject = JSON.parse(localStayUser)
    
    return(
         <>
        <div className="top_Ribbon">
            <h2 className="ribbonItem">Welcome {stayUserObject.name}</h2>
            <h1 className="ribbonItem">Stay On Top Of it</h1>
            <h3 className="ribbonItem" >Your key to home maitainence</h3>
        </div>
            <ul className="navbar">
                <li className="navbar_item">
                    <Link to="/ViewAllJobs">View All Jobs</Link>
                </li>
                <li  className="navbar_item">
                    <Link to="AssignAJob">Assign A Job</Link>
                </li>
                <li  className="navbar_item">
                    <Link to="ManageJobs">Manage Jobs</Link>
                </li>
                <li  className="navbar_item">
                    <Link to="AddAUser">Add a User</Link>
                </li>
            {
                localStorage.getItem("stay_user")
                    ? <li className="navbar__item">
                        <Link className="navbar__item" to="" onClick={() => {
                            localStorage.removeItem("stay_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
         </ul>
        </>
    )
}
import { Link,useNavigate } from "react-router-dom";
import "./Nav.css"

export const AdminNav  = () => {

    const navigate = useNavigate()

    const localStayUser = localStorage.getItem("stay_user")
    const stayUserObject = JSON.parse(localStayUser)
    
    return(
         <>
            <h3>Welcome {stayUserObject.name}</h3>
            <h1 className="h1">Stay On Top Of it</h1>
            <div>Your key to home maitainence</div>
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
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
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
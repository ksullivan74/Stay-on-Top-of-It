import { AdminNav } from "./AdminNav";
import { UserNav } from "./UserNav";

export const NavBar = () => {

    const localStayUser = localStorage.getItem("stay_user")
    const stayUserObject = JSON.parse(localStayUser)

    if(stayUserObject.admin) {
        return <AdminNav />
    }
    else {
        return <UserNav />
    }
}
import { AdminView } from "./AdminView";
import { UserView } from "./UserView";

export const ApplicationViews = () => {

    const localStayUser = localStorage.getItem("stay_user")
    const stayUserObject = JSON.parse(localStayUser)

    if(stayUserObject.admin) {
        return <AdminView />
    }
    else {
        return <UserView />
    }
}
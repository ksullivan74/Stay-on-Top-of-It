import { getActiveElement } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";

export const AddAUser = () => {
   
    const [user,updateUser] = useState({
        name: "",
        email: "",
        admin: false,
        foremanId: "",
        helperId: ""
    })

   const navigate = useNavigate()

   const localStayUser = localStorage.getItem("stay_user")
   const stayUserObject = JSON.parse(localStayUser)

   
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const userToSendToApi = {
            name: user.name,
            email: user.email,
            admin: user.admin,
            foremanId: user.id,
            helperId: user.id
        }

        const helperToSendToApi = {

        }

        const foremanToSendToApi = {

        }

        return fetch (`http://localhost:8088/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON. stringify(userToSendToApi)
        })
        .then( resp => resp.json())
        .then (
            () => {

            }
        )

    }
   

    return(
        <>
        <h2>Add a New User:</h2>
        <form>
            <fieldset>
                <div>
                    <label>Name:</label>
                    <input  type="text"
                            placeholder="User Name"
                            value={user.name}
                            onChange={
                                (event) => {
                                    const copy = {...user}
                                    copy.name = event.target.value
                                    updateUser(copy)
                                }
                            }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Email</label>
                    <input  type="text"
                            placeholder="User Email"
                            value={user.email}
                            onChange={
                                (event) => {
                                    const copy = {...user}
                                    copy.email = event.target.value
                                    updateUser(copy)
                                }
                            }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Check if user is admin:</label>
                    <input  type="checkbox"
                            name= "admin"
                            checked={user.admin}
                            onChange={
                                (event) => {
                                    const copy = {...user}
                                    copy.admin = event.target.checked
                                    updateUser(copy)
                                }
                            }
                    />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="">
                    Add User
            </button>
        </form>
        </>
    )
}
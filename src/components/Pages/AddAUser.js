import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddAUser = () => {
   
   const navigate = useNavigate()

   const localStayUser = localStorage.getItem("stay_user")
   const stayUserObject = JSON.parse(localStayUser)

   

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

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
                            value=""
                            onChange={
                                (event) => {
                                    
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
                            value=""
                            onChange={
                                (event) => {
                                    
                                }
                            }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Check if user is admin:</label>
                    <input  type="radio"
                            value=""
                            onChange={
                                (event) => {
                                    
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
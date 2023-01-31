import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ManageJobs = () => {
   const [job, updateJob] = useState({
    "title": "",
    "dueDate": "",
    "compeleteDate": null,
    "cadenceID": 0,
    "jobCategoryId": 0,
    "foremanId": 0,
    "helperID": 0
   })
   
   const navigate = useNavigate()

   const localStayUser = localStorage.getItem("stay_user")
   const stayUserObject = JSON.parse(localStayUser)

   

    return(
        <>
        <form>
            <fieldset>
                <div>
                    <label>Title:</label>
                    <input  type="text"
                            placeholder="What do you want to call this job?"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Due Date</label>
                    <input  type="text"
                            placeholder="What date is this job due?"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Cadence</label>
                    <select name="Cadence">
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="BiWeekly">BiWeekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="BiAnnual">BiAnnual</option>
                        <option value="Annual">Annual</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Job Category</label>
                    <select name="Job Category">
                        <option value="jobCategory.id">placeholder</option>
                        <option value="jobCategory.id">placeholder</option>
                    </select>
                </div>
            </fieldset>
        </form>
        </>
    )
}
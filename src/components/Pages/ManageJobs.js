import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ManageJobs = () => {
   const [cadence, updateCadence] =useState([]) //1
   const [category, updateCategory] = useState([]) //2
   const [job, updateJob] = useState({

    title: "",
    dueDate: "",
    compeleteDate: "",
    cadenceId: 0,
    categoryId: 0,
    foremanId: 0,
    helperId: null

   }) //3
   const [jobsList,getJobsList] = useState([]) //4
   
   const navigate = useNavigate()

   const localStayUser = localStorage.getItem("stay_user")
   const stayUserObject = JSON.parse(localStayUser)

   useEffect(
    () => {
        fetch(`http://localhost:8088/jobs`)
        .then(resp => resp.json())
        .then((jobsArray) => {
            getJobsList(jobsArray)
        }
        )
    },[]
)

   useEffect(
        () => {
            fetch(`http://localhost:8088/cadences`)
            .then(resp => resp.json())
            .then((cadenceArray) => {
                updateCadence(cadenceArray)
            }
            )
        },[]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
            .then(resp => resp.json())
            .then ((categoryArray) => {
                updateCategory(categoryArray)
            }

            )
        },[]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const jobToSendToTheApi = {

            title: job.title,
            dueDate: job.dueDate,
            compeleteDate: null,
            cadenceId: parseInt(job.cadenceId),
            categoryId: parseInt(job.categoryId),
            foremanId: stayUserObject.id,
            helperId: null

        }

        return fetch(`http://localhost:8088/jobs`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobToSendToTheApi)
        })
       .then( resp => resp.json())
       .then(
            () => {
                navigate("/ViewAllJobs")
            }
       )
    }

    const deleteJobClick = () => {
        fetch(`http://localhost:8088/jobs/${job.id}`,{
            method: "DELETE"
        })
        .then (() =>{
            navigate("/ViewAllJobs")
        })
    }
   

    return(
        <>
        <h2>Fill out the Form Below to add a new job</h2>
        <form>
            <fieldset>
                <div>
                    <label>Title: </label>
                    <input  type="text"
                            placeholder="What do you want to call this job?"
                            value={job.title}
                            onChange={
                                (event) => {
                                    const copy = {...job}
                                    copy.title = event.target.value
                                    updateJob(copy)
                                }
                            }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Due Date </label>
                    <input  type="date"
                            placeholder="What date is this job due?"
                            value={job.dueDate}
                            onChange={
                                (event) => {
                                    const copy = {...job}
                                    copy.dueDate = event.target.value
                                    updateJob(copy)
                                }
                            }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Cadence </label>
                    <select name="cadence"
                    onChange={
                        (event) => {
                            const copy = {...job}
                            copy.cadenceId = event.target.value
                            updateJob(copy)
                        }
                    }>
                        <option value="0">Choose Cadence</option>
                        {
                            cadence.map(
                                (cadence) => {
                                  return(
                                  <option value={cadence.id}>{cadence.cadence}</option>
                                  )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Job Category </label>
                    <select name="Job Category"
                    onChange={
                        (event) => {
                            const copy = {...job}
                            copy.categoryId = event.target.value
                            updateJob(copy)
                        }
                    }>
                        <option value="0">Choose Category</option>
                    {
                            category.map(
                                (category) => {
                                  return(
                                  <option value={category.id}>{category.category}</option>
                                  )
                                }
                            )
                        }

                    </select>
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="">
                    Create Job
            </button>
        </form>
        <div>
            <h2>Delete a Job?</h2>
            <section>
            <fieldset>
                <div>
                    <label>Job Title: </label>
                    <select name="Job Category"
                    onChange={
                        (event) => {
                            const copy = {...job}
                            copy.id = event.target.value
                            updateJob(copy)
                        }
                    }>
                        <option value="0">Choose a Job</option>
                    {
                            jobsList.map(
                                (job) => {
                                  return(
                                  <option value={job.id}>{job.title}</option>
                                  )
                                }
                            )
                        }

                    </select>
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => deleteJobClick(clickEvent)}
                className="">
                    Delete Job
            </button>
            </section>
        </div>

        </>
    )
}
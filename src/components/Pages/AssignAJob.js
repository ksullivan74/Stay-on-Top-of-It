import { useEffect, useState } from "react"
import { useNavigate  } from "react-router-dom";

export const AssignAJob = () => {
    const [jobs, getJobs] = useState([]) //1
    const [selectedJobId, setSelectedJobId] = useState({}) //2
    const [selectedJob, setSelectedJob] = useState({}) //3
    const [users,getusers] = useState([]) //4
    const [selectedUser,setSelectedUser] = useState({
        foremanId: "",
        helperId: ""
    }) //5

    const localStayUser = localStorage.getItem("stay_user")
    const stayUserObject = JSON.parse(localStayUser)

    const navigate = useNavigate()
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/jobs`)
            .then(resp => resp.json())
            .then((jobsArray) => {
                getJobs(jobsArray)
            }
            )
        },[]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
            .then(resp => resp.json())
            .then((usersArray) => {
                getusers(usersArray)
            }
            )
        },[]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/jobs/?id=${selectedJobId.id}`)
            .then(resp => resp.json())
            .then((selectedJobObj) => {
                setSelectedJob(selectedJobObj)
            }
            )
        },[selectedJobId]
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const assignedJobToSendToApi = {
            
            foremanId: stayUserObject.id,
            helperId: selectedUser.id,
        
        }

        return fetch(`http://localhost:8088/jobs/${selectedJobId.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assignedJobToSendToApi)
        })
        .then (resp => resp.json())
        .then(
            () => {
                navigate("/ViewAllJobs")
            }
       )
        
    }

    return <>
        <form>
            <fieldset>
                <div>
                    <label>Job:</label>
                    <select name="Job"
                        onChange={
                            (event) => {
                                const copy = {...selectedJobId}
                                copy.id = parseInt(event.target.value)
                                setSelectedJobId(copy)
                            }
                        }
                    >
                        <option value="0">Choose a Job</option>
                        {
                            jobs.map(
                                (job) => {
                                return(
                                <option value={job.id}>{job.title}</option>
                                )
                                }
                            )
                        }
                    </select>
                    <label>Assign To:</label>
                    <select
                        onChange={
                            (event) => {
                                const copy ={...selectedUser}
                                copy.id  = parseInt(event.target.value)
                                setSelectedUser(copy)}
                        }>
                            <option value="0">Choose a User</option>
                        {
                            users.map(
                                (user) => {
                                    return(<option value={user.id}>{user.name}</option>)
                                }
                            )
                        }
                    </select>
                    <button 
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="">
                            Assign
                    </button>
                </div>
            </fieldset>
        </form>
    </>
}
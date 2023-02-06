import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/Pages.css"

export const ViewAllJobs = () => {
    const [jobs, setJobs] = useState([])
    const [users, getUsers] = useState([])

    const localStayUser = localStorage.getItem("stay_user")
    const stayUserObject = JSON.parse(localStayUser)

    const getAllJobs = () => {
        fetch(`http://localhost:8088/jobs/?_expand=cadence&_expand=category`)
                .then(resp => resp.json())
                .then((jobsArray) => {
                    setJobs(jobsArray)
                }
                )
    }
    
    useEffect(
        () => {
            getAllJobs()
        }, []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/users`)
        .then( resp => resp.json())
        .then ((userArray) => {
            getUsers(userArray)
        })
    },[]
    )

    const userHelperMatch = (helperIdObj) =>{

       /* const matchingHelper = users.find(
            (user) => {
                return  user.id === helperIdObj
            }
            )
            return `${matchingHelper.name}`
        */

        let matchingHelper = ""

        for ( const user of users) {
            if (user.id === helperIdObj) {
                matchingHelper = user.name
            }
        }
        return matchingHelper
    }

    const userForemanMatch = (helperIdObj) =>{

        /* const matchingHelper = users.find(
             (user) => {
                 return  user.id === helperIdObj
             }
             )
             return `${matchingHelper.name}`
         */
 
         let matchingForeman = ""
 
         for ( const user of users) {
             if (user.id === helperIdObj) {
                 matchingForeman = user.name
             }
         }
         return matchingForeman
     }
    

  return <>
  <h2>Jobs:</h2>
  <div className="jobsContainer">
  {
    jobs.map(
        (job) => {
            if (job.compeleteDate === null) {
                return <>
                    <article className="jobElement">
                            <header  className="jobLine">Job: {job.title}</header>
                            <header  className="jobLine">Due Date: {job.dueDate}</header>
                            <header  className="jobLine">Occurs: {job.cadence.cadence}</header>
                            <header  className="jobLine">Category: {job.category.category}</header>
                            <header  className="jobLine">Assigned To: {userHelperMatch(job.helperId)}</header>
                            <header  className="jobLine">Assigned By: {userForemanMatch(job.foremanId)}</header>
                            <header  className="jobLine">Is it Done? Click this button:</header>
                            <button
                                onClick={() => {
                                    const dateUpdate = {
                                        compeleteDate: Date.now()
                                    }
                                    return fetch(`http://localhost:8088/jobs/${job.id}`, {
                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(dateUpdate)
                                    })
                                        .then(() => {
                                            getAllJobs()
                                        })
                                }} className="button">
                                Complete Job
                            </button>
                    </article>
                </>
            }
            else {
                return<></>
            }
        }
    )
  }
  </div>
  </>
}
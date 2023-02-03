import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/Pages.css"

export const ViewAllJobs = () => {
    const [jobs, setJobs] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/jobs/?_expand=cadence&_expand=category`)
                .then(resp => resp.json())
                .then((jobsArray) => {
                    setJobs(jobsArray)
                }
                )
        }, []
    )


  return <>
  <h2>Jobs:</h2>
  <div className="jobsContainer">
  {
    jobs.map(
        (job) => {
            if (job.compeleteDate === null) {
                return <>
                    <article className="jobElement">
                            <header className="jobLine">Job: {job.title}</header>
                            <header  className="jobLine">Due Date: {job.dueDate}</header>
                            <header  className="jobLine">Occurs: {job.cadence.cadence}</header>
                            <header  className="jobLine">Category: {job.category.category}</header>
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
                                            navigate("/ViewAllJobs")
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
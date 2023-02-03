import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  {
    jobs.map(
        (job) => {
            if (job.compeleteDate === null) {
                return <>
                    <h2>Job To Complete:</h2>
                    <article>
                        <section>
                            <header>Job: {job.title}</header>
                            <header>Due Date: {job.dueDate}</header>
                            <header>Occurs: {job.cadence.cadence}</header>
                            <header>Category: {job.category.category}</header>
                            <header>Is it Done? Click this button:</header>
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
                                }} className="">
                                Complete Job
                            </button>
                        </section>
                    </article>
                </>
            }
            else {
                return<>
                    <h2>Completed Jobs!!:</h2>
                    <article>
                        <section>
                            <header>Job: {job.title}</header>
                            <header>Due Date: {job.dueDate}</header>
                            <header>Occurs: {job.cadence.cadence}</header>
                            <header>Category: {job.category.category}</header>
                            <header>Completed: {job.compeleteDate}</header>
                        </section>
                    </article>
                </>
            }
        }
    )
  }
  </>
}
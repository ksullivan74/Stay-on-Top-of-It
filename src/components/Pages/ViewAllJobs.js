import { useEffect, useState } from "react";

export const ViewAllJobs = () => {
    const [jobs, setJobs] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/jobs`)
            .then(resp => resp.json())
            .then((jobsArray) => {
                setJobs(jobsArray)
            }
            )
        },[]
    )
    
    return <>
        <h2>Your Jobs</h2>

        <article>
            {
                jobs.map(
                    (job) => {
                        return <section>
                            <header>Job: {job.title}</header>
                            <header>Due Date: {job.dueDate}</header>
                        </section>
                    }
                )
            }

        </article>
    </>
}
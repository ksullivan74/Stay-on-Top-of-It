import { useEffect, useState } from "react";

export const ViewAllJobs = () => {
    const [jobs, setJobs] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/jobs/?_expand=cadence&_expand=category`)
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
                            <h2>Job:</h2>
                            <header>Job: {job.title}</header>
                            <header>Due Date: {job.dueDate}</header>
                            <header>Occurs: {job.cadence.cadence}</header>
                            <header>Category: {job.category.category}</header>
                        </section>
                    }
                )
            }

        </article>
    </>
}
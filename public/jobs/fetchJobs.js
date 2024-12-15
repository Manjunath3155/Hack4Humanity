// public/fetchJobs.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "http://localhost:4000/jobs/data?page=1&limit=100"
    );
    if (!response.ok) throw new Error("Failed to load jobs");

    const jobs = await response.json();
    const jobContainer = document.getElementById("job-container");
    jobContainer.innerHTML = "";

    jobs.results.forEach((job) => {
      console.log(job.companyName);
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
                <h3>${job.positionName || job.title}</h3>
                <p><strong>Company:</strong> ${
                  job.company || job.companyName
                } </p>
                <p><strong>Location:</strong> ${
                  job.location.defaultLocalizedName || job.location
                }</p>
                <p><strong>Salary:</strong> ${job.salary || "Not Disclosed"}</p>
                <p><strong>Type:</strong> ${
                  job.jobType ? job.jobType.join(", ") : "Not Disclosed"
                }</p>
                <a href="${job.url || job.link}" target="_blank">Apply Now</a>
            `;
      jobContainer.appendChild(jobCard);
    });
  } catch (error) {
    console.error("Error loading jobs:", error);
  }
});

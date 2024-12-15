// // public/fetchJobs.js
// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch(
//       "http://localhost:4000/jobs/data?page=1&limit=100"
//     );
//     if (!response.ok) throw new Error("Failed to load jobs");

//     const jobs = await response.json();
//     const jobContainer = document.getElementById("job-container");
//     jobContainer.innerHTML = "";

//     jobs.results.forEach((job) => {
//       console.log(job.companyName);
//       const jobCard = document.createElement("div");
//       jobCard.className = "job-card";
//       jobCard.innerHTML = `
//                 <h3>${job.positionName || job.title}</h3>
//                 <p><strong>Company:</strong> ${
//                   job.company || job.companyName
//                 } </p>
//                 <p><strong>Location:</strong> ${
//                   job.location.defaultLocalizedName || job.location
//                 }</p>
//                 <p><strong>Salary:</strong> ${job.salary || "Not Disclosed"}</p>
//                 <p><strong>Type:</strong> ${
//                   job.jobType ? job.jobType.join(", ") : "Not Disclosed"
//                 }</p>
//                 <a href="${job.url || job.link}" target="_blank">Apply Now</a>
//             `;
//       jobContainer.appendChild(jobCard);
//     });
//   } catch (error) {
//     console.error("Error loading jobs:", error);
//   }
// });





















 let micky = document.querySelector(".micky li a");
document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const limit = 100; // Number of jobs per page

  // Function to fetch jobs dynamically
  async function fetchJobs(page) {
    try {
      const response = await fetch(
        `http://localhost:4000/jobs/data?page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to load jobs");

      const jobs = await response.json();
      const jobContainer = document.getElementById("job-container");
      jobContainer.innerHTML = ""; // Clear previous jobs

      jobs.results.forEach((job) => {
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";
        jobCard.innerHTML = `
          <h3>${job.positionName || job.title}</h3>
          <p><strong>Company:</strong> ${job.company || job.companyName}</p>
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
        micky.innerText = `PAGE=${currentPage}`;
      });
       const totalPages = Math.ceil(jobs.totalJobs / limit);
       paginationContainer.innerHTML = `
        <li class="page-item ${page === 1 ? "disabled" : ""}">
          <a class="page-link" href="#" id="prev-page">Previous</a>
        </li>
      `;
       for (let i = 1; i <= totalPages; i++) {
         paginationContainer.innerHTML += `
          <li class="page-item ${page === i ? "active" : ""}">
            <a class="page-link page-number" href="#" data-page="${i}">${i}</a>
          </li>
        `;
       }
       paginationContainer.innerHTML += `
        <li class="page-item ${page === totalPages ? "disabled" : ""}">
          <a class="page-link" href="#" id="next-page">Next</a>
        </li>
      `;
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  }

  // Add event listeners to pagination buttons
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("page-number")) {
      event.preventDefault();
      currentPage = parseInt(target.getAttribute("data-page"));
      fetchJobs(currentPage);
    } else if (target.id === "prev-page" && currentPage > 1) {
      event.preventDefault();
      currentPage--;
      fetchJobs(currentPage);
    } else if (target.id === "next-page") {
      event.preventDefault();
      currentPage++;
      fetchJobs(currentPage);
    }
  });

 

  

  // Initial fetch for page 1
  fetchJobs(currentPage);
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/courses/data");
    if (!response.ok) throw new Error("Failed to load courses");

    const courses = await response.json();
    const courseContainer = document.getElementById("course-container");
    courseContainer.innerHTML = "";

    courses.forEach((course) => {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";
      courseCard.innerHTML = `
        <img src="${course.image.src}" alt="${course.title}" class="course-image">
        <h2>${course.title}</h2>
        <p><strong>Description:</strong> ${course.shortDescription}</p>
        <p><strong>Owner:</strong> ${course.owners[0].name}</p>
        <p><strong>Weeks to Complete:</strong> ${course.activeCourseRun.weeksToComplete}</p>
        <a href="${course.marketingUrl}" target="_blank" class="enroll-now">Enroll Now</a>
      `;
      courseContainer.appendChild(courseCard);
    });
  } catch (error) {
    console.error("Error loading courses:", error);
    document.write("ERROR 404");
  }
});











const gradients = [
    "linear-gradient(135deg, #6a11cb, #2575fc)",
    "linear-gradient(135deg, #f7971e, #ffd200)",
    "linear-gradient(135deg, #43cea2, #185a9d)",
    "linear-gradient(135deg, #f54ea2, #ff7676)",
    "linear-gradient(135deg, #00cdac, #8ddad5)"
  ];
  

async function loadProjects() {
  const res = await fetch("assets/data/project.json");
  const projects = await res.json();

  // Shuffle the array randomly
  const shuffled = projects.sort(() => 0.5 - Math.random());

  // Pick first 4
  const randomFour = shuffled.slice(0, 3);

  renderProjects(randomFour);
}

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  projects.forEach((project) => {
    const tile = document.createElement("div");
    tile.className = "project-tile";

    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    tile.style.background = randomGradient;

    tile.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="project-links">
        <a href="${project.link}" target="_blank">🔗 View Project</a>
    </div>
`;

    container.appendChild(tile);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

window.addEventListener("DOMContentLoaded", loadProjects);

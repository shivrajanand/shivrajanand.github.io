const gradients = [
  "linear-gradient(135deg, #FF0000, #FF7F00)", // Red to Orange
  "linear-gradient(135deg, #00FF00, #008000)", // Green Shades
  "linear-gradient(135deg, #0000FF, #4B0082)", // Blue to Indigo
  "linear-gradient(135deg, #8B00FF, #DA70D6)", // Purple & Violet
  "linear-gradient(135deg, #FFD700, #FF4500)"  // Yellow to Deep Orange
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

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  // Shuffle gradients to ensure randomness
  const shuffledGradients = shuffleArray([...gradients]);

  projects.forEach((project, index) => {
    const tile = document.createElement("div");
    tile.className = "project-tile";

    // Pick a different gradient for each project
    const randomGradient = shuffledGradients[index % shuffledGradients.length];
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

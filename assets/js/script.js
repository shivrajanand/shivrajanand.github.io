const gradients = [
  "linear-gradient(135deg, #FF0000, #FF7F00)", // Red to Orange
  "linear-gradient(135deg, #00FF00, #008000)", // Green Shades
  "linear-gradient(135deg, #0000FF, #4B0082)", // Blue to Indigo
  "linear-gradient(135deg, #8B00FF, #DA70D6)", // Purple & Violet
  "linear-gradient(135deg, #FFD700, #FF4500)"  // Yellow to Deep Orange
];

// Fetch and load project data
async function loadProjects() {
  const res = await fetch("assets/data/project.json");
  const projects = await res.json();
  renderProjects(projects);
}

// Shuffle helper
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Render projects + duplicate them for seamless scroll
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  const shuffledGradients = shuffleArray([...gradients]);

  const createTile = (project, index) => {
    const tile = document.createElement("div");
    tile.className = "project-tile";

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
    return tile;
  };

  // Append original + duplicate tiles
  [...projects, ...projects].forEach((project, index) => {
    const tile = createTile(project, index);
    container.appendChild(tile);
  });
}

// Infinite smooth scroll logic
function startInfiniteScroll() {
  const container = document.getElementById("projects-container");
  let isHovered = false;
  let scrollSpeed = 3.0; // Adjust for faster/slower scroll

  container.addEventListener("mouseenter", () => isHovered = true);
  container.addEventListener("mouseleave", () => isHovered = false);

  function smoothScroll() {
    if (!isHovered) {
      container.scrollLeft += scrollSpeed;

      // Reset scroll when halfway (since content is duplicated)
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }
    requestAnimationFrame(smoothScroll);
  }

  requestAnimationFrame(smoothScroll);
}

// Optional manual scroll (with button arrows if added)
function scrollProjects(direction) {
  const container = document.getElementById("projects-container");
  const scrollAmount = 300;
  container.scrollBy({
    left: scrollAmount * direction,
    behavior: "smooth"
  });
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Sidebar toggle
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Initialize after DOM is ready
window.addEventListener("DOMContentLoaded", async () => {
  await loadProjects();

  // Delay to ensure DOM is updated before scroll logic starts
  setTimeout(() => {
    startInfiniteScroll();
  }, 100);
});

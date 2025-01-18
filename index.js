function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function toggleVisibility(id) {
  const element = document.getElementById(id);
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "flex"; // Use flex for centering in fullscreen
    if (id === "profile-card") {
      loadPDF(); // Load PDF when the profile card is shown
    }
  } else {
    element.style.display = "none";
  }
}

// Load and display the PDF
function loadPDF() {
  const pdfContainer = document.getElementById("pdf-container");
  const pdfUrl = "Documents/Shivraj Profile Card.pdf"; // Your PDF file path

  // Clear previous PDF content if any
  pdfContainer.innerHTML = "";

  // Load the PDF using PDF.js
  pdfjsLib
    .getDocument(pdfUrl)
    .promise.then(function (pdfDoc_) {
      const pdfDoc = pdfDoc_;
      const totalPages = pdfDoc.numPages;

      // Loop through all the pages and render them
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        renderPage(pageNum, pdfDoc);
      }
    })
    .catch(function (error) {
      console.error("Error loading PDF:", error);
    });
}

// Render a single page
function renderPage(pageNum, pdfDoc) {
  pdfDoc.getPage(pageNum).then(function (page) {
    const scale = 1.5; // Adjust scale for zoom
    const viewport = page.getViewport({ scale: scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render the page into the canvas context
    page.render({ canvasContext: ctx, viewport: viewport });

    // Append the canvas to the PDF container
    document.getElementById("pdf-container").appendChild(canvas);
  });
}

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active"); // Toggle the 'active' class to show or hide the menu
}

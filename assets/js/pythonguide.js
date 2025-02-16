document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });

    // Close sidebar when clicking a link (for mobile)
    document.querySelectorAll("#sidebar a").forEach(link => {
        link.addEventListener("click", function () {
            sidebar.classList.remove("open");
        });
    });
});

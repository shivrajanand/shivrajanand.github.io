document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menuButton');
    const closeNav = document.getElementById('closeNav');
    const navOverlay = document.getElementById('navOverlay');
    const themeToggle = document.getElementById('themeToggle');

    // Theme Management
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Navigation
    function openSidebar() {
        sidebar.classList.add('open');
        navOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        navOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    menuButton.addEventListener('click', openSidebar);
    closeNav.addEventListener('click', closeSidebar);
    navOverlay.addEventListener('click', closeSidebar);

    // Auto-close sidebar if resizing to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
    });

    // Handle chapter navigation
    const chapters = document.querySelectorAll('.chapter li');
    chapters.forEach(chapter => {
        chapter.addEventListener('click', () => {
            // Future enhancement: Load content dynamically
            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        });
    });
});

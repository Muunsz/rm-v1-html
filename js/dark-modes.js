/**
 * Dark Mode functionality for Rasa Nusantara website
 * Enables users to toggle between light and dark mode
 * Saves user preference in localStorage
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  const body = document.body

  // Check for saved user preference
  const darkMode = localStorage.getItem("darkMode")

  // Functions to handle dark mode
  const enableDarkMode = () => {
    body.classList.add("dark-mode")
    localStorage.setItem("darkMode", "enabled")
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      darkModeToggle.setAttribute("title", "Beralih ke Mode Terang")
    }
    document.dispatchEvent(new CustomEvent("darkModeChange", { detail: { isDarkMode: true } }))
  }

  const disableDarkMode = () => {
    body.classList.remove("dark-mode")
    localStorage.setItem("darkMode", null)
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      darkModeToggle.setAttribute("title", "Beralih ke Mode Gelap")
    }
    document.dispatchEvent(new CustomEvent("darkModeChange", { detail: { isDarkMode: false } }))
  }

  // Set initial state based on user preference
  if (darkMode === "enabled") {
    enableDarkMode()
  }

  // Toggle dark mode when button is clicked
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const darkMode = localStorage.getItem("darkMode")
      if (darkMode !== "enabled") {
        enableDarkMode()
      } else {
        disableDarkMode()
      }
    })
  } else {
    // Create dark mode toggle if it doesn't exist
    createDarkModeToggle()
  }

  // Create dark mode toggle button
  function createDarkModeToggle() {
    const navbar = document.querySelector(".navbar .container")
    if (!navbar) return

    const darkModeBtn = document.createElement("button")
    darkModeBtn.id = "dark-mode-toggle"
    darkModeBtn.className = "btn btn-sm ms-2"
    darkModeBtn.innerHTML = darkMode === "enabled" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
    darkModeBtn.setAttribute("title", darkMode === "enabled" ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap")

    // Insert before the user dropdown
    const userDropdown = navbar.querySelector(".dropdown")
    if (userDropdown) {
      navbar.insertBefore(darkModeBtn, userDropdown)
    } else {
      // If no user dropdown, append to the end of navbar
      const navbarEnd = navbar.querySelector(".d-flex.align-items-center")
      if (navbarEnd) {
        navbarEnd.appendChild(darkModeBtn)
      }
    }

    // Add event listener to the newly created button
    darkModeBtn.addEventListener("click", () => {
      const darkMode = localStorage.getItem("darkMode")
      if (darkMode !== "enabled") {
        enableDarkMode()
      } else {
        disableDarkMode()
      }
    })
  }

  // Add CSS for dark mode
  addDarkModeStyles()

  function addDarkModeStyles() {
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
            body.dark-mode {
                background-color: #121212;
                color: #e0e0e0;
            }
            
            body.dark-mode .navbar {
                background-color: #1e1e1e;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            body.dark-mode .navbar-brand,
            body.dark-mode .nav-link {
                color: #e0e0e0;
            }
            
            body.dark-mode .nav-link:hover,
            body.dark-mode .navbar-brand:hover {
                color: var(--primary-color);
            }
            
            body.dark-mode .card {
                background-color: #1e1e1e;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
            
            body.dark-mode .btn-light,
            body.dark-mode .btn-outline-secondary {
                background-color: #333;
                color: #e0e0e0;
                border-color: #444;
            }
            
            body.dark-mode .btn-light:hover,
            body.dark-mode .btn-outline-secondary:hover {
                background-color: #444;
            }
            
            body.dark-mode .form-control,
            body.dark-mode .form-select {
                background-color: #333;
                border-color: #444;
                color: #e0e0e0;
            }
            
            body.dark-mode .form-control:focus,
            body.dark-mode .form-select:focus {
                background-color: #3a3a3a;
                color: #e0e0e0;
            }
            
            body.dark-mode .modal-content {
                background-color: #1e1e1e;
                color: #e0e0e0;
            }
            
            body.dark-mode .dropdown-menu {
                background-color: #1e1e1e;
                border-color: #444;
            }
            
            body.dark-mode .dropdown-item {
                color: #e0e0e0;
            }
            
            body.dark-mode .dropdown-item:hover {
                background-color: #333;
                color: #fff;
            }
            
            body.dark-mode .table {
                color: #e0e0e0;
            }
            
            body.dark-mode .table-hover tbody tr:hover {
                background-color: #333;
            }
            
            body.dark-mode .list-group-item {
                background-color: #1e1e1e;
                border-color: #444;
                color: #e0e0e0;
            }
            
            body.dark-mode .text-muted {
                color: #aaa !important;
            }
            
            body.dark-mode .border,
            body.dark-mode .border-bottom,
            body.dark-mode .border-top {
                border-color: #444 !important;
            }
            
            body.dark-mode .bg-light {
                background-color: #2a2a2a !important;
            }
            
            body.dark-mode .bg-white {
                background-color: #1e1e1e !important;
            }
            
            body.dark-mode .text-dark {
                color: #e0e0e0 !important;
            }
            
            body.dark-mode #dark-mode-toggle {
                color: #e0e0e0;
            }
            
            body.dark-mode .forum-header,
            body.dark-mode .policy-header,
            body.dark-mode .loyalty-header {
                background-color: #2a2a2a;
            }
            
            body.dark-mode .step-box,
            body.dark-mode .timeline-content {
                background-color: #2a2a2a;
            }
            
            body.dark-mode .editor-toolbar {
                background-color: #2a2a2a;
                border-color: #444;
            }
            
            body.dark-mode .comment-editor {
                background-color: #333;
                border-color: #444;
                color: #e0e0e0;
            }
            
            /* Transition for smooth dark mode toggle */
            body, .navbar, .card, .btn, .form-control, .modal-content, .dropdown-menu, .list-group-item {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
        `
    document.head.appendChild(styleSheet)
  }

  // Handle system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const userPreference = localStorage.getItem("darkMode")
    if (userPreference !== "enabled" && userPreference !== null) {
      if (e.matches) {
        enableDarkMode()
      } else {
        disableDarkMode()
      }
    }
  })

  // Check system preference on initial load if no user preference is set
  if (darkMode === null) {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      enableDarkMode()
    }
  }

  const themeToggle = document.getElementById("theme-toggle")

  // Function to set the theme based on localStorage
  function setTheme(theme) {
    localStorage.setItem("theme", theme)
    if (theme === "dark") {
      body.classList.add("dark")
    } else {
      body.classList.remove("dark")
    }
  }

  // Function to get the theme from localStorage
  function getTheme() {
    return localStorage.getItem("theme") || "light" // Default to light theme
  }

  // Set the initial theme
  setTheme(getTheme())

  // Add event listener to the theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (body.classList.contains("dark")) {
        setTheme("light")
      } else {
        setTheme("dark")
      }
    })
  }
})

// settings.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) return; // stop if the element doesn't exist

  // Set initial state based on saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  // Handle toggle change
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

(() => {
  const STORAGE_KEY = "cooperativa_dark_mode";
  const html = document.documentElement;
  const toggle = document.getElementById("darkModeToggle");
  const icon = document.getElementById("darkModeIcon");

  const setTheme = (isDark) => {
    const theme = isDark ? "dark" : "light";
    html.setAttribute("data-bs-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (icon) {
      icon.className = `bi ${isDark ? "bi-moon-fill" : "bi-sun-fill"}`;
    }
    if (toggle) toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  };

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;

  setTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

  toggle?.addEventListener("click", () => {
    setTheme(html.getAttribute("data-bs-theme") !== "dark");
  });
})();

// JavaScript for dark/light mode toggle with persistence and accessibility support

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial state
  const isDarkModeInitial = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

  if (isDarkModeInitial) {
    body.classList.add('dark-mode');
    updateToggleState(true);
  } else {
    body.classList.remove('dark-mode');
    updateToggleState(false);
  }

  // Toggle theme on click
  themeToggleBtn.addEventListener('click', () => {
    const isDarkNow = body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    
    // Update button attributes
    updateToggleState(isDarkNow);
  });

  // Listen for system theme changes dynamically
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const systemDark = e.matches;
      if (systemDark) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
      updateToggleState(systemDark);
    }
  });

  // Function to update accessibility properties on the toggle button
  function updateToggleState(isDark) {
    if (isDark) {
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      // Set attribute to reflect theme state if needed
      themeToggleBtn.setAttribute('aria-pressed', 'true');
    } else {
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      themeToggleBtn.setAttribute('aria-pressed', 'false');
    }
  }
});

//
// Toggle dark mode
document.getElementById('darkModeButton').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Check for dark mode preference on page load
document.addEventListener('DOMContentLoaded', function() {
  const darkModeSetting = localStorage.getItem('darkMode');
  if (darkModeSetting === 'enabled') {
    document.body.classList.add('dark-mode');
  }
});
const menuToggle = document.getElementById('menu-toggle');
  const bars = document.querySelector('.icon');
  const navbarLinks = document.querySelector('.navbar-links');

  bars.addEventListener('click', function() {
    navbarLinks.classList.toggle('show');
  })